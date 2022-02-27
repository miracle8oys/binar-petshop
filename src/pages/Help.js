import { useEffect, useState } from "react"
import FooterLayout from "../components/Footer"
import NavbarLayout from "../components/Navbar"
import {IoIosArrowDropdown} from "react-icons/io";
import data from "../assets/data/helpData.json";
import { BsSearch } from "react-icons/bs";
import '../assets/style.css';
import CallCenter from  '../assets/call-center.png';
import QnA from '../assets/bg-qa.png';
import {BsChatDotsFill} from 'react-icons/bs';
import { Link } from "react-router-dom";

const Help = (user) =>{
    const [clicked, setClicked] = useState(false);
    const [query, setQuery] = useState("");
    // const [msg, setMsg] = useState("");
    const [newData, setNewData] = useState([]);
  
    const toggle = (i) => {
        if (clicked === i){
            return setClicked(null)
        }
        console.log(clicked)

        setClicked(i);
    }
    
    const handleSearch = (e) =>{
        setQuery(e.target.value.toLowerCase())
    }
    useEffect(() =>{
        // console.log(data)
        setNewData(data)
    }, [])
    const filterData =  
        newData.filter((item) =>{
            if(query === ' '){
                return item
            }else if(item.question.toLowerCase().includes(query.toLowerCase())){
                return item;
            }
            return false
        })
   
   


    return (
        <div className="flex flex-col min-h-screen w-full lg:min-w-full">
            <NavbarLayout user={user}/>
            
            <div className="flex-grow flef flex-wrap mt-8 pb-6">
                <div className="mx-auto">
                <div className="grid md:grid-cols-2  md:ml-12">
                    <div className="text-3xl px-8 md:px-12 mb-10 md:my-16">
                        <h4>Halo, Pet Lovers!</h4>
                        <h4>Ada yang bisa kami bantu?</h4>
                        <div className='flex w-full mt-6 md:mt-10 '>
                            <input onChange={handleSearch} className="w-full shadow   flex justify-center w-full shadow  placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded py-2 pl-7 pr-3 shadow-sm focus:outline-none focus:border-sky-100 focus:ring-sky-500 focus:ring-1 text-sm" placeholder="Ketik kata kunci (misal: produk) " type="text" name="search"/>
                                <span className="flex items-center justify-center -ml-16 w-20 ">
                                    <BsSearch className="p-1"/>
                                </span>
                        </div>
                        <div className="flex">
                            <p className="md:text-base text-xs mt-4">Untuk menghubungi admin, silahkan klik tombol chat </p>
                            <Link to={'/chat'} className="md:py-3 py-2 text-green-500"><BsChatDotsFill className="ml-1 p-1 "/></Link>
                        </div>
                        
                    </div>
                    <div className="hidden md:flex justify-center items-center">
                        <img src={CallCenter} alt="call-center" className="md:w-32 lg:w-3/5 rounded-lg" />
                    </div>
                </div>
                
                    <div className="h-full qna-box flex-grow md:ml-14">
                        <h4 className=" px-6 text-center text-slate-700 mb-4 md:mb-0 text-lg md:text-2xl tracking-wide">Yang sering ditanyakan</h4>
                        
                        <div className="md:flex justify-center">
                            <div className="md:visible w-96 md:block invisible hidden my-auto">
                                <img src={QnA} alt="image" className="object-fit "/>
                            </div>
                
                            <div className="rounded-xl shadow md:w-3/5 w-auto mx-4 md:mx-20 bg-white h-fit my-auto">

                                {filterData.map((item, i) => (
                                    
                                    <div key={i} className="px-6 border " >
                                        {/* {item.question === null ? (<p>Kosong</p>) : ''} */}
                                    
                                        <button type="button" onClick={() => toggle(i)}   className="grid grid-cols-6 m-0 w-full py-4">
                                        
                                        <span className="w-full flex items-center text-sm md:text-base col-start-1 col-end-6 ">{item.question}</span>
                                        <IoIosArrowDropdown className={"w-full h-6 text-slate-700 transition delay-100 duration-200 col-start-6 " + (clicked === i ? "rotate-0" : "rotate-180")}/>
                                            
                                    
                                        </button>
                                        
                                        {( clicked === i ? (
                                            <div className= "py-4">
                                                <p className="text-slate-600">{item.answer}</p>
                                            </div>
                                            
                                        ): null) }
                                        
                                        
                                            
                                    </div> 
                                
                                )) }   
                        
                            </div>
                            {filterData.length === 0 &&  <div className="my-auto">
                                <p className="font-medium text-2xl">Kata Kunci '{query}' Tidak Ditemukan</p>
                                </div>}
                        </div>
                </div>
            </div>
                
                  
                        
                                      
            </div>
            <FooterLayout/>
        </div>
    )
}

export default Help;