import { Link } from "react-router-dom";
import '../assets/style.css'
const ListCategories = () =>{
    return (
        
        <div className="flex inline font-sans my-5 md:gap-6  gap-2 overflow-x-auto scrollbar">
            <button className="text-sm md:text-base flex justify-center py-2  px-3 min-w-max hover:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50">
                Minuman
            </button>
        </div>
        
    )
}

export default ListCategories;