import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const MyOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/checkout/${user.email}`)
        .then(res => {
          setOrders(res.data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching orders:', err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">My Orders History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">#</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Quantity</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Image</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Amount</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                order.items.map((item, j) => (
                  <tr key={`${order._id}-${j}`} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm text-gray-900">{i + 1}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{item.foodName}</td>
                    <td className="py-4 px-4 text-gray-700">{item.quantity}</td>
                    <td className="py-4 px-4">
                      <img
                        className="h-16 w-16 object-cover rounded-md"
                        src={item.foodImage?.[0]}
                        alt={item.foodName}
                      />
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-semibold">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-green-600 font-semibold">
                      {order.status}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
