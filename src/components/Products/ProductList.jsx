import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { db } from "../../utils/firebaseHelpers";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnap = await getDocs(collection(db, "products"));
      const list = querySnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(list);
    } catch (err) {
      toast.error("Failed to load products.");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted.");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product.");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-800">
          All Products
        </h1>
        <Link
          to="/products/add"
          className="bg-stone-700 text-white px-4 py-2 rounded-md hover:bg-stone-800 text-sm sm:text-base"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-stone-500 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="border border-stone-300 rounded-2xl overflow-hidden shadow-md bg-stone-50 transition hover:shadow-lg flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={prod.img || "/fallback.jpg"}
                  alt={prod.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-stone-800 line-clamp-2 mb-1">
                    {prod.title}
                  </h2>
                  <div className="flex">
                    <p className="text-stone-600 text-sm mb-1">
                      ₹{prod.price} |
                    </p>
                    <p className="text-sm text-yellow-600 mb-1 ml-1">
                      ⭐ {prod.rating ? prod.rating.toFixed(1) : "No rating"}
                    </p>

                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {prod.desc || "No description"}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/admin/products/${prod.id}/edit`}
                    className="px-3 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="px-3 py-1 text-sm rounded bg-red-100 text-red-600 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
