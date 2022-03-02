import { useEffect } from "react";
import {addDoc, collection, getDocs, orderBy, query, where} from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavbarLayout from "../components/Navbar";
import FooterLayout from "../components/Footer";
import  msgPict from "../assets/Messaging-cuate.png"

const UserChat = () => {

    const userData = useSelector(state => state.loginReducer);
    const navigate = useNavigate();


    useEffect(() => {
        const selectRoomRef = query(collection(db, "messages"), where("uid", "==", `${userData?.user?.uid}`), orderBy("updatedAt", "desc"));
        if (userData.user?.accessToken) {
            getDocs(selectRoomRef)
                .then(snapshot => {
                    // setRooms(snapshot.docs.map(room => (  
                    //     {
                    //         ...room.data(),
                    //         id: room.id
                    //     }
                    // )))
                    if (snapshot.docs.length !== 0) {
                        navigate(`/chat/${snapshot.docs[0]?.id}`);
                    }
                })
        }
    }, [userData, navigate])

    const createRoom = () => {
        if (!userData.user) {
            return false
        }
        const roomRef = collection(db, "messages");
        addDoc(roomRef, {
            uid: userData?.user?.uid,
            profile_pic: userData?.user?.photoURL,
            username: userData?.user?.displayName
        }).then(snapshot => {
            navigate(`/chat/${snapshot.id}`);
        });
    }


    return ( 
        <>
            {/* <div className="min-h-[80vh] mt-5">
                <div className="min-h-[30vh]">
                    {rooms.map(room => (
                        <Link to={`/chat/${room.id}`} key={room.id}>
                            <div className="flex gap-3 mb-2">
                                <img className="w-12 h-12 rounded-full" src={`${room.profile_pic}`} alt="snipped-pic-user" referrerPolicy="no-referrer" />
                                <div>
                                    <p className="font-semibold">{room.username}</p>
                                    <p className="w-fit font-semibold text-lg py-2 px-2 rounded-md bg-sky-300 max-w-[70vw]">{room.last_message}</p>
                                </div>
                            </div> 
                        </Link> 
                    ))}
                </div>
            </div> */}
            
                <div className="h-screen w-full flex flex-col">
                <NavbarLayout />
                    
                        <div className="md:flex justify-center items-center gap-12 flex-grow">
                            <div className="mx-auto md:mx-0">
                                <img src={msgPict} alt="ilustration-msg" className="w-full md:h-80 h-96 object-fit "/>
                            </div>
                            
                            <div className="px-6 md:px-0">
                                <p className="text-2xl font-medium mb-1">Hello, {userData?.user?.displayName}</p>
                                <p className="text-lg mb-5">Please click the button below to contact admin</p>
                                <div className="flex justify-center items-center my-10">
                                    <button className="py-2 px-4 bg-orange-300 hover:bg-orange-200 rounded-md font-medium" onClick={createRoom}>Chat Admin</button>
                                </div>
                            </div>
                        </div>
                        
                  
                    <FooterLayout />
                </div>
            
           
        </>
     );
}
 
export default UserChat;