import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddFood = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate();

    const handleAddFood = async (e) => {
        e.preventDefault();
        const form = e.target;

        const foodName = form.foodName.value;
        const foodImage1 = form.foodImage1.value;
        const foodImage2 = form.foodImage2.value;
        const foodCategory = form.foodCategory.value;
        const totalQuantity = parseInt(form.totalQuantity.value);
        const price = parseFloat(form.price.value);
        const description = form.description.value;

        const foodImage = [];
        if (foodImage1) foodImage.push(foodImage1);
        if (foodImage2) foodImage.push(foodImage2);

        if (!foodName || foodImage.length === 0 || !foodCategory || isNaN(totalQuantity) || isNaN(price) || !description) {
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
            totalQuantity,
            price,
            description,
            purchaseCount: 0,
            addedBy: {
                name: user.displayName,
                email: user.email,
            }
        };

        try {
            const res = await axiosSecure.post('/add/topfood', newFood);
            if (res.data.insertedId) {
                toast.success('Food item added successfully!');
                form.reset();
                // navigate('/my-foods');
            } else {
                toast.error('Failed to add food item. No ID returned.');
            }
        } catch (err) {
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
                            <label className="label">
                                <span className="label-text text-gray-700 font-medium">Food Category</span>
                            </label>
                            <select name="foodCategory" className="select select-bordered w-full" required>
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


                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Total Quantity</span></label>
                            <input type="number" name="totalQuantity" placeholder="e.g., 20" className="input input-bordered w-full" required min="1" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-gray-700 font-medium">Price</span></label>
                            <input type="number" name="price" placeholder="e.g., 15.99" className="input input-bordered w-full" required min="0" step="0.01" />
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
             <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default AddFood;
