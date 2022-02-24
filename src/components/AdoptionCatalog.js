import { useEffect } from "react";
const AdoptionCatalog = ({setAnimalCategories, animalCategories, currentCategory, handleCategoryClick}) => {
   
    useEffect(() => {
        const base_url = process.env.REACT_APP_BASE_URL;
        fetch(`${base_url}/categories`)
            .then(res => res.json())
            .then(result => {
                setAnimalCategories(result.data)
            });
    }, [setAnimalCategories]);

    console.log("test");

    return ( 
        <div className="flex justify-between mx-3 md:mx-12 mb-7 md:mb-7">
            {animalCategories.map(item => (
                <button key={item.id} onClick={() => handleCategoryClick(item.id)} className={`w-16 md:w-20 font-bold bg-orange-200 hover:bg-orange-400 border border-slate-400 text-center py-2 rounded-md ${currentCategory === item.id ? 'bg-orange-400' : 'bg-orange-200'}`}>{item.name}</button>
            ))}
        </div>
     );
}
 
export default AdoptionCatalog;