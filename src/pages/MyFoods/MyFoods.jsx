import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Modal from "./Modal";

const MyFoods = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [myFoods, setMyFoods] = useState([]);

  const fetchFoods = async () => {
    if (user?.email) {
      try {
        const res = await axiosSecure.get(`/my-added/${user.email}`);
        setMyFoods(res.data || []);
      } catch (error) {
        console.error("Error fetching added foods:", error);
      }
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the product permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/food/delete/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          fetchFoods();
        }
      } catch (err) {
        console.error("Error deleting:", err);
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        My Added Foods
      </h2>
      {myFoods.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any food items yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((item, index) => (
                <tr key={item._id} className="hover:bg-base-100">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.foodImage?.[0]}
                      alt={item.foodName}
                      className="h-16 w-16 rounded object-cover"
                    />
                  </td>
                  <td className="font-semibold">{item.foodName}</td>
                  <td>{item.foodCategory}</td>
                  <td>{item.totalQuantity}</td>
                  <td>${item.price}</td>
                  <td className="flex gap-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-sm btn-info text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && editingItem && (
            <Modal
              editingItem={editingItem}
              setIsModalOpen={setIsModalOpen}
              axiosSecure={axiosSecure}
              refetch={fetchFoods}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MyFoods;
