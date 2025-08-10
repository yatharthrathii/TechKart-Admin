import { useState } from "react";
import { updateOrderStatus } from "../../utils/firebaseAdminHelpers";
import { toast } from "sonner";

const statuses = ["pending", "processing", "shipped", "delivered"];

const UpdateStatus = ({ orderId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await updateOrderStatus(orderId, newStatus);
      setStatus(newStatus);
      toast.success("Order status updated!");
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="border border-stone-300 rounded-md cursor-pointer px-2 py-1 text-sm bg-stone-50 text-stone-800"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default UpdateStatus;
