import React  from "react";
import GlobalProvider, { GlobalContext } from "./context/GlobalContext";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";
import Product from "./components/Product";
import Contacts from "./Contacts";
import Cart from "./components/Cart";
import ProductDetailsPage from "./components/ProductDetailsPage";

const App = () => {

  
  return (

    <GlobalProvider> 
     
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <About />
                <Product />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <Product
                
              />
            }
          />
          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contacts />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/ProductDetailsPage/:id" element={<ProductDetailsPage />} />

        </Routes>
      </main>

      <Footer />
    </div>

    </GlobalProvider>
  );
};

export default App;
