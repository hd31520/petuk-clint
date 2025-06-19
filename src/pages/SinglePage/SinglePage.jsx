import React, { useState, useEffect } from 'react';
import { FaStar, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SinglePage = () => {
    const axiosPublic = useAxiosPublic()
    const params = useParams();
    const { user } = useAuth();
   const [cart, refetch, isLoading] = useCart();
   console.log(isLoading)

    // const axiossecure = useAxiosSecure();
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    console.log(cart)

    useEffect(() => {
        setLoading(true);
        axiosPublic.get(`/foods/${params.id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch product", err);
                setLoading(false);
            });
    }, [params.id,axiosPublic]);

    useEffect(() => {
        if (product) {
            setMainImage(product.foodImage?.[0] || '');
            setTotalPrice(product.price * quantity);
        }
    }, [product, quantity]);

    const handleQuantityChange = (amount) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add items to the cart.");
            return navigate('/login');
        }
        const sendData = {
            userEmail: user.email,
            quantity,
            productId: product._id
        };
        axiosSecure.post('/cart/add', sendData)
            .then(res => {
                toast.success(res.data.message || 'Successfully added!');
                refetch()
                navigate('/cart')


            })
            .catch(err => {
                refetch()
                toast.error(err.response?.data?.message || "An error occurred.");
            });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-bars loading-lg"></span></div>;
    }

    if (!product) {
        return <div className="text-center py-10">Product not found.</div>;
    }

    return (
        <div data-theme="light" className="font-sans text-base-content">
            <header className="bg-base-200 py-8 border-b border-base-300">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><a>Home</a></li>
                            <li><a>Shop</a></li>
                        </ul>
                    </div>
                    <h1 className="text-4xl font-bold mt-1">Shop Details</h1>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <div className="card bg-base-200 shadow-sm mb-4">
                            <figure className="p-4">
                                <img src={mainImage} alt={product?.foodName} className="w-full max-w-md h-auto object-cover rounded-box" />
                            </figure>
                        </div>
                        <div className="flex gap-4">
                            {product?.foodImage?.map((img, index) => (
                                <div
                                    key={index}
                                    className={`p-2 cursor-pointer transition-all duration-200 rounded-box ${mainImage === img ? ' outline-primary outline-2' : ' outline-base-300 outline-1'}`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img src={img} alt={`${product?.name} thumbnail ${index + 1}`} className="w-24 h-24 object-cover rounded-box" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-body p-0">
                        <h2 className="card-title text-4xl font-bold mb-2">{product?.foodName}</h2>
                        <p className="text-3xl font-light text-primary mb-4">${product?.price?.toFixed(2)}</p>
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <span className="text-base-content/70 ml-2">(Customer review)</span>
                        </div>
                        <p className="text-base-content/80 mb-6">{product?.description}</p>

                        <div className="card-actions items-center gap-4 mb-6">
                            <div className="join border border-base-300">
                                <button onClick={() => handleQuantityChange(-1)} className="btn btn-ghost join-item"><FaMinus /></button>
                                <span className="px-6 py-3 font-semibold text-lg join-item">{quantity}</span>
                                <button onClick={() => handleQuantityChange(1)} className="btn btn-ghost join-item"><FaPlus /></button>
                            </div>
                            <button onClick={handleAddToCart} className="btn btn-primary">ADD TO CART</button>
                        </div>

                        <div className="mt-4">
                            <p className="text-2xl font-semibold">
                                Total Price: <span className="text-primary">${totalPrice.toFixed(2)}</span>
                            </p>
                        </div>

                        <div className="divider my-6"></div>

                        <div>
                            <p className="mb-2"><span className="font-semibold text-base-content/90">SKU:</span> {product?.sku}</p>
                            <p className="mb-2"><span className="font-semibold text-base-content/90">Category:</span> <a href="#" className="link link-primary">{product?.category}</a></p>
                            <p className="mb-2"><span className="font-semibold text-base-content/90">Tags:</span> {product?.tags?.join(', ')}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-base-300 pt-8">
                    <div role="tablist" className="tabs tabs-lifted">
                        <a role="tab" className="tab tab-active">Description</a>
                    </div>
                    <div className="p-4 bg-base-200 rounded-b-box rounded-tr-box">
                        <p className="text-base-content/80 leading-relaxed">{product?.description}</p>
                    </div>
                </div>
            </main>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default SinglePage;