import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import ListPet from "../components/ListPet";
import HomePet from "../assets/woof-delivery.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = ({user}) => {

    const [petList, setPetList] = useState([])
    const [tags, setTags] = useState([])
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
    

    useEffect(() => {
        fetch(`${base_url}/adopt`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/JSON"
            }})
        .then(res => res.json())
        .then(result => {
            setPetList(result.data)
        }, [])
        fetch(`${base_url}/admin/v1/tags`, 
        {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON'
            }
        })
        .then(res => res.json())
        .then(result => {
            setTags(result.data)
        }, []);
    }, [base_url]);

    const handleClickCategory = (name)=>{
        navigate(`/products/tags=${name}`)
    }

    const capitalizeLetter = (tags) => {
        let word = tags.toLowerCase().split(' ')
        for(let i = 0; i < word.length; i++){
            word[i] = word[i].charAt(0).toUpperCase() + word[i].substring(1)
        }
        return word.join(' ')
    }
    return ( 
        <div className="h-screen w-full mx-auto">
            <NavbarLayout user={user}/>
            <div className="bg-orange-50 mx-auto">
                <div className="py-5 flex justify-center items-center grid md:grid-cols-2 md:auto-cols-max ">
                    <div className="font-bold text-center my-5 tracking-wide md:tracking-normal">
                        <h1 className="md:text-4xl font-display">Love your pet</h1>
                        <h1 className="md:text-4xl font-display">Make them healthy</h1>
                        <div className="md:mt-14 mt-8">
                            <Link to={'/catalog'} className="rounded-full bg-orange-400 p-2 md:p-3 text-sm font-medium text-white shadow-lg hover:bg-orange-300 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 w-52 md:w-max md:text-base" type="submit" name="submit">Browse products</Link>
                        </div>
                        
                    </div>
                        <img src={HomePet} alt="Pet" className="hidden md:block md:w-auto"/> 
                </div>
            </div>
            <div className="mx-auto md:mx-5 px-3 mt-6 p-2">
                 <h5 className="font-bold md:text-lg font-display">Products Category </h5>
                    <div className="flex inline font-sans my-5 md:gap-6 gap-2 overflow-x-auto scrollbar">
                    {tags.map(tag => (
                        <button key={tag.id} onClick={() => handleClickCategory(tag.name)}  className="text-sm md:text-base flex justify-center py-2  px-3 min-w-max hover:bg-amber-100 active:bg-amber-100 focus:bg-amber-100 rounded-full border-amber-200 border-solid border bg-amber-50 mb-3">
                            {capitalizeLetter(tag.name)}
                        </button>
                    ))}
                    </div>
            </div>
            <div>
                <div className="px-3 mb-10 md:mx-5 mx-auto">
                    <h4 className="font-bold md:text-lg font-display mb-4">Pet Adoption</h4>
                    <div className='grid md:grid-cols-6 grid-cols-2 gap-4 md:gap- mx-auto'>
                    {petList.slice(0,5).map(item => (
                        <div key={item.id} className="shadow-lg border-solid border rounded bg-slate-200">
                            <ListPet pet ={item}/>
                        </div>
                    ))}
                    </div>
                </div>         
            </div>
            <FooterLayout/>
        </div>
     );
}
 
export default Home;