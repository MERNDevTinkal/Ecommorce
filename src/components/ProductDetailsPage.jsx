import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const ProductDetailsPage = () => {

    const {products , cartItems , handleCartToggle } = useContext(GlobalContext);

    const { id } = useParams(); 

    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div className="text-center text-lg">Product not found</div>;
    }

    return (
        <div className="p-1 mr-22 flex justify-center">

            <div className="w-[100%] flex gap-1 shadow-lg pt-6 rounded-lg">

                <div className="w-1/2 flex flex-col items-center justify-center  pr-2">

                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-600 h-[650px] object-contain bg-white  p-1 mr-30 rounded-lg"
                    />
                </div>

                <div className="w-1/2 flex flex-col justify-center  ">

                    <h2 className="text-4xl font-bold mb-4 mr-44">{product.title}</h2>
                    <p className="text-xl text-gray-500 mb-3">
                        <span className="font-semibold"> </span> {product.category}
                    </p>
                    <p className="text-3xl font-semibold text-blue-600 mb-4">${product.price}</p>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                    
                   <div>
                   <button
                        className={`px-8 py-3 rounded text-white text-lg font-semibold 
                            ${cartItems[product.id] ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                        onClick={() => handleCartToggle(product)}
                    >
                        {cartItems[product.id] ? "Remove From Cart" : "Add To Cart"}
                    </button>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
