import React from 'react';
import Swal from 'sweetalert2';

const Modal = ({ editingItem, setIsModalOpen, axiosSecure, refetch }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-full max-w-2xl relative">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit Food Item</h2>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target;
                        const updatedFood = {
                            foodName: form.foodName.value,
                            price: parseFloat(form.price.value),
                            totalQuantity: parseInt(form.totalQuantity.value),
                            foodCategory: form.foodCategory.value,
                            foodImage: [form.foodImage1.value, form.foodImage2.value].filter(Boolean),
                            description: form.description.value
                        };

                        try {
                            const res = await axiosSecure.put(
                                `/food/edit/${editingItem._id}`,
                                updatedFood
                            );
                            if (res.data.modifiedCount > 0) {
                                Swal.fire("Updated!", "Food updated successfully.", "success");
                                setIsModalOpen(false);
                                refetch();
                            } else {
                                Swal.fire("No Changes", "No update was made.", "info");
                            }
                        } catch (error) {
                            console.error(error);
                            Swal.fire("Error", "Failed to update food item.", "error");
                        }
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">Food Name</label>
                            <input
                                type="text"
                                name="foodName"
                                defaultValue={editingItem.foodName}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Food Category</label>
                            <select
                                name="foodCategory"
                                defaultValue={editingItem.foodCategory}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Italian">Italian</option>
                                <option value="Mexican">Mexican</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Indian">Indian</option>
                                <option value="Japanese">Japanese</option>
                                <option value="American">American</option>
                                <option value="Thai">Thai</option>
                                <option value="Mediterranean">Mediterranean</option>
                                <option value="Korean">Korean</option>
                                <option value="French">French</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Image URL 1</label>
                            <input
                                type="text"
                                name="foodImage1"
                                defaultValue={editingItem.foodImage?.[0] || ''}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Image URL 2</label>
                            <input
                                type="text"
                                name="foodImage2"
                                defaultValue={editingItem.foodImage?.[1] || ''}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label">Total Quantity</label>
                            <input
                                type="number"
                                name="totalQuantity"
                                defaultValue={editingItem.totalQuantity}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                defaultValue={editingItem.price}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="label">Description</label>
                        <textarea
                            name="description"
                            defaultValue={editingItem.description}
                            className="textarea textarea-bordered w-full h-24"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
