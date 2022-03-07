import { addDoc, collection, doc, query, updateDoc, Timestamp, where, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { useSelector } from "react-redux";
import {FiSend} from "react-icons/fi";
import NavbarLayout from "../components/Navbar";
import '../Style/userChatDetail.css';

const UserChatDetail = () => {

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
            role: "user",
            username: userData?.user?.displayName,
            profile_pic: userData?.user?.photoURL,
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
        <div className="h-100 w-100 flex justify-center items-center bg-orange-100">
          <div className="custom-scroll h-[80vh] max-h-[80vh] mt-3 mb-20 md:w-2/4 overflow-y-scroll px-5 py-2 bg-white">
            {msgData.map((chat) => (
              <div key={chat.id}>
                {chat.role === "admin" ? (
                  <div className="grid grid-rows-3 grid-flow-col">
                    <img
                      className="row-span-3 col-span-1 rounded-full w-12 h-12"
                      src={chat.profile_pic}
                      alt="dm-profile"
                      referrerPolicy="no-referrer"
                    />
                    <div className="row-span-3 col-span-11">
                      <p className="font-semibold text-sky-500">{chat.username}</p>
                      <p className="mytext w-fit max-w-[70vw] min-w-min text-md font-normat text-white bg-sky-400 rounded-md px-2 py-2">
                        {chat.msg_content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-rows-3 grid-flow-col justify-items-end">
                    <div className="row-span-3 col-span-11 grid justify-items-end">
                      <p className="font-semibold text-orange-400">{chat.username}</p>
                      <p className="mytext w-fit max-w-[70vw] min-w-min text-md font-normal text-white bg-orange-400 rounded-md px-2 py-2">
                        {chat.msg_content}
                      </p>
                    </div>
                    <img
                      className="row-span-3 col-span-1 rounded-full w-12 h-12"
                      src={chat.profile_pic}
                      alt="dm-profile"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 mt-3 fixed bottom-0 mb-3"
              >
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="border-2 w-[80vw] md:w-96 h-16"
                ></textarea>
                <button className="py-3 bg-orange-500 w-14 h-16 rounded-md flex justify-center items-center">
                  <FiSend className="text-3xl text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default UserChatDetail;