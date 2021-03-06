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
import {login, logout} from "./actions";
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
// import Tags from "./pages/admin/Tags";
import NotFound from "./pages/NotFound";
import AdminCategory from "./pages/admin/AdminCategory";
import FormCategory from "./pages/admin/FormCategory";
import AdminTags from "./pages/admin/AdminTags";
import FormTags from "./pages/admin/FormTags";
import AdminSupplies from "./pages/admin/AdminSupplies";
import FormSupplies from "./pages/admin/FormSupplies";
import AdminCouriers from "./pages/admin/AdminCouriers";
import FormCouriers from "./pages/admin/FormCouriers";
import FormAbout from "./pages/admin/FormAbout";
import AdminOrders from "./pages/admin/AdminOrders";
import FormOrder from "./pages/admin/FormOrder";
import AdminOrderHistories from "./pages/admin/AdminOrderHistories";
import FormOrderHistories from "./pages/admin/FormOrderHistories";

import Help from "./pages/Help";
import UserOrder from "./pages/UserOrder";
import UserOrderDetail from "./pages/UserOrderDetail";
import About from "./pages/About";
import UserAuthorize from "./hoc/UserAuthorize";
import UserUnauthorize from "./hoc/UserUnauthorize";
function App() {

  const [user, setUser] = useState({});
  const base_url = process.env.REACT_APP_BASE_URL;

  const dispatch = useDispatch();

    onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("isAdmin", false);
      localStorage.setItem("isLogin", false);
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
          });
          localStorage.setItem("isLogin", true);
      }
    });

  const handleLogout = () => {
    signOut(auth);
    dispatch(logout());
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/about" element={<About />} />
        <Route element={<UserUnauthorize />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/catalog" element={<ProductsCatalog user={user} />}/>
        <Route path="/products/tags=:name" element={<CategoryProduct user={user} />}/>
        <Route path="/adopt" element={<AdoptCatalog user={user} />} />
        <Route element={<UserAuthorize />}>
          <Route path="/settings" element={<Settings handleLogout={handleLogout} />} />
          <Route path="/chat" element={<UserChat />} />
          <Route path="/chat/:room_id" element={<UserChatDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reset-password" element={<ResetPassword /> } />
          <Route path="/address" element={<CreateAddress/>} />
          <Route path="/checkout" element={<Checkout /> } />
          <Route path="/order" element={<UserOrder />} />
          <Route path="/order/:orderId" element={<UserOrderDetail />} />
        </Route>
        <Route path="/help" element={<Help/>}/>
        <Route element={<Authorize />}>
          <Route path="/admin/adopt/add" element={<FormAdopt/>} />
          <Route path="/admin/adopt/update/:adoption_id" element={<FormUpdateAdopt/>} />
          <Route path="/admin/adopt" element={<AdminAdoption user={user} />} />
          <Route path="/admin/dashboard" element={<Dashboard user={user}/>}/>
          <Route path="/admin/product/update/:id" element={<UpdateProduct/>}/>
          <Route path="/admin/products" element={<AdminProduct user={user}/>}/>
          <Route path="/admin/product/add" element={<AddProduct/>}/>
          {/* <Route path="/admin/tags" element={<Tags user={user}/>}/> */}
          <Route path="/admin/chat" element={<ChatDashboard />} />
          <Route path="/admin/chat/:room_id" element={<ChatDetail />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/category/add" element={<FormCategory action="ADD"/>} />
          <Route path="/admin/category/update/:id" element={<FormCategory action="UPDATE"/>} />
          <Route path="/admin/tags" element={<AdminTags />} />
          <Route path="/admin/tag/add" element={<FormTags action="ADD"/>} />
          <Route path="/admin/tag/update/:id" element={<FormTags action="UPDATE"/>} />
          <Route path="/admin/supplies" element={<AdminSupplies />} />
          <Route path="/admin/supplies/add/:productId" element={<FormSupplies action="ADD"/>} />
          <Route path="/admin/supplies/update/:id" element={<FormSupplies action="UPDATE"/>} />
          <Route path="/admin/couriers" element={<AdminCouriers />} />
          <Route path="/admin/courier/add" element={<FormCouriers action="ADD"/>} />
          <Route path="/admin/courier/update/:id" element={<FormCouriers action="UPDATE"/>} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/order/update/:id" element={<FormOrder />} />
          <Route path="/admin/histories" element={<AdminOrderHistories />} />
          <Route path="/admin/histories/:id" element={<FormOrderHistories />} />
          <Route path="/admin/about" element={<FormAbout/>} />
        </Route>
        <Route path="/product/:id" element={<CurrentProduct user={user}/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
