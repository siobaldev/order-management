import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "../lib/OrderFormSchema";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function errorMessages(err) {
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
}

export default function OrderForm({ onOrderCreated }) {
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data) => {
    setFormError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Error: ${res.status}`);
      }

      setSuccessMsg("Order created successfully!");

      // reset fields
      reset();

      onOrderCreated();
    } catch (err) {
      setFormError(errorMessages(err));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow p-6"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">New Order</h2>

      {formError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          ⚠️ {formError}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
          ✅ {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Customer Name"
          placeholder="e.g. John Dela Cruz"
          error={errors.customerName}
          {...register("customerName")}
        />
        <Field
          label="Product"
          placeholder="e.g. Laptop"
          error={errors.product}
          {...register("product")}
        />
        <Field
          label="Quantity"
          placeholder="e.g. 2"
          error={errors.quantity}
          {...register("quantity")}
        />
        <Field
          label="Total Price (₱)"
          placeholder="e.g. 49999"
          error={errors.totalPrice}
          {...register("totalPrice")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 bg-blue-600 cursor-pointer hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-medium px-6 py-2 rounded-lg transition"
      >
        {isSubmitting ? "Submitting..." : "Create Order"}
      </button>
    </form>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition
          ${
            error
              ? "border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-400"
          }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
