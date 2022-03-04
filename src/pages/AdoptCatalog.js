import {useEffect, useState } from "react";
import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import AdoptionCatalog from "../components/AdoptionCatalog";
import { Transition } from '@tailwindui/react';
import {BsSearch} from 'react-icons/bs'
import {IoIosArrowDropdown} from 'react-icons/io'
import {GiRibbonMedal} from 'react-icons/gi'

const base_url = process.env.REACT_APP_BASE_URL;

const AdoptCatalog = ({user}) => {

    const [adoptData, setAdoptData] = useState([]);
    const [animalCategories, setAnimalCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [endIndex, setEndIndex] = useState(0);
    const [DropdownToggle, setDropDown] = useState(false);
    const limit = 10;
    const [errMsg, setErrMsg] = useState({})

    useEffect(() => {
        fetch(`${base_url}/adopt?page=${page}&title=${keyword}&category=${currentCategory}&limit=${limit}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
        .then(res => res.json())
        .then(result => {
            // setAdoptData(result)
            setAdoptData(result.data.all_adopt);
            setEndIndex(result.endIndex);

            if(result.data.all_adopt.length === 0 ){
                setErrMsg({message: 'Pet Not Found'})
            }else{
                setErrMsg('')
            }
        });

        // setAnimalCategories(categories);
    }, [page, keyword, currentCategory]);

    // useEffect(() => {
    //     setPage(1);
    //     fetch(`${base_url}/adopt?title=${keyword}&category=${currentCategory}`, 
    //     {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'Application/JSON'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(result => {
    //         // setAdoptData(result)
    //         console.log(result.data);
    //         setAdoptData(result.data)
    //     });

    //     // setAnimalCategories(categories);
    // }, [currentCategory, keyword])

    const handleCategoryClick = (categoryId) => {
        setPage(1);
        if (currentCategory === categoryId) {
            setCurrentCategory('');
        } else {
            setCurrentCategory(categoryId);
        }
    }
    // const handleClickAll = () =>{
    //     setPage(1);
    //     setCurrentCategory('')
    // }
    const capitalizeLetter = (string) => {
        let word = string.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }

    

    return (
        <> 
            <div className="flex flex-col min-h-screen w-full bg-orange-100 bg-opacity-25">
                <NavbarLayout user={user} />
                <div className='flex container lg:min-w-full md:px-8 px-5  mb-5 mt-10 gap-4 '>
                    <div>
                          <button type='button' onClick={()=> setDropDown(!DropdownToggle)} className='shadow items-center gap-2 py-2 px-4 font-semibold hover:bg-orange-50 active:bg-orange-50 focus:bg-orange-50 rounded-md md:text-base text-sm border flex bg-white'> Category<IoIosArrowDropdown/></button>
                            <Transition
                                show={DropdownToggle}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">
                            <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-max  md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                                <AdoptionCatalog setAnimalCategories={setAnimalCategories} animalCategories={animalCategories} currentCategory={currentCategory} handleCategoryClick={handleCategoryClick} handleClickAll={handleCategoryClick}/>
                            </div>
                            </Transition>
                    </div>
                     
                    <div className='flex w-full shadow'>
                        <input onChange={(e) => setKeyword(e.target.value)} className="w-full placeholder:italic placeholder:text-slate-400 bg-white border border-orange-300 rounded-md py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-orange-100 focus:ring-orange-500 focus:ring-1 text-sm" placeholder="Search pet..." type="text" name="search"/>
                        <button className="flex items-center justify-center md:-ml-12 -ml-8  ">
                            <BsSearch/>
                        </button>
                    </div>
                      
                </div>
                <div className='w-full lg:min-w-full mb-5  flex-grow md:px-8 px-5'>
                    <div className="h-fit">
                        <h3 className={Object.keys(errMsg).length !== 0 ? 'hidden' : "font-bold md:text-xl font-display pt-4 mb-4"}>Pet Adoption</h3>
                    </div>
                    <div className="flex flex-wrap">
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
                            {adoptData.map((item, i) => (
                                <div key={i} className="w-auto  shadow-lg border-solid border rounded-xl mb-4 bg-white">
                                    <img className="h-48 w-full object-cover"  src={`${item.img}`} alt="item-preview" />
                                    <div className="px-3 my-3">
                                        <p className="font-medium text-lg flex">{capitalizeLetter(item.name)}
                                        <GiRibbonMedal className={" ml-2 inline-block  mt-1" + (item.age < 3 ? ' fill-yellow-400' : ' fill-zinc-600')}/></p>
                                        <p className="font-normal text-sm text-gray-600">Age {item.age} months</p>
                                        <p className="text-sm">Race: <span className="font-medium">{item.animal_race}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    {Object.keys(errMsg).length !== 0 && 
                        <h5 className="font-semibold text-xl px-8 font-display py-20 text-center">{errMsg.message}</h5> 
                    }
                </div>
            
                <div className="flex gap-5 justify-center mb-6 ">
                        {page > 1 && 
                            <button onClick={() => setPage(current => current - 1)} type="button" className="border border-1 bg-orange-200 hover:bg-orange-100 rounded-md p-2 shadow font-medium">Previous Page</button>
                        }
                        {endIndex > 0 &&
                            <button onClick={() => setPage(current => current + 1)} type="button" className="bg-orange-200 hover:bg-orange-100 border border-1 rounded-md p-2 shadow font-medium">Next Page</button>
                        }
                </div>
                <FooterLayout />
            </div>
        </>
     );
}
 
export default AdoptCatalog;