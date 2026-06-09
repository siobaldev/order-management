import { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

const API_URL = import.meta.env.VITE_API_URL;

const errorMessages = (err) => {
  if (
    err.message.includes("NetworkError") ||
    err.message.includes("Failed to fetch") ||
    err.message.includes("fetch")
  )
    return "Cannot reach the server. Make sure the backend is running.";
  if (err.message.includes("500"))
    return "Something went wrong on the server. Try again later.";
  if (err.message.includes("400"))
    return "Invalid input. Please check your entries.";
  return err.message;
};

export default function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // run once on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(errorMessages(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-500 mt-1">View and create customer orders</p>
        </div>
        <OrderForm onOrderCreated={fetchOrders} />
        <OrderList
          orders={orders}
          loading={loading}
          error={error}
          onRefresh={fetchOrders}
        />
      </div>
    </div>
  );
}
