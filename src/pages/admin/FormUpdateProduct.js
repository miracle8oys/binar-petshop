import { useEffect, useState } from "react";
import { useParams,  useNavigate  } from "react-router-dom";
import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import { useSelector } from "react-redux";
import { storage } from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL, deleteObject } from "firebase/storage";
import Select from "react-select";


const UpdateProduct = ({user}) =>{
    const {id} = useParams()
    const [tags, setTags] = useState([])
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [desc, setDesc] = useState('');
    const [selectedOption, setSelectedOption]= useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [errMsg, setErrMsg] = useState({});
    const [weight, setWeight] = useState(0);
    const [sold, setSold] = useState(0);
    const [currentImage, setCurrentImage] = useState('');
    const [progres, setProgres] = useState(0);
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;
    const userData = useSelector(state => state.loginReducer);
    // console.log(userData.user?.accessToken);

    useEffect(() =>{
        fetch(`${base_url}/admin/v1/products/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            setName(result.data.product_id.name);
            setPrice(result.data.product_id.price);
            setQty(result.data.product_id.qty);
            setDesc(result.data.product_id.description);
            setSelectedOption(result.data.tags_id.map((item) => (
                {value: item.id,
                label : item.name}
            )))
            setWeight(result.data.product_id.weight);
            setSold(result.data.product_id.sold);
            setCurrentImage(result.data.product_id.img)
            setPreviewImage(result.data.product_id.img)

        });
    }, [setName, setPrice, setQty, setDesc, setWeight, setSold, setSelectedOption, setCurrentImage, setPreviewImage, base_url, id, userData]);

    useEffect(() => {
        fetch(`${base_url}/admin/v1/tags`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'Application/JSON',
                }
            })
            .then(res => res.json())
            .then(result => {
                setTags(result.data)
            });                    

    }, [base_url])

    let optionsTag = tags.map((item) => (
        {value: item.id,
        label : item.name}
    )) 
       

    const handleChange = (e) =>{
        setSelectedOption(e);
        console.log("test", e)
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        const img = e.target[7].files[0];
        const imgName = currentImage.split('/')[7].split('?')[0];
        console.log(imgName);
        if(img){
            const imgRef = ref(storage, imgName);
            deleteObject(imgRef).then(() =>{
                uploadImage(img)
            }).catch(err => {
                console.log(err);
            })

        }else{
            storeProduct(previewImage);
        }
        
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
        fetch(`${base_url}/admin/v1/products/${id}`, {
            method: "PUT",
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
                tags_id: selectedOption.map((item) => item.value),
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
    const imagePreview = (image) => {
        setPreviewImage(URL.createObjectURL(image));
    }
    
    return (
        <div className="flex flex-col h-screen w-full">
            <NavbarLayout user={user}/>
            <div className="flex-grow  my-4 block bg-sky-50 w-1/2 mx-auto rounded-lg shadow p-2 ">
            <p className="md:text-2xl text-center font-semibold my-3">Product</p>
                {Object.keys(errMsg).length !== 0 && <h1 className="bg-slate-200 mt-3 -mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg.message}</h1>}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group mb-2 px-4">
                        <label className="form-label inline-block my-2">Product Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control
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
                            <input onChange={(e)=> setPrice(e.target.value)} value={price} type="number" className="form-control
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
                        <input onChange={(e) => setQty(e.target.value)} value={qty} type="number" className="form-control
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
                        <input onChange={(e) => setWeight(e.target.value)} value={weight} type="number" step="any" className="form-control
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
                        <input onChange={(e) => setSold(e.target.value)} value={sold} type="number" className="form-control
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
                        <Select placeholder="New Category" isMulti options={optionsTag}  value={selectedOption}  onChange={handleChange} id="tags" isClearable/>

                    </div>



                    <div className="form-group mb-6 px-4">
                        <label  className="form-label inline-block my-2">Description</label>
                        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className="form-control
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

                    <div className="flex justify-center py-6">
                        <input type="file" onChange={(e) => imagePreview(e.target.files[0])} name="img" className="ml-10 text-sm text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-200 file:text-yellow-700
                        hover:file:bg-yellow-100
                        " multiple />

                    </div>
                    <div className=" flex justify-center">
                        {previewImage && <img src={`${previewImage}`} alt="preview-image" className="w-52"/>} 
                    </div>


                    <div className="flex justify-center my-6">
                        <button type="submit" className="rounded w-40 bg-green-200 hover:bg-green-300 p-2 font-semibold">Submit</button>
                    </div>
                </form>
                <div className="flex justify-center">
                    {!!progres && <p>{progres}%</p>}
                </div>
         </div>
            <FooterLayout/>
        </div>
    )
}

export default UpdateProduct;