import list from "./catalog.json";
import categories from "./categories.json";
import { useEffect, useState } from "react";

const AdoptCatalog = () => {

    const [adoptData, setAdoptData] = useState([]);
    const [animalCategories, setAnimalCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        // fetch('http://localhost:8000/api/v1/adopt', 
        // {
        //     headers: {
        //         'Content-Type': 'Application/JSON'
        //     },
        //     body: JSON.stringify({
        //         category: currentCategory
        //     })
        // })
        // .then(res => res.json())
        // .then(result => {
        //     setAdoptData(result)
        // });

        setAdoptData(list);
        setAnimalCategories(categories);
    }, [currentCategory])

    return ( 
        <div className="bg-orange-50 h-max min-h-screen">
            <h1 className="text-center py-7 md:py-7 text-2xl font-bold">Adoption</h1>
            <div className="flex justify-between mx-3 md:mx-12 mb-7 md:mb-7">
                {animalCategories.map(item => (
                    <button key={item.id} onClick={() => setCurrentCategory(item.name)} className={`w-16 md:w-20 font-bold bg-slate-500 text-center py-2 rounded-md ${currentCategory === item.name ? 'bg-orange-500' : 'bg-slate-500'}`}>{item.name}</button>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 mx-3 md:mx-12 gap-5">
                {adoptData.map((item, i) => (
                    <div key={i} className="text-lg border-2 py-3 px-2">
                        <img className="w-52" src={`${item.image}`} alt="item-preview" />
                        <div className="flex gap-3 justify-center">
                            <h1 className="font-semibold">{item.name}</h1>
                            <h1 className="font-semibold">{3} Bulan</h1>
                        </div>
                        <h3 className="text-center font-semibold">{item.race}</h3>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default AdoptCatalog;