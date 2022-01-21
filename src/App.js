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
import FormAdopt from "./pages/FromAdopt";
import FormUpdateAdopt from "./pages/FormUpdateAdopt";
function App() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = () => {
    signOut(auth);
  }

  console.log(user?.accessToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/catalog" element={<ProductsCatalog />} />
        <Route path="/adopt" element={<AdoptCatalog />} />
        <Route path="/settings" element={<Settings handleLogout={handleLogout} />} />
        <Route path="/admin/adopt/add" element={<FormAdopt />} />
        <Route path="/admin/adopt/update/:adoption_id" element={<FormUpdateAdopt />} />
        <Route path="/product" element={<ProductsCatalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
