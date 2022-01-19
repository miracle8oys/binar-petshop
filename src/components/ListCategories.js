import { Link } from "react-router-dom";
const ListCategories = () =>{
    return (
        <div className="md:flex md:inline font-sans my-5 md:gap-6 grid grid-cols-3 gap-2">
            <button className="text-sm md:text-base flex py-2 px-3 min-w-max hover:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50">
                Minuman
            </button>
            <button className="text-sm md:text-base flex py-2 px-3 min-w-max hover:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50">
                Minuman
            </button>
            <button className="text-sm md:text-base flex py-2 px-3 min-w-max hover:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50">
                Minuman
            </button>
            <button className="text-sm md:text-base flex py-2 px-3 min-w-max hover:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50">
                Minuman
            </button>
            <button className="text-sm md:text-base flex py-2 px-3 min-w-max hover:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50">
                Minuman
            </button>
        </div>
    )
}

export default ListCategories;