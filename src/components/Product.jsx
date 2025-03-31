import React, { useState, useEffect, useContext } from "react";
import SearchAndDropdown from "./SearchAndDropdown";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Product = () => {
    const { cartItems, handleCartToggle, selectedCategory, searchProduct, setSearchProduct, handleCategoryChange } = useContext(GlobalContext);
    const [products, setProducts] = useState([]);

    //  API se Products Fetch Karna
    useEffect(() => {
        let url = selectedCategory === "all"
            ? "https://fakestoreapi.com/products/"
            : `https://fakestoreapi.com/products/category/${selectedCategory}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, [selectedCategory]);

    // Filtered Products
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">
                    {selectedCategory === "all" ? "All Products" : selectedCategory.toUpperCase()}
                </h1>

                {/*  Fix: Pass `handleCategoryChange` instead of `onCategoryChange` */}
                <SearchAndDropdown 
                    onCategoryChange={handleCategoryChange}
                    setSearchProduct={setSearchProduct}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="border p-4 shadow-lg rounded-lg">
                            {/*  Product Image */}
                            <div className="w-full h-40 text-center flex flex-col items-center justify-start">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-40 h-40 object-contain"
                                />
                            </div>

                            {/*  Product Info */}
                            <div className="flex flex-col items-center text-center w-full h-60">
                                {/*  Title */}
                                <div className="w-full h-15">
                                    <Link to={`/ProductDetailsPage/${product.id}`}>
                                        <h2 className="text-lg font-semibold hover:text-blue-600 hover:cursor-pointer">
                                            {product.title.slice(0, 60)}
                                        </h2>
                                    </Link>
                                </div>

                                {/*  Price */}
                                <div>
                                    <p className="text-gray-700 text-lg font-semibold mb-1">${product.price}</p>
                                </div>

                                {/*  Description */}
                                <div className="w-full h-15">
                                    <p className="text-sm text-gray-600">
                                        {product.description.slice(0, 90)}...
                                    </p>
                                </div>

                                {/*  Add to Cart Button */}
                                <div className="mt-2">
                                    <button
                                        className={`mt-2 px-4 py-2 rounded 
                                            ${cartItems[product.id]
                                                ? "bg-red-500 hover:bg-red-600"
                                                : "bg-blue-500 hover:bg-blue-600"
                                            } text-white`}
                                        onClick={() => handleCartToggle(product)}
                                    >
                                        {cartItems[product.id] ? "Remove From Cart" : "Add To Cart"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found...</p>
                )}
            </div>
        </div>
    );
};

export default Product;
