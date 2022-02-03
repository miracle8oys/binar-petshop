import {BrowserRouter, Routes, Route} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import ProductsCatalog from "./pages/ProductsCatalog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import Settings from "./pages/Settings";
import AdoptCatalog from "./pages/AdoptCatalog";
import FormAdopt from "./pages/admin/FromAdopt";
import FormUpdateAdopt from "./pages/admin/FormUpdateAdopt";
import AdminAdoption from "./pages/admin/AdminAdoption";
import CategoryProduct from "./pages/CategoryProduct";

import {useDispatch} from "react-redux";
import {login} from "./actions";
import ChatDashboard from "./pages/admin/ChatDashboard";
import ChatDetail from "./pages/admin/ChatDetail";
import UserChat from "./pages/UserChat";
import UserChatDetail from "./pages/UserChatDetail";
import Authorize from "./hoc/Authorize";
function App() {

  const [user, setUser] = useState({});

  const dispatch = useDispatch();

    onAuthStateChanged(auth, (currentUser) => {
      dispatch(login(currentUser))
      // fetch(`http://localhost:8000/auth/checkAdmin`, {
      //   method: "GET",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': currentUser?.accessToken
      //   }
      // }).then(res => res.json())
      // .then(result => {
      //   console.log(result.message);
      //   if (result.message === 'Success') {
      //     const userData = {
      //       ...currentUser,
      //       isAdmin: true
      //     }
      //     dispatch(login(userData))
      //   } 
      //   else {
      //     const userData = {
      //       ...currentUser,
      //       isAdmin: false
      //     }
      //     dispatch(login(userData))
      //   }
      // })
      setUser(currentUser);
    });

  const handleLogout = () => {
    signOut(auth);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register user={user} />} />
        <Route path="/catalog" element={<ProductsCatalog user={user} />}/>
        <Route path="/products/tags=:name" element={<CategoryProduct user={user} />}/>
        <Route path="/adopt" element={<AdoptCatalog user={user} />} />
        <Route path="/settings" element={<Settings handleLogout={handleLogout} />} />
        <Route path="/chat" element={<UserChat />} />
        <Route path="/chat/:room_id" element={<UserChatDetail />} />
        <Route element={<Authorize />}>
        <Route path="/admin/adopt/add" element={<FormAdopt />} />
        <Route path="/admin/adopt/update/:adoption_id" element={<FormUpdateAdopt />} />
        <Route path="/admin/adopt" element={<AdminAdoption user={user} />} />
        </Route>
        <Route path="/admin/chat" element={<ChatDashboard />} />
        <Route path="/admin/chat/:room_id" element={<ChatDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
