import { useEffect, useState } from "react";
import {addDoc, collection, getDocs, orderBy, query, where} from "firebase/firestore";
import { db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserChat = ({user}) => {

    const [rooms, setRooms] = useState([]);
    const userData = useSelector(state => state.loginReducer);
    const navigate = useNavigate();


    useEffect(() => {
        const selectRoomRef = query(collection(db, "messages"), where("uid", "==", `${userData?.user?.uid}`), orderBy("updatedAt", "desc"));
        getDocs(selectRoomRef)
            .then(snapshot => {
                setRooms(snapshot.docs.map(room => (  
                    {
                        ...room.data(),
                        id: room.id
                    }
                )))
            })
    }, [userData])

    const createRoom = () => {
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
            <div className="min-h-[80vh] mt-5">
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
            </div>
            <button onClick={createRoom}>Create Room</button>
        </>
     );
}
 
export default UserChat;