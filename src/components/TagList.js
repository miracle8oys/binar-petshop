import { useEffect, useState } from "react";
import {FiTrash2} from 'react-icons/fi';
import {AiFillTag} from 'react-icons/ai'
import { useSelector } from "react-redux";

const TagList = ({isRefresh, setRefresh}) =>{
    const [tagProd, setTagProd] = useState([]);
    const base_url = process.env.REACT_APP_BASE_URL;
    const userData = useSelector(state => state.loginReducer.user);

    useEffect(() =>{
        fetch(`${base_url}/admin/v1/tags`, {
            method: "GET",
            headers:{
                'Content-Type': 'Application/JSON',
                'authorization': userData.accessToken
            },
            }).then((res) => {
                return res.json()
            })
            .then((data) => {
                setRefresh(false);
                // console.log(data);
                setTagProd(data);
            })
            .catch((err) =>{
                console.log(err)
                setRefresh(false)
            })
    },[isRefresh, setRefresh, base_url, userData]);
   
    const handleDelete = (id) => {
        fetch(`${base_url}/admin/v1/tags/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'Application/JSON',
                'authorization': userData.accessToken
            }
        }).then(() => {
            setRefresh(true);
        })
    }

    return(
        <ul>
            {tagProd.data?.map(item =>(
                 <li key={item.id}>
                     <div className="grid grid-cols-2 ">
                        <p className='flex font-medium text-lg md:px-28'><AiFillTag className="mx-4 my-2"/>{item.name}</p>
                        <button onClick={() => handleDelete(item.id)} className="text-xl flex justify-end mr-16"> <FiTrash2/></button >
                     </div>
                 
             </li>
            ))}
        </ul>
    )
}

export default TagList;