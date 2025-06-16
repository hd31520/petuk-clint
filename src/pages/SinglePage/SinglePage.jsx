import React, { useState } from 'react';

// --- SVG Icons ---
// Using inline SVGs to avoid external dependencies
const StarIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);


// --- Main Component ---
const SinglePage = () => {
    // --- State Management ---
    const [mainImage, setMainImage] = useState('https://i.ibb.co/38SG1jB/prizza1.jpg');
    const [quantity, setQuantity] = useState(1);
    const [purchaseCount, setPurchaseCount] = useState(0);

    // --- Product Data ---
    // This data can be fetched from an API in a real SinglePagelication
    const product = {
        name: 'Italiano Pizza',
        price: 18.00,
        rating: 5,
        description: 'A fiery and flavorful pizza with a spicy tomato sauce, mozzarella cheese, and a variety of zesty toppings. Perfect for those who enjoy a little heat.',
        sku: '02',
        category: 'Pizza',
        tags: ['Pizza', 'Food', 'Fast food'],
        images: [
            'https://i.ibb.co/38SG1jB/prizza1.jpg',
            'https://i.ibb.co/WWnM5jFD/prizza2.jpg'
        ]
    };
    
    const relatedProducts = [
        { name: 'Smoked Salmon Bagel', image: 'https://placehold.co/200x200/F9F9F9/333?text=Salmon+Bagel' },
        { name: 'Delicious Black Burger', image: 'https://placehold.co/200x200/333/FFF?text=Black+Burger' },
        { name: 'Indian Momos', image: 'https://placehold.co/200x200/F9F9F9/333?text=Momos' },
        { name: 'Fry Chicken Ball', image: 'https://placehold.co/200x200/F9F9F9/333?text=Chicken+Ball' }
    ];

    // --- Event Handlers ---
    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };
    
    const handleAddToCart = () => {
        // In a real SinglePage, this would dispatch an action to a cart context/reducer
        console.log(`Added ${quantity} of ${product.name} to cart.`);
        setPurchaseCount(prev => prev + quantity);
    };

    return (
        <div className="bg-white font-sans text-gray-800">
            {/* --- Header/Breadcrumb Section --- */}
            <header className="bg-gray-50 py-8 border-b">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold">Shop Details</h1>
                    <p className="text-gray-500 mt-1">Home / Shop</p>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12">
                {/* --- Main Product Details Section --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* --- Image Gallery --- */}
                    <div>
                        <div className="border rounded-lg p-4 bg-gray-50 mb-4 flex items-center justify-center">
                            <img src={mainImage} alt={product.name} className="w-full max-w-md h-auto object-cover rounded-md" />
                        </div>
                        <div className="flex gap-4">
                            {product.images.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`border rounded-lg p-2 cursor-pointer transition-all duration-200 ${mainImage === img ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Product Information --- */}
                    <div>
                        <h2 className="text-4xl font-bold mb-2">{product.name}</h2>
                        <p className="text-3xl font-light text-orange-500 mb-4">${product.price.toFixed(2)}</p>
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(product.rating)].map((_, i) => <StarIcon key={i} />)}
                            </div>
                            <span className="text-gray-500 ml-2">(Customer review)</span>
                        </div>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border rounded-md">
                               <button onClick={() => handleQuantityChange(-1)} className="p-3 hover:bg-gray-100 rounded-l-md transition">
                                    <MinusIcon />
                                </button>
                                <span className="px-6 py-2 font-semibold text-lg">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="p-3 hover:bg-gray-100 rounded-r-md transition">
                                    <PlusIcon />
                                </button>
                            </div>
                            <button 
                                onClick={handleAddToCart}
                                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition-colors duration-300 shadow-md"
                            >
                                ADD TO CART
                            </button>
                        </div>
                         <div className="text-gray-600 mb-6">
                            <p>
                                <span className="font-bold">Purchase Count:</span> {purchaseCount}
                            </p>
                        </div>

                        <hr className="my-6"/>

                        <div>
                            <p className="mb-2"><span className="font-semibold text-gray-700">SKU:</span> {product.sku}</p>
                            <p className="mb-2"><span className="font-semibold text-gray-700">Category:</span> <a href="#" className="text-orange-500 hover:underline">{product.category}</a></p>
                            <p className="mb-2"><span className="font-semibold text-gray-700">Tags:</span> {product.tags.join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* --- Description & Reviews Tabs --- */}
                <div className="mt-16 border-t pt-8">
                     <div className="flex gap-8 mb-4 border-b">
                        <button className="py-2 px-4 text-orange-500 border-b-2 border-orange-500 font-semibold">Description</button>
                        <button className="py-2 px-4 text-gray-500 font-semibold">Review (1)</button>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                        Welcome to Italiano Pizza, where every slice tells a story of tradition and quality. Our pizzas are crafted with the finest ingredients, from our hand-stretched dough to our signature tomato sauce made from sun-ripened tomatoes. We believe in creating an authentic Italian experience, combining classic recipes with a modern twist. This commitment to excellence has been at the heart of our restaurant since day one. We're not just making pizza; we're creating moments of joy and connection for our customers.
                    </p>
                </div>
                
                {/* --- Related Products Section --- */}
                <div className="mt-16">
                    <h3 className="text-3xl font-bold text-center mb-8">RELATED PRODUCTS</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {relatedProducts.map((related, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-gray-50 border rounded-lg overflow-hidden mb-4">
                                    <img src={related.image} alt={related.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <h4 className="text-lg font-semibold">{related.name}</h4>
                                <div className="flex justify-center text-yellow-400 mt-1">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SinglePage;
