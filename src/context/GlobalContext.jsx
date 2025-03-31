import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    // States
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchProduct, setSearchProduct] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    //  Local Storage se Cart Data Load Karna
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        setCartItems(storedCart ? JSON.parse(storedCart) : {});
    }, []);

    //  API se Products Fetch Karna
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    //  API se Categories Fetch Karna
    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    //  Cart Toggle Function
    const handleCartToggle = (product) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[product.id]) {
                delete updatedCart[product.id];
            } else {
                updatedCart[product.id] = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                };
            }
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    //  Category Change Function
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    //  Search Change Function
    const handleSearchChange = (event) => {
        setSearchProduct(event.target.value);
    };

    return (
        <GlobalContext.Provider
            value={{
                cartItems,
                selectedCategory,
                setSelectedCategory,
                searchProduct,
                setSearchProduct,
                handleCartToggle,
                products,
                handleSearchChange,
                handleCategoryChange,
                categories,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
