import { useEffect, useState } from "react";
import {storage} from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { useParams } from "react-router-dom";

const FormUpdateAdopt = () => {
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

    useEffect(() => {
        fetch(`http://localhost:8000/admin/v1/adopt/${adoption_id}`)
        .then(res => res.json())
        .then(result => {
            setName(result.data.name);
            setAge(result.data.age);
            setRace(result.data.animal_race);
            setCategory(result.data.categoryId);
            setPreviewImage(result.data.img);
            setCurrentImage(result.data.img);
        });
    }, [setName, setAge, setRace, setCategory, setPreviewImage, setCurrentImage]);

   
    useEffect(() => {
        fetch('http://localhost:8000/categories')
            .then(res => res.json())
            .then(result => {
                setCategoryChoice(result.data)
            });
    }, []);

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
        fetch(`http://localhost:8000/admin/v1/adopt/${adoption_id}`, {
            method: "PUT",
            headers: {
                    'Content-Type': 'Application/JSON'
                },
            body: JSON.stringify({
                name, 
                img: imageUrl,
                age,
                animal_race: race,
                categoryId: category
            })
        }).then(() => {
            setErrMsg({message: "Catalog uploaded"})
        }).catch(err => {
            console.log(err);
        })
    }

    const imagePreview = (image) => {
        setPreviewImage(URL.createObjectURL(image));
    }

    console.log("test");
    return ( 
        <div className="grid justify-center h-max min-h-screen py-10 bg-orange-50">
            <div className="h-fit w-[70vw] md:w-[30vw]">
                <h1 className="text-center text-2xl font-bold">Adoption</h1>
                {Object.keys(errMsg).length !== 0 && <h1 className="bg-slate-200 mt-3 -mb-5 py-2 px-2 text-center rounded-md font-medium">{errMsg.message}</h1>}
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid my-12 gap-12 md:gap-10">
                    <input onChange={(e) => setName(e.target.value)} value={name} className="border-2 h-12 rounded-md" type="text" placeholder="Name..." />
                    <input onChange={(e) => setAge(e.target.value)} value={age} className="border-2 h-12 rounded-md" type="number" placeholder="Age" />
                    <input onChange={(e) => setRace(e.target.value)} value={race} className="border-2 h-12 rounded-md" type="text" placeholder="Race..." />
                    <select onChange={(e) => setCategory(e.target.value)} className="border-2 h-12 rounded-md">
                        {categoryChoice.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <label className="block ml-auto mr-auto">
                        <span className="sr-only">Choose image</span>
                        <input onChange={(e) => imagePreview(e.target.files[0])} type="file" className="block w-full text-sm text-gray-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-slate-200 file:text-violet-700
                        hover:file:bg-violet-100
                        " multiple />
                    </label>
                    {previewImage && <img src={`${previewImage}`} />}
                    <div className="flex justify-center">
                        <button type="submit" className="btn bg-slate-200 py-3 self-center w-28 rounded-md font-bold">Submit</button>
                    </div>
                </form>
                <div className="flex justify-center">
                    {!!progres && <p>{progres}%</p>}
                </div>
            </div>
        </div>
     );
}
 
export default FormUpdateAdopt;