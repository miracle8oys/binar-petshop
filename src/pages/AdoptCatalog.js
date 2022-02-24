import { useEffect, useState } from "react";
import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import AdoptionCatalog from "../components/AdoptionCatalog";
const base_url = process.env.REACT_APP_BASE_URL;

const AdoptCatalog = ({user}) => {

    const [adoptData, setAdoptData] = useState([]);
    const [animalCategories, setAnimalCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [endIndex, setEndIndex] = useState(0);
    const limit = 5;

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

    return (
        <> 
            <NavbarLayout user={user} />
            <div className="bg-orange-50 h-max min-h-screen">
                <h1 className="text-center py-3 text-2xl font-bold">Adoption</h1>
                <div className="flex justify-center my-3 gap-1 mb-7">
                    <input type="search" className="w-3/4 md:w-2/4 border-2" onChange={(e) => setKeyword(e.target.value)} />
                    <button className="py-2 px-3 bg-slate-200 rounded-md">Search</button>
                </div>
                <AdoptionCatalog setAnimalCategories={setAnimalCategories} animalCategories={animalCategories} currentCategory={currentCategory} handleCategoryClick={handleCategoryClick} />
                <div className="grid grid-cols-2 md:grid-cols-5 mx-3 pb-3 md:mx-12 gap-5">
                    {adoptData.map((item, i) => (
                        <div key={i} className="text-lg border-2 py-3 px-2 bg-slate-200 rounded-md">
                            <img className="h-[62%]" src={`${item.img}`} alt="item-preview" />
                            <div>
                                <h1 className="font-bold">{item.name}</h1>
                                <h1 className="font-medium mt-1 text-base">{item.age} Bulan</h1>
                                <h1 className="font-semibold">Species: <span className="font-bold">{item.animal_race}</span></h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-5 justify-center bg-orange-50">
                {page > 1 &&     
                    <button onClick={() => setPage(current => current - 1)}>Previus Page</button>
                }
                {endIndex > 0 &&
                    <button onClick={() => setPage(current => current + 1)}>Next Page</button>
                }
            </div>
            <FooterLayout />
        </>
     );
}
 
export default AdoptCatalog;