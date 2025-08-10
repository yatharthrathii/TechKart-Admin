import { useEffect, useState } from "react";
import { getAllOrders } from "../../utils/firebaseAdminHelpers";
import UpdateStatus from "./UpdateStatus";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
    };
    fetchOrders();
  }, []);

  console.log(orders)

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-6 text-center">
        All Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-stone-500 text-center">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(({ id, amount, items, method, status, createdAt }) => (
            <div
              key={id}
              className="border border-stone-300 bg-stone-50 rounded-xl shadow-sm p-4 md:p-6"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center mb-4">
                <div>
                  <p className="text-sm text-stone-500">
                    <span className="font-semibold">Order ID:</span> {id}
                  </p>
                  <p className="text-sm text-stone-500">
                    <span className="font-semibold">Payment:</span> {method?.toUpperCase()}
                  </p>
                  <p className="text-sm text-stone-500">
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(createdAt).toLocaleString()}
                  </p>
                  <p className="text-md font-semibold text-stone-800 mt-1">
                    Total: ₹{amount}
                  </p>
                </div>

                <UpdateStatus orderId={id} currentStatus={status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map(({ id, image, title, price, quantity }) => (
                  <div
                    key={id}
                    className="flex items-start gap-3 bg-white border border-stone-200 rounded-lg p-3"
                  >
                    <img
                      src={image || "/fallback.jpg"}
                      alt={title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-stone-800 font-medium text-sm md:text-base line-clamp-2">
                        {title}
                      </h4>
                      <p className="text-stone-500 text-sm mt-1">
                        Qty: {quantity} × ₹{price}
                      </p>
                      <p className="text-stone-700 text-sm font-semibold mt-1">
                        ₹{price * quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
