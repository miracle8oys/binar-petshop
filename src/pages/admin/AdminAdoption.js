import { useEffect, useState } from "react";
import NavbarLayout from "../../components/Navbar";
import FooterLayout from "../../components/Footer";
import { Link } from "react-router-dom";
import {MdAddCircleOutline} from "react-icons/md"
import AdoptionCatalog from "../../components/AdoptionCatalog";
import { storage } from "../../config/firebase";
import { deleteObject, ref } from "firebase/storage";

const AdminAdoption = () => {

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
                'Content-Type': 'Application/JSON'
            }
        })
        .then(res => res.json())
        .then(result => {
            // setAdoptData(result)
            console.log(result.data);
            setAdoptData(result.data)
        });

        //setAnimalCategories(categories);
    }, [currentCategory, keyword, changes]);

    // useEffect(() => {
    //     fetch('http://localhost:8000/categories')
    //         .then(res => res.json())
    //         .then(result => {
    //             setAnimalCategories(result.data)
    //         });
    // }, []);

    const handleCategoryClick = (categoryId) => {
        if (currentCategory === categoryId) {
            setCurrentCategory('');
        } else {
            setCurrentCategory(categoryId);
        }
    }

    const handleDelete = (id, imageUrl) => {
        const imageName = imageUrl.split('/')[7].split('?')[0];
        const imageRef = ref(storage, imageName);
        fetch(`${base_url}/admin/v1/adopt/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'Application/JSON'
            }
        }).then(() => {
            deleteObject(imageRef).then(() => {
                setChanges(current => current + 1);
            })
        })
    }
    console.log("test");
    return (
        <> 
            <NavbarLayout />
                <div className="bg-orange-50 h-max min-h-screen">
                    <h1 className="text-center py-3 text-2xl font-bold">Adoption</h1>
                    <div className="flex justify-center my-3 gap-1 mb-5">
                        <input type="search" className="w-3/4 md:w-2/4 border-2" onChange={(e) => setKeyword(e.target.value)} />
                        <button className="py-2 px-3 bg-slate-200 rounded-md">Search</button>
                    </div>
                    <div className="flex justify-center mb-3">
                        <Link to="/admin/adopt/add" className="text-6xl">
                            <MdAddCircleOutline />
                        </Link>
                    </div>
                    {/* <div className="flex justify-between mx-3 md:mx-12 mb-7 md:mb-7">
                        {animalCategories.map(item => (
                            <button key={item.id} onClick={() => handleCategoryClick(item.id)} className={`w-16 md:w-20 font-bold bg-slate-500 text-center py-2 rounded-md ${currentCategory === item.id ? 'bg-orange-500' : 'bg-slate-500'}`}>{item.name}</button>
                        ))}
                    </div> */}
                    <AdoptionCatalog setAnimalCategories={setAnimalCategories} animalCategories={animalCategories} currentCategory={currentCategory} handleCategoryClick={handleCategoryClick} />
                    <div className="grid grid-cols-2 md:grid-cols-5 mx-3 pb-3 md:mx-12 gap-5">
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
                    </div>
                </div>
            <FooterLayout />
        </>
     );
}
 
export default AdminAdoption;