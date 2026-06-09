import { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import { errorMessages } from "./utils/errorMessages";

const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await fetch(API_URL);

      if (!response.ok)
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`,
        );

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.error("[Orders API]", err);
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
