const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

export const getAllOrders = async () => {
  const res = await fetch(`${DB_URL}/orders.json`);
  const data = await res.json();
  if (!data) return [];

  return Object.entries(data).flatMap(([userId, orders]) =>
    Object.entries(orders).map(([id, order]) => ({
      id,
      userId,
      ...order,
    }))
  );
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const res = await fetch(`${DB_URL}/orders.json`);
  const data = await res.json();
  if (!data) throw new Error("No orders found");

  for (const userId in data) {
    for (const oid in data[userId]) {
      if (oid === orderId) {
        await fetch(`${DB_URL}/orders/${userId}/${orderId}.json`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        return true;
      }
    }
  }

  throw new Error("Order ID not found");
};
