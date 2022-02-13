import { useState } from "react"

const TagHeader = ({setRefresh}) =>{
    const [name, setName] = useState("")
    const base_url = process.env.REACT_APP_BASE_URL;

    const AddTag = (e) =>{
        e.preventDefault()
        const newTag = {name};
        fetch(`${base_url}/admin/v1/tags`, {
            method: "POST",
            headers:{
                'Content-Type': 'Application/JSON'
            }, 
            body: JSON.stringify(newTag)
        }).then(() =>{
            setName("");
            setRefresh(true);
        })
    }

    return(
        <div className="">
            <form onSubmit={AddTag}>
                <div className="form-group mb-12 px-4 flex justify-center">
                    
                    <input value={name} onChange={(e) => setName(e.target.value)} name="tags" type="text" className="block
                        w-1/2
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" required placeholder="Enter Tag Name"/>
                    <button type="submit" className="rounded w-28 bg-green-200 hover:bg-green-300 p-2 font-semibold">Submit</button>
                    
                </div>
            </form>

        </div>
    )
}

export default TagHeader;