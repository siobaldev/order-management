export default function OrderList({ orders, loading, error, onRefresh }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">All Orders</h2>
        <button
          onClick={onRefresh}
          className="text-sm text-blue-500 cursor-pointer hover:underline"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading orders...</p>
      ) : error ? (
        <p className="text-red-400 text-sm">⚠️ {error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No orders yet. Create one above!
        </p>
      ) : (
        <>
          {/* Table - visible on md and above */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b text-gray-500 uppercase text-xs">
                  <th className="pb-2 pr-4">#</th>
                  <th className="pb-2 pr-4">Customer</th>
                  <th className="pb-2 pr-4">Product</th>
                  <th className="pb-2 pr-4">Qty</th>
                  <th className="pb-2 pr-4">Total</th>
                  <th className="pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-3 pr-4 text-gray-400">{order.id}</td>
                    <td className="py-3 pr-4 font-medium text-gray-700">
                      {order.customerName}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{order.product}</td>
                    <td className="py-3 pr-4 text-gray-600">
                      {order.quantity}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">
                      ₱{order.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-3 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Cards - visible on mobile only */}
          <div className="flex flex-col gap-3 md:hidden">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-xl p-4 space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    {order.customerName}
                  </span>
                  <span className="text-xs text-gray-400">#{order.id}</span>
                </div>
                <p className="text-sm text-gray-600">{order.product}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qty: {order.quantity}</span>
                  <span className="font-medium text-gray-700">
                    ₱{order.totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
