function OrderHeader({ priority, status, id }) {
  return (
    <header className="flex items-center justify-between p-6 border-b">
      <div>
        <h2 className="text-2xl font-extrabold text-stone-700">Order</h2>
        <p className="text-sm text-stone-500">Order ID: {id}</p>
      </div>

      <div className="flex items-center gap-3">
        {priority && (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
            Priority
          </span>
        )}

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === "delivered"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {status}
        </span>
      </div>
    </header>
  );
}

export default OrderHeader;
