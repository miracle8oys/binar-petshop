import { addDoc, collection, doc, query, updateDoc, Timestamp, where, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import {FiSend} from "react-icons/fi";
import NavbarLayout from "../../components/Navbar";
import FooterLayout from "../../components/Footer";

const ChatDetail = () => {

    const {room_id} = useParams();
    const [msg, setMsg] = useState('');
    
    const [msgData, setMsgData] = useState([]);
    const userData = useSelector(state => state.loginReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        const msgDetailRef = collection(db, "message_detail");
        const currentTime = Timestamp.now();
        addDoc(msgDetailRef, {
            room_id,
            role: "admin",
            username: "Petshop Admin",
            profile_pic: "https://firebasestorage.googleapis.com/v0/b/binar-petshop.appspot.com/o/profile%2Fadminuser.png?alt=media&token=845fa2be-a716-4703-ab37-ba04c6bb0478",
            msg_content: msg,
            createdAt: currentTime
        }).then(() => {
            const msgRef = doc(db, "messages", room_id);
            updateDoc(msgRef, {
                last_message: msg,
                updatedAt: currentTime
            })
        });
        setMsg('');
    } 

    useEffect(() => {
        const getMsgDetail = query(collection(db, "message_detail"), where("room_id", "==", `${room_id}`), orderBy("createdAt"));
        const subscribtion = onSnapshot(getMsgDetail, (snapshot) => {
            setMsgData(snapshot.docs.map(cht => (
                {
                    ...cht.data(),
                    id: cht.id
                }
            )));
        })

        return () => {
            subscribtion();
        }

    }, [room_id]);

    return ( 
        <>
        <NavbarLayout />
        <div className="min-h-[85vh] mb-20 md:w-2/4 mx-auto px-3 py-2">
            {msgData.map(chat => (
                <div key={chat.id}>
                {chat.role !== "admin" ? 
                    <div className="grid grid-rows-3 grid-flow-col">
                            <img className="row-span-3 col-span-1 rounded-full w-12 h-12" src={chat.profile_pic} alt="dm-profile" referrerPolicy="no-referrer" />
                                <div className="row-span-3 col-span-11">
                                    <p className="font-bold">{chat.username}</p>
                                    <p className="mytext w-fit max-w-[70vw] min-w-min text-xl font-semibold bg-sky-300 rounded-md px-2 py-2">{chat.msg_content}</p>
                                </div>
                    </div>
                    :
                    <div className="grid grid-rows-3 grid-flow-col justify-items-end">
                                <div className="row-span-3 col-span-11 grid justify-items-end">
                                    <p className="font-bold">{chat.username}</p>
                                    <p className="mytext w-fit max-w-[70vw] min-w-min text-xl font-semibold bg-sky-300 rounded-md px-2 py-2">{chat.msg_content}</p>
                                </div>
                            <img className="row-span-3 col-span-1 rounded-full w-12 h-12" src={chat.profile_pic} alt="dm-profile" referrerPolicy="no-referrer" />
                    </div>
                }
                </div>
            ))}
            <div className="flex justify-center">
                <form onSubmit={handleSubmit} className="flex gap-2 mt-3 fixed bottom-0 mb-3">
                        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} className="border-2 w-[80vw] md:w-96 h-16"></textarea>
                        <button className="py-3 bg-blue-500 w-14 h-16 rounded-md flex justify-center items-center"><FiSend className=" text-3xl" /></button>
                </form>
            </div>
        </div>
        <FooterLayout />
        </>
     );
}
 
export default ChatDetail;