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
import Dashboard from "./pages/admin/Dashboard";
import AdminProduct from "./pages/admin/AdminProduct";
import AddProduct from "./pages/admin/FormAddProduct";
import CurrentProduct from "./pages/CurrentProduct";
import Cart from "./pages/Cart";
import ResetPassword from "./pages/ResetPassword";
import CreateAddress from "./pages/CreateAddress";
import Checkout from "./pages/Checkout";
import UpdateProduct from "./pages/admin/FormUpdateProduct";
import Tags from "./pages/admin/Tags";
function App() {

  const [user, setUser] = useState({});
  const base_url = process.env.REACT_APP_BASE_URL;

  const dispatch = useDispatch();

    onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("isAdmin", false);
      if (currentUser) {
          fetch(`${base_url}/auth/checkAdmin`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': currentUser?.accessToken
            }
          }).then(res => res.json())
          .then(result => {
            if (result.message === 'Success') {
              localStorage.setItem("isAdmin", true);
            }
            dispatch(login(currentUser));
          })
      }
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/reset-password" element={<ResetPassword /> } />
        <Route path="/address" element={<CreateAddress />} />
        <Route path="/checkout" element={<Checkout /> } />
        <Route element={<Authorize />}>
          <Route path="/admin/adopt/add" element={<FormAdopt />} />
          <Route path="/admin/adopt/update/:adoption_id" element={<FormUpdateAdopt />} />
          <Route path="/admin/adopt" element={<AdminAdoption user={user} />} />
          <Route path="/admin/dashboard" element={<Dashboard user={user}/>}/>
          <Route path="/admin/product/update/:id" element={<UpdateProduct user={user}/>}/>
          <Route path="/admin/products" element={<AdminProduct user={user}/>}/>
          <Route path="/admin/product/add" element={<AddProduct user={user}/>}/>
          <Route path="/admin/tags" element={<Tags user={user}/>}/>
        </Route>
        <Route path="/admin/chat" element={<ChatDashboard />} />
        <Route path="/admin/chat/:room_id" element={<ChatDetail />} />
        <Route path="/product/:id" element={<CurrentProduct user={user}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
