import { useEffect, useState } from "react";
import NavbarLayout from "../../components/Navbar";
import FooterLayout from "../../components/Footer";
import SidebarLayout from "../../components/SideberAdmin"
import {BiEdit} from 'react-icons/bi';
import {FiTrash2} from 'react-icons/fi';
import {IoIosArrowDropdown} from 'react-icons/io'
import { Link, useNavigate } from "react-router-dom";
// import {MdAddCircleOutline} from "react-icons/md"
// import AdoptionCatalog from "../../components/AdoptionCatalog";
import { storage } from "../../config/firebase";
import { deleteObject, ref } from "firebase/storage";
import { useSelector } from "react-redux";

const AdminAdoption = ({user}) => {
    const userData = useSelector(state => state.loginReducer);
    const navigate = useNavigate();
    const [DropdownToggle, setDropDown] = useState(false);
    const [count, setCount] = useState(0)
    const [adoptData, setAdoptData] = useState([]);
    const [animalCategories, setAnimalCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [changes, setChanges] = useState(0);
    const base_url = process.env.REACT_APP_BASE_URL;
    
    useEffect(() => {
        fetch(`${base_url}/adopt?title=${keyword}&category=${currentCategory}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            setAdoptData(result.data.all_adopt)
            setCount(result.count)
        });

        //setAnimalCategories(categories);
    }, [base_url, userData, currentCategory, keyword, changes]);

    useEffect(() => {
        fetch('http://localhost:8000/categories',{
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            setAnimalCategories(result.data.categories)
        });
    }, [base_url, userData]);

    const handleCategoryClick = (categoryId) => {
        if (currentCategory === categoryId) {
            setCurrentCategory('');
        } else {
            setCurrentCategory(categoryId);
        }
    }

    const handleChange = (e) =>{
        setKeyword(e.target.value)
    };

    const handleClickAll = () =>{
        setCurrentCategory('');
    }

    const handleDelete = (id, imageUrl) => {
        const imageName = imageUrl.split('/')[7].split('?')[0];
        const imageRef = ref(storage, imageName);
        const base_url = process.env.REACT_APP_BASE_URL;
        fetch(`${base_url}/admin/v1/adopt/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        }).then(() => {
            deleteObject(imageRef).then(() => {
                setChanges(current => current + 1);
            })
        })
    }

    return (
        <div> 
            <NavbarLayout user={user} />
            <div className="md:flex bg-orange-50">
                <SidebarLayout/>
                <div className="bg-orange-50 h-max min-h-screen w-full py-5">
                    <h1 className="text-center py-3 text-2xl font-bold">Adoption Data</h1>
                    {/* <div className="flex justify-center my-3 gap-1 mb-5">
                        <input type="search" className="w-3/4 md:w-2/4 border-2" onChange={(e) => setKeyword(e.target.value)} />
                        <button className="py-2 px-3 bg-orange-200 hover:bg-orange-300 rounded-md font-bold">Search</button>
                    </div>
                    <div className="flex justify-center mb-3">
                        <Link to="/admin/adopt/add" className="text-6xl">
                            <MdAddCircleOutline />
                        </Link>
                    </div> */}
                    {/* <div className="flex justify-between mx-3 md:mx-12 mb-7 md:mb-7">
                        {animalCategories.map(item => (
                            <button key={item.id} onClick={() => handleCategoryClick(item.id)} className={`w-16 md:w-20 font-bold bg-slate-500 text-center py-2 rounded-md ${currentCategory === item.id ? 'bg-orange-500' : 'bg-slate-500'}`}>{item.name}</button>
                        ))}
                    </div> */}
                    {/* <AdoptionCatalog setAnimalCategories={setAnimalCategories} animalCategories={animalCategories} currentCategory={currentCategory} handleCategoryClick={handleCategoryClick} /> */}
                    <div className="mx-6">
                        <div className='mt-6 hidden md:flex justify-between items-center mb-4'>
                            <section>
                                <button type='button' onClick={()=> setDropDown(!DropdownToggle)}  className='p-2 bg-orange-200 hover:bg-orange-300 active:bg-orange-300  rounded-md md:text-base font-bold text-sm border border-slate-400'>Category <IoIosArrowDropdown className="inline"/></button>
                                <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                                    <ul className="text-gray-800 m-2 md:pb-1">
                                        <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleClickAll()}>All Category</button></li>
                                        {animalCategories.map(item =>(
                                            <li key={item.id}  className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleCategoryClick(item.id)}>{item.name}</button></li>
                                            ))}
                                    </ul>
                                </div>
                            </section>
                            <div className='basis-1/2'>
                                <div className='col-end-12'>
                                    <div className='flex'>
                                        <input onChange={handleChange} className="md:min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-400 rounded-full py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search..." type="search" name="search"/>
                                        <button className="flex items-center justify-center px-4 border-l -ml-14 hover:bg-gray-100 rounded-full ">
                                            <svg className="md:w-6 md:h-6 w-4 h-4 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <button type="button" onClick={() => navigate('/admin/adopt/add')} className="bg-orange-200 p-3 hover:bg-orange-300 rounded-lg font-bold text-sm border border-slate-400">New Adoption</button>
                            </div>
                        </div>

                        <div className='mt-6 md:hidden items-center mb-4'>
                            <div className='basis-1/2'>
                                <div className='col-end-12'>
                                    <div className='flex'>
                                        <input onChange={handleChange} className="min-w-full placeholder:italic placeholder:text-slate-400 bg-white border border-slate-400 rounded-full py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Search..." type="search" name="search"/>
                                        <button className="flex items-center justify-center px-4 border-l -ml-14 hover:bg-gray-100 rounded-full ">
                                            <svg className="md:w-6 md:h-6 w-4 h-4 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <section>
                                    <button type='button' onClick={()=> setDropDown(!DropdownToggle)}  className='p-2 bg-orange-200 hover:bg-orange-300 active:bg-orange-300  rounded-md md:text-base font-bold text-sm border border-slate-400'>Category <IoIosArrowDropdown className="inline"/></button>
                                    <div className={(DropdownToggle ? "absolute translate-y-1 shadow w-auto md:w-max mr-12 md:mt-1 mt-2 rounded-md h-fit border-t-[1px] bg-white overflow-y-auto h-60 overflow-x-hidden" : "hidden")}>
                                        <ul className="text-gray-800 m-2 md:pb-1">
                                            <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleClickAll()}>All Category</button></li>
                                            {animalCategories.map(item =>(
                                                <li key={item.id}  className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1'><button type='button' className='py-2 px-2 rounded-md' onClick={() => handleCategoryClick(item.id)}>{item.name}</button></li>
                                                ))}
                                        </ul>
                                    </div>
                                </section>
                                <div className="">
                                    <button type="button" onClick={() => navigate('/admin/adopt/add')} className="bg-orange-200 p-3 hover:bg-orange-300 rounded-lg font-bold text-sm border border-slate-400">New Adoption</button>
                                </div>
                            </div>
                        </div>

                        <p className="font-bold mb-4">Total Data : {count}</p>
                        <div className="overflow-x-auto">
                            <table className="table-auto border border-slate-400 divide-y divide-slate-400 min-w-full shadow-md mx-auto mb-6 text-sm lg:text-base">
                                <thead className="">
                                    <tr className="">
                                        <th className="py-4 text-center">No.</th>
                                        <th className="py-4 text-center">Name</th>
                                        <th className="py-4 text-center">Image</th>
                                        <th className="py-4 text-center">Age</th>
                                        <th className="py-4 text-center">Race</th>
                                        <th className="py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-400">
                                    {adoptData.map((item, i) => 
                                    <tr key={item.id} className=" mb-4">
                                        <td className="text-center px-2">{i + 1}.</td>
                                        <td className="text-center px-2 font-semibold">{item.name}</td>
                                        <td className="flex justify-center py-4 mx-2 w-24 sm:w-auto">
                                            <img className="h-20 md:h-32" src={`${item.img}`} alt="item-preview" />
                                        </td>
                                        <td className="text-center px-2">{item.age}</td>
                                        <td className="text-center px-2">{item.animal_race}</td>
                                        <td className="py-4 px-2">
                                            <div className="flex justify-center mb-2">
                                                <Link to={`/admin/adopt/update/${item.id}`} className="bg-yellow-200 hover:bg-yellow-400 py-2 rounded-lg w-28 inline-flex items-center justify-center font-bold border text-sm border-slate-300"><BiEdit className="mr-3"/>Update</Link>
                                            </div>
                                            <div className="flex justify-center">
                                                <button onClick={() => handleDelete(item.id, item.img)} className="bg-red-200 hover:bg-red-400 py-2 rounded-lg w-28 inline-flex items-center justify-center font-bold border text-sm border-slate-300"><FiTrash2 className="mr-3"/>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2 md:grid-cols-5 mx-3 pb-3 md:mx-12 gap-5">
                        {adoptData.map((item, i) => (
                            <div key={i} className="text-lg border-2 py-3 px-2 bg-slate-200 rounded-md">
                                <img className="h-[53%]" src={`${item.img}`} alt="item-preview" />
                                <div>
                                    <h1 className="font-bold">{item.name}</h1>
                                    <h1 className="font-medium mt-1 text-base">{item.age} Bulan</h1>
                                    <h1 className="font-semibold">Species: <span className="font-bold">{item.animal_race}</span></h1>
                                </div>
                                <div className="flex justify-between">
                                    <Link to={`/admin/adopt/update/${item.id}`} className="bg-yellow-500 py-1 px-1 rounded-md font-bold">Update</Link>
                                    <button onClick={() => handleDelete(item.id, item.img)} className="bg-red-500 py-1 px-1 rounded-md font-bold">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
            <FooterLayout />
        </div>
     );
}
 
export default AdminAdoption;