import { useState } from "react"
import TagHeader from "../../components/TagHeader"
import TagList from "../../components/TagList"
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";

const Tags = ({user}) =>{
    const [isRefresh, setIsRefresh] = useState(true)

    const setRefresh = (status) =>{
        setIsRefresh(status)
    }

    return(
        <div className="flex flex-col h-screen w-full">
            <NavbarLayout user={user} />
            <div className="flex-grow mx-16 my-8">
                <p className="font-bold text-xl text-center mb-6">Product Tag</p>
                <TagHeader setRefresh={setRefresh}/>
                <TagList  setRefresh={setRefresh} isRefresh={isRefresh}/>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default Tags;