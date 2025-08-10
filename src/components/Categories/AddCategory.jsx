import { useState } from "react";
import { toast } from "sonner";
import { createCategory } from "../../utils/firebaseHelpers";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.warning("Category name required!");

    try {
      await createCategory({ title: name, imageFile: image });
      toast.success("Category added successfully!");
      setName("");
      setImage(null);
    } catch (error) {
      toast.error("Failed to add category.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-stone-100 p-6 rounded-xl shadow-sm w-full max-w-md mx-auto mt-20 mb-20">
        <h2 className="text-xl font-semibold text-stone-700 mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-stone-300 rounded-md bg-stone-50 text-stone-800"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-stone-300 cursor-pointer rounded-md bg-stone-50 text-stone-800"
          />

          <button
            type="submit"
            className="w-full bg-stone-800 hover:bg-stone-700 text-white py-2 rounded-md cursor-pointer transition"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
