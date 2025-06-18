import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddFood = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleAddFood = async (e) => {
        e.preventDefault();
        const form = e.target;

        const foodName = form.foodName.value;
        const foodImage1 = form.foodImage1.value;
        const foodImage2 = form.foodImage2.value;
        const foodCategory = form.foodCategory.value;
        const quantity = parseInt(form.quantity.value);
        const price = parseFloat(form.price.value);
        const origin = form.origin.value;
        const description = form.description.value;

        const foodImage = [];
        if (foodImage1) foodImage.push(foodImage1);
        if (foodImage2) foodImage.push(foodImage2);


        if (!foodName || foodImage.length === 0 || !foodCategory || isNaN(quantity) || isNaN(price) || !origin || !description) {
            toast.error("Please fill in all required fields, including at least one image URL.");
            return;
        }

        if (!user || !user.displayName || !user.email) {
            toast.error("User information not available. Please log in again.");
            return;
        }

        const newFood = {
            foodName,
            foodImage,
            foodCategory,
            quantity,
            price,
            origin,
            description,
            purchaseCount: 0, // <--- ADD THIS LINE: Initialize purchaseCount to 0
            addedBy: {
                name: user.displayName,
                email: user.email,
            }
        };

        try {
            const res = await axiosSecure.post('/food/add', newFood);
            if (res.data.insertedId) {
                toast.success('Food item added successfully!');
                form.reset();
                navigate('/my-foods');
            } else {
                toast.error('Failed to add food item. No ID returned.');
            }
        } catch (err) {
            console.error("Error adding food item:", err);
            toast.error(err.response?.data?.message || err.message || 'An unexpected error occurred.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Add a New Food Item</h1>
                <form onSubmit={handleAddFood} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Food Name</span></label>
                            <input type="text" name="foodName" placeholder="e.g., Spaghetti Carbonara" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Food Image URL 1</span></label>
                            <input type="text" name="foodImage1" placeholder="https://example.com/image1.jpg" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Food Image URL 2 (Optional)</span></label>
                            <input type="text" name="foodImage2" placeholder="https://example.com/image2.jpg" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Food Category</span></label>
                            <input type="text" name="foodCategory" placeholder="e.g., Italian" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Quantity</span></label>
                            <input type="number" name="quantity" placeholder="e.g., 20" className="input input-bordered w-full" required min="1" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Price</span></label>
                            <input type="number" name="price" placeholder="e.g., 15.99" className="input input-bordered w-full" required min="0" step="0.01" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Food Origin</span></label>
                            <input type="text" name="origin" placeholder="e.g., Italy" className="input input-bordered w-full" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text text-gray-700 font-medium">Short Description</span></label>
                        <textarea name="description" className="textarea textarea-bordered h-24 w-full" placeholder="Describe the ingredients, making procedure, etc." required></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full py-3 text-lg">Add Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFood;