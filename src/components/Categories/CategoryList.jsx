import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllCategories, deleteCategory } from "../../utils/firebaseHelpers";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      toast.success("Category deleted");
      await fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="p-6 md:p-8 rounded-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 sm:gap-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-800">
            All Categories
          </h2>

          <Link
            to="/categories/add"
            className="bg-stone-700 text-white text-sm sm:text-base px-4 py-2 rounded-md hover:bg-stone-800 transition"
          >
            Add Category
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="text-stone-500 text-center">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-stone-50 border border-stone-300 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
              >
                <img
                  src={cat.img || "/fallback.jpg"}
                  alt={cat.title}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-stone-800 truncate mb-2">
                  {cat.title || "Untitled"}
                </h3>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-red-600 cursor-pointer text-sm font-medium hover:underline hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
