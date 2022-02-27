import { useEffect } from "react";
const AdoptionCatalog = ({setAnimalCategories, animalCategories, currentCategory, handleCategoryClick, handleClickAll}) => {
   
    useEffect(() => {
        const base_url = process.env.REACT_APP_BASE_URL;
        fetch(`${base_url}/categories`)
            .then(res => res.json())
            .then(result => {
                setAnimalCategories(result.data)
            });
    }, [setAnimalCategories]);

    const capitalizeLetter = (string) => {
        let word = string.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }

    console.log("test");

    return ( 
        <div>
            {/* {animalCategories.map(item => (
                <button key={item.id} onClick={() => handleCategoryClick(item.id)} className={`w-16 md:w-20 font-bold bg-orange-200 hover:bg-orange-400 border border-slate-400 text-center py-2 rounded-md ${currentCategory === item.id ? 'bg-orange-400' : 'bg-orange-200'}`}>{item.name}</button>
            ))} */}
            <ul className="text-gray-800 my-2 md:mx-1 mx-2 md:pb-1">
                <li className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1 '><button onClick={() => handleClickAll() } type='button' className='py-2 px-2 rounded-md'>All categories</button></li>
                    {animalCategories.map(item => (
                        <li key={item.id} className='hover:text-sky-800 hover:bg-gray-100 text-sm md:text-base rounded-md mb-1 '><button onClick={() => handleCategoryClick(item.id)} type='button' className='py-2 px-2 rounded-md'>{capitalizeLetter(item.name)}</button></li>
                    ))}
            </ul>
        </div>
        
     );
}
 
export default AdoptionCatalog;