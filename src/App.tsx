// import clothestore from "./assets/images/clothestore-logo_v3 - copia.png";

import { useState } from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/dashboard-page";
import ClientsPage from "./pages/clients-page";
import ProductsPage from "./pages/products-page";

function App() {
  const [navbarState, setNavbarState] = useState(false);
  const changeStateNavbar = () => {
    setNavbarState(!navbarState);
  };

  return (
    <Router>
      <div className="w-full flex max-h-screen">
        <Navbar
          navbarState={navbarState}
          changeStateNavbar={changeStateNavbar}
        />
        <Routes>
          <Route
            path="/"
            element={<DashboardPage changeStateNavbar={changeStateNavbar} />}
          />
          <Route
            path="/clientes"
            element={<ClientsPage changeStateNavbar={changeStateNavbar} />}
          />
          <Route
            path="/productos"
            element={<ProductsPage changeStateNavbar={changeStateNavbar} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
