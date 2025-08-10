import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getAllCategories, addProductToFirebase } from "../../utils/firebaseHelpers";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    img: null,
    rating: ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "img"
          ? files[0]
          : name === "price"
            ? value.replace(/,/g, "")
            : name === "rating"
              ? value
              : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.category || !formData.rating) {
      return toast.warning("Please fill all required fields.");
    }

    const ratingValue = parseFloat(formData.rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      return toast.error("Rating must be between 0 and 5 (decimals allowed)");
    }

    try {
      await addProductToFirebase({
        ...formData,
        rating: ratingValue
      });
      toast.success("Product added successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-stone-100 border border-stone-300 p-6 md:p-8 rounded-2xl shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-stone-800 mb-6 text-center">
          Add New Product
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full p-3 rounded-md border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (e.g. 1999)"
            className="w-full p-3 rounded-md border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full p-3 rounded-md border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none"
          ></textarea>

          {/* Decimal rating input */}
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating (0.0 - 5.0)"
            min="0"
            max="5"
            step="0.1"
            className="w-full p-3 rounded-md border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full max-w-full p-3 rounded-md border border-stone-300 bg-stone-50 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-stone-300 bg-white text-stone-700"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-stone-700 hover:bg-stone-800 text-white py-3 rounded-md font-medium transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
