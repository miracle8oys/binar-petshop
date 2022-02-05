import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query} from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

const ChatDashboard = ({user}) => {

    // const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        const selectRoomRef = query(collection(db, "messages"), orderBy("updatedAt", "desc"));
        getDocs(selectRoomRef)
            .then(snapshot => {
                setRooms(snapshot.docs.map(room => (  
                    {
                        ...room.data(),
                        id: room.id
                    }
                )))
            })
    }, [user])

    // const createRoom = (user_id, profile_pic, username) => {
    //     const roomRef = collection(db, "messages");
    //     addDoc(roomRef, {
    //         member: [user.uid, user_id],
    //         profile_pic: [user.photoURL, profile_pic],
    //         username: [user.displayName, username]
    //     }).then(snapshot => {
    //         navigate(`/message/${snapshot.id}`);
    //     });
    // }


    return ( 
        <>
            <div className="min-h-[80vh] pt-5 flex justify-center bg-orange-50">
                <div className="min-h-[100vh] w-11/12 md:w-2/4 bg-slate-200 rounded-md px-5">
                    {rooms.map(room => (
                        <Link to={`/admin/chat/${room.id}`} key={room.id}>
                            <div className="flex gap-3 mb-2 my-3 hover:bg-slate-500 rounded-md py-2 px-2">
                                <img className="w-12 h-12 rounded-full" src={`${room.profile_pic}`} alt="snipped-pic-user" referrerPolicy="no-referrer" />
                                <div>
                                    <p className="font-semibold">{room.username}</p>
                                    <p className="w-fit font-semibold text-lg py-2 px-2 rounded-md bg-sky-500 max-w-[70vw]">{room.last_message}</p>
                                </div>
                            </div> 
                        </Link> 
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default ChatDashboard;