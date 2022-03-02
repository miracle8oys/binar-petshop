import FooterLayout from "../../components/Footer"
import NavbarLayout from "../../components/Navbar"
import SidebarLayout from "../../components/SideberAdmin"
import { useState, useEffect } from "react";
import { storage } from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddProduct = () =>{
    const [tags, setTags] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [desc, setDesc] = useState('');
    const [selectedOption, setSelectedOption]= useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [errMsg, setErrMsg] = useState({});
    const [weight, setWeight] = useState(0);
    const [sold, setSold] = useState(0);
    const [progres, setProgres] = useState(0);
    const navigate = useNavigate();

    const base_url = process.env.REACT_APP_BASE_URL;
    const userData = useSelector(state => state.loginReducer);
    // console.log(userData.user?.accessToken)
    useEffect(() => {
        fetch(`${base_url}/admin/v1/tags`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken
                }
            })
            .then(res => res.json())
            .then(result => {
                // console.log(result.data)
                setTags(result.data.tags)
            });
    }, [base_url, userData]);
    let optionsTag = tags.map((item) => (
        {value: item.id,
        label : item.name}
    )) 

    const handleChange = (e) =>{
        setSelectedOption(Array.isArray(e) ? e.map(x => x.value) : []);
    }

     const handleSubmit = (e) =>{
        e.preventDefault();
        uploadImage(e.target[7].files[0]);
    }


    const uploadImage = (image) =>{
        setProgres(0);
        const extension = image.name.split('.')[1];
        const imgName = Math.floor(Math.random() * 100000000000).toString();
        const uploadImageProcess = uploadBytesResumable(ref(storage, `${imgName}.${extension}`), image);
        uploadImageProcess.on("state_changed", (snaphot) => {
            const currentProgress = Math.round((snaphot.bytesTransferred / snaphot.totalBytes) * 100);
            setProgres(currentProgress);
        }, (err) => setErrMsg(err),
        () => {
            getDownloadURL(uploadImageProcess.snapshot.ref)
            .then(imageUrl => {
                storeProduct(imageUrl);
            })
        })
    }

    const storeProduct = (imageUrl) => {
        if(Object.keys(selectedOption).length === 0){
            setErrMsg({message: 'Please select product tags!'})
        }else { 
            fetch(`${base_url}/admin/v1/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken 
                },
                body: JSON.stringify({
                    name,
                    price,
                    qty,
                    weight, 
                    sold,
                    tags_id: selectedOption,
                    description: desc,
                    img: imageUrl 
                })
            }).then(() =>{
                navigate("/admin/products")
            }).catch(err => {
                console.log(err);
                setErrMsg(err);
            })
        }
    }

    const imagePreview = (image) => {
        setPreviewImage(URL.createObjectURL(image));
    }

    return(
        <div className="flex flex-col">
            <NavbarLayout/>
            <div className="flex">
                <SidebarLayout />
                <div className="flex flex-col w-full bg-orange-50">
                    <div className="flex-grow  my-4 block  w-[70vw] md:w-[50vw] mx-auto rounded-lg shadow-2xl p-2 border border-slate-400 my-10">
                        <p className="md:text-2xl text-center font-semibold my-3">ADD PRODUCT</p>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="form-group mb-2 px-4">
                                <label className="form-label inline-block my-2">Product Name</label>
                                <input onChange={(e) => setName(e.target.value)} type="text" className="form-control
                                    block
                                    w-full
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="name"
                                    placeholder="Enter name"/>
                            </div>
                            <div className="form-group mb-2 px-4">
                                <label className="form-label inline-block my-2">Price</label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">Rp</span>
                                    <input onChange={(e)=> setPrice(e.target.value)} min={0} type="number" className="form-control
                                        block
                                        w-full
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
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="price"
                                        placeholder="10000"/>
                                </div>
                            </div>
                            <div className="form-group mb-2 px-4">
                                <label className="form-label inline-block my-2">Quantity</label>
                                <input onChange={(e) => setQty(e.target.value)} min={0} type="number" className="form-control
                                    block
                                    w-full
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="qty"
                                    placeholder="Enter quantity"/>
                            </div>
                            <div className="form-group mb-2 px-4">
                                <label className="form-label inline-block my-2">Weight</label>
                                <input onChange={(e) => setWeight(e.target.value)} min={0} type="number" step="any" className="form-control
                                    block
                                    w-full
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="weight"
                                    placeholder="Enter weight"/>
                            </div>
                            <div className="form-group mb-2 px-4">
                                <label  className="form-label inline-block my-2">Sold</label>
                                <input onChange={(e) => setSold(e.target.value)} min={0} type="number" className="form-control
                                    block
                                    w-full
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="sold"
                                    placeholder="Enter sold"/>
                            </div>
                            <div className="form-group mb-2 px-4">
                                <label className="form-label inline-block my-2">Tag</label>
                                <Select isMulti options={optionsTag} value={optionsTag.filter(obj => selectedOption.includes(obj.value))} onChange={handleChange} id="tags"/>
                                {Object.keys(errMsg).length !== 0 && <p className="text-red-500">{errMsg.message}</p>}
                            </div>
                            <div className="form-group mb-6 px-4">
                                <label  className="form-label inline-block my-2">Description</label>
                                <textarea onChange={(e) => setDesc(e.target.value)} className="form-control
                                    block
                                    w-full
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="description"
                                    placeholder="Description"></textarea>
                            </div>
                            {/* {selectedOption} */}

                            <div className="flex justify-center py-6">
                                
                                <input type="file" onChange={(e) => imagePreview(e.target.files[0])} name="img" className="ml-10 text-sm text-gray-700
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-slate-200 
                                hover:file:bg-orange-400
                                " multiple required/>

                            </div>
                            <div className=" flex justify-center">
                                {previewImage && <img src={`${previewImage}`} alt="preview-product" className="w-52"/>} 
                            </div>

                            <div className="flex justify-center my-6">
                                <button type="submit" className="rounded w-40 bg-orange-200 hover:bg-orange-400 p-2 border border-slate-400 rounded-md font-bold">Submit</button>
                            </div>
                        </form>
                        <div className="flex justify-center">
                            {!!progres && <p>{progres}%</p>}
                        </div>
                    </div>
                </div>
            </div>
            <FooterLayout/>
        </div>
    )
}

export default AddProduct;