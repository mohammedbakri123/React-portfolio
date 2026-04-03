function CartHeader() {
  return (
    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
      <div className="col-span-5">Product</div>
      <div className="col-span-2 text-center">Quantity</div>
      <div className="col-span-2 text-right">Price</div>
      <div className="col-span-2 text-right">Total</div>
      <div className="col-span-1"></div>
    </div>
  );
}

export default CartHeader;
