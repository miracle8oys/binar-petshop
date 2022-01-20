import list from "./catalog.json";
import categories from "./categories.json";
import { useEffect, useState } from "react";
import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";

const AdoptCatalog = () => {

    const [adoptData, setAdoptData] = useState([]);
    const [animalCategories, setAnimalCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const title = "test";

    useEffect(() => {
        fetch(`http://localhost:8000/adopt?title=${title}&category=${currentCategory}`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
        .then(res => res.json())
        .then(result => {
            // setAdoptData(result)
            console.log(result);
        });

        setAdoptData(list);
        setAnimalCategories(categories);
    }, [currentCategory])

    return (
        <> 
            <NavbarLayout />
            <div className="bg-orange-50 h-max min-h-screen">
                <h1 className="text-center py-7 md:py-7 text-2xl font-bold">Adoption</h1>
                <div className="flex justify-between mx-3 md:mx-12 mb-7 md:mb-7">
                    {animalCategories.map(item => (
                        <button key={item.id} onClick={() => setCurrentCategory(item.id)} className={`w-16 md:w-20 font-bold bg-slate-500 text-center py-2 rounded-md ${currentCategory === item.id ? 'bg-orange-500' : 'bg-slate-500'}`}>{item.name}</button>
                    ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 mx-3 pb-3 md:mx-12 gap-5">
                    {adoptData.map((item, i) => (
                        <div key={i} className="text-lg border-2 py-3 px-2 bg-slate-200 rounded-md">
                            <img className="h-[75%]" src={`${item.image}`} alt="item-preview" />
                            <div className="flex gap-3 justify-between">
                                <h1 className="font-bold">{item.name}</h1>
                                <h1 className="font-medium mt-1 text-base">{3} Bulan</h1>
                            </div>
                            <h3 className="font-semibold text-center">{item.race}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <FooterLayout />
        </>
     );
}
 
export default AdoptCatalog;