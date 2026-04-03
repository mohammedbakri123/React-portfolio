function CartSummary({ cartTotal, deliveryFee, grandTotal }) {
  return (
    <div className="space-y-3 flex-1">
      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span className="font-semibold">${cartTotal}</span>
      </div>
      <div className="flex justify-between text-gray-600">
        <span>Delivery fee</span>
        <span className="font-semibold">${deliveryFee}</span>
      </div>
      <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-3xl font-extrabold text-primary-color">
          ${grandTotal}
        </span>
      </div>
    </div>
  );
}

export default CartSummary;
