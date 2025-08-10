import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { db } from "../../utils/firebaseHelpers";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    rating: "",
    img: null,
  });

  useEffect(() => {
    if (!id) {
      toast.error("Invalid product ID");
      return navigate("/products");
    }

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          toast.error("Product not found");
          return navigate("/products");
        }

        const product = snap.data();
        setFormData({
          title: product.title || "",
          price: product.price || "",
          description: product.desc || product.description || "", 
          category: product.category || "",
          rating: product.rating || "",
          img: null,
        });
      } catch (err) {
        toast.error("Error fetching product");
        console.error(err);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnap = await getDocs(collection(db, "categories"));
      const catList = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(catList);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "img" ? files[0] : value,
    }));
  };

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: fd,
      }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.category) {
      return toast.warning("Please fill all required fields.");
    }

    try {
      let imageUrl = null;
      if (formData.img) {
        imageUrl = await uploadImageToCloudinary(formData.img);
      }

      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        title: formData.title,
        price: Number(formData.price),
        desc: formData.description, 
        category: formData.category,
        rating: Number(formData.rating) || 0, 
        ...(imageUrl && { img: imageUrl }),
      });

      toast.success("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-10 p-6 bg-stone-100 shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-stone-800">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border border-stone-300 p-2 rounded"
        />

        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border border-stone-300 p-2 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border border-stone-300 p-2 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-stone-300 p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        {/* Rating input */}
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (e.g. 4.4)"
          className="w-full border border-stone-300 p-2 rounded"
        />

        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-stone-800 text-white py-2 rounded hover:bg-stone-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
