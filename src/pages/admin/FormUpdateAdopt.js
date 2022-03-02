import FooterLayout from "../../components/Footer";
import NavbarLayout from "../../components/Navbar";
import SidebarLayout from "../../components/SideberAdmin"
import { useEffect, useState } from "react";
import {storage} from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const FormUpdateAdopt = () => {
    const userData = useSelector(state => state.loginReducer);
    const [errMsg, setErrMsg] = useState({});
    const [previewImage, setPreviewImage] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [race, setRace] = useState('');
    const [category, setCategory] = useState(1);
    const [progres, setProgres] = useState(0);
    const [currentImage, setCurrentImage] = useState('');
    const [categoryChoice, setCategoryChoice] = useState([]);

    const {adoption_id} = useParams();
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        fetch(`${base_url}/admin/v1/adopt/${adoption_id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }
        })
        .then(res => res.json())
        .then(result => {
            setName(result.data.name);
            setAge(result.data.age);
            setRace(result.data.animal_race);
            setCategory(result.data.categoryId);
            setPreviewImage(result.data.img);
            setCurrentImage(result.data.img);
        });
    }, [setName, setAge, setRace, setCategory, setPreviewImage, setCurrentImage, base_url, userData, adoption_id]);

   
    useEffect(() => {
        fetch(`${base_url}/categories`, {
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON',
                'authorization': userData.user?.accessToken
            }})
            .then(res => res.json())
            .then(result => {
                setCategoryChoice(result.data.categories)
            });
    }, [base_url, userData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(category);
        const image = e.target[4].files[0];
        const imageName = currentImage.split('/')[7].split('?')[0];
        console.log(imageName);
        if (image) {
            const imageRef = ref(storage, imageName);
            deleteObject(imageRef).then(() => {
                uploadImage(image);
            }).catch(err => {
                console.log(err);
            })
        } else {
            storeAdopionCatalog(previewImage)
        }
    }

    const uploadImage = (image) => {
        setProgres(0);
        const extension = image.name.split('.')[1]
        const imageName = Math.floor(Math.random() * 100000000000).toString();
        const uploadImageProcess = uploadBytesResumable(ref(storage, `${imageName}.${extension}`), image);
        uploadImageProcess.on("state_changed", (snapshot) => {
            const currentProgres = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgres(currentProgres);
        }, (err) => setErrMsg(err), 
        () => {
            getDownloadURL(uploadImageProcess.snapshot.ref)
            .then(imageUrl => {
                console.log(imageUrl);
                storeAdopionCatalog(imageUrl)
            })
        })
    }

    const storeAdopionCatalog = (imageUrl) => {
        fetch(`${base_url}/admin/v1/adopt/${adoption_id}`, {
            method: "PUT",
            headers: {
                    'Content-Type': 'Application/JSON',
                    'authorization': userData.user?.accessToken
                },
            body: JSON.stringify({
                name, 
                img: imageUrl,
                age,
                animal_race: race,
                categoryId: category
            })
        }).then(() => {
            // setErrMsg({message: "Catalog uploaded"})
            navigate("/admin/adopt");
        }).catch(err => {
            console.log(err);
        })
    }

    const imagePreview = (image) => {
        setPreviewImage(URL.createObjectURL(image));
    }

    console.log("test");
    return ( 
        <div>
            <NavbarLayout/>
            <div className="flex bg-orange-50">
                <SidebarLayout />
                <div className="grid justify-center h-max min-h-screen w-full py-10 bg-orange-50">
                    <div className="h-fit w-[70vw] md:w-[50vw] border border-slate-400 px-5 pt-4 shadow-2xl">
                        <h1 className="text-center text-2xl font-semibold">UPDATE ADOPTION</h1>
                        {Object.keys(errMsg).length !== 0 && <h1 className="bg-slate-200 mt-3 -mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg.message}</h1>}
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-8 gap-3 md:gap-3">
                            <label className="text-gray-700 ml-2">Name</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="border-2 h-12 rounded-md pl-2" type="text" placeholder="Name..." required/>
                            <label className="text-gray-700 ml-2">Age</label>
                            <input onChange={(e) => setAge(e.target.value)} value={age} className="border-2 h-12 rounded-md pl-2" type="number" placeholder="Age" />
                            <label className="text-gray-700 ml-2">Race</label>
                            <input onChange={(e) => setRace(e.target.value)} value={race} className="border-2 h-12 rounded-md pl-2" type="text" placeholder="Race..." />
                            <label className="text-gray-700 ml-2">Categories</label>
                            <select onChange={(e) => setCategory(e.target.value)} value={category} className="border-2 h-12 rounded-md pl-2">
                                {categoryChoice.map(item => (<option key={item.id} value={item.id}>{item.name}</option>))}
                            </select>
                            <label className="block ml-auto mr-auto my-6">
                                <span className="sr-only">Choose image</span>
                                <input onChange={(e) => imagePreview(e.target.files[0])} type="file" className="block w-full text-sm text-gray-700
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-slate-200
                                hover:file:bg-orange-400
                                " multiple />
                            </label>
                            {previewImage && <img src={`${previewImage}`} alt="update-preview" className="ml-auto mr-auto"/>}
                            <div className="flex justify-center mt-4">
                                <button type="submit" className="btn bg-orange-200 py-3 self-center w-40 rounded-md font-bold border border-slate-400 hover:bg-orange-400">Submit</button>
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
     );
}
 
export default FormUpdateAdopt;