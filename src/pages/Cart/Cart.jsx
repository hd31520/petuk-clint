import useCart from '../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const Cart = () => {
    const [cart, refetch, isLoading] = useCart();
    const axiosSecure = useAxiosSecure();
const {user} = useAuth();
    const data = cart?.items || [];

    const totalAmount = data.reduce((sum, item) => {
        const quantity = Number(item.quantity);
        const price = Number(item.price);
        return sum + quantity * price;
    }, 0);

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete("/cart/remove", {
                        data: {
                            userEmail: user.email,
                            productId: item.productId,
                        },
                    });
                    console.log(res)
                    if (res.status === 200) {
                        refetch();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your item has been deleted.',
                            icon: 'success',
                        });
                    }
                } catch (error) {
                    console.error('Error deleting item:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete item.',
                        icon: 'error',
                    });
                }
            }
        });
    };
    console.log(data)

    if (isLoading) {
        return (
            <span className="loading loading-spinner loading-lg text-primary"></span>
        );
    }



    const handleCheckout = async () => {
    if (!user?.email) {
        Swal.fire({
            icon: 'error',
            title: 'Unauthorized',
            text: 'You must be logged in to checkout.',
        });
        return;
    }

    try {
        const res = await axiosSecure.post('/checkout', {
            userEmail: user.email,
        });

        if (res.status === 200) {
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Checkout complete! Your order has been placed.',
            });
        }
    } catch (error) {
        console.error('Checkout error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'Checkout failed.',
        });
    }
};


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800">My Cart</h2>
                <div className="flex items-center gap-6">
                    <p className="text-xl md:text-2xl font-semibold text-gray-700">
                        Total: ${totalAmount.toFixed(2)}
                    </p>
                    <button onClick={handleCheckout} disabled={data.length === 0} className="btn btn-primary text-xl md:text-lg px-2 md:px-6 py-3">
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase"></th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Quantity</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Image</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Amount</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500 text-lg">
                                    Your cart is empty.
                                </td>
                            </tr>
                        )}
                        {data.length > 0 &&
                            data.map((item, idx) => (
                                <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <th className="py-4 px-4 text-sm font-medium text-gray-900">{idx + 1}</th>
                                    <td className="py-4 px-4 font-bold text-gray-900">{item.foodName}</td>
                                    <td className="py-4 px-4 text-gray-700">{item.quantity}</td>
                                    <td className="py-4 px-4">
                                        <img
                                            className="h-20 w-20 object-cover rounded-md"
                                            src={item.foodImage?.[0]}
                                            alt={item.foodName}
                                        />
                                    </td>
                                    <td className="py-4 px-4 text-gray-700 font-semibold">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-circle text-red-500 hover:bg-red-100"
                                        >
                                            <FaTrashAlt className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;
