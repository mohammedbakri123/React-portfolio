import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../../core/ui/Button";
import ButtonAlt from "../../core/ui/ButtonAlt";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import CartHeader from "./CartHeader";
import CartSummary from "./CartSummary";
import ConfirmOverlay from "../../core/ui/ConfirmOverlay";
import { useDispatch, useSelector } from "react-redux";

//cart Slice State
import { clearCart } from "./cartSlice";

// Dummy data
// const dummyCartItems = [
//   {
//     id: 1,
//     name: "Pizza Napoletana",
//     quantity: 2,
//     unitPrice: 12,
//     totalPrice: 24,
//   },
//   {
//     id: 2,
//     name: "Pizza Margherita",
//     quantity: 1,
//     unitPrice: 10,
//     totalPrice: 10,
//   },
//   { id: 3, name: "Pizza Diavola", quantity: 3, unitPrice: 14, totalPrice: 42 },
// ];

function Cart() {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const { items: cart } = useSelector((state) => state.cart);
  console.log(cart);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleClearCart = () => {
    setShowConfirm(true);
  };

  const confirmClearCart = () => {
    dispatch(clearCart());
    setShowConfirm(false);
  };

  const cancelClearCart = () => {
    setShowConfirm(false);
  };

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your Cart</h1>
      <p className="text-gray-500 mb-8">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>

      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Header */}
            <CartHeader />

            {/* Items */}
            <ul className="divide-y divide-gray-100">
              {cart.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </ul>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <CartSummary
                cartTotal={cartTotal}
                deliveryFee={deliveryFee}
                grandTotal={grandTotal}
              />
              <div className="flex flex-wrap gap-3 ">
                <ButtonAlt>
                  <Link to="/menu">Back to Menu</Link>
                </ButtonAlt>
                <ButtonAlt onClick={handleClearCart}>Clear Cart</ButtonAlt>
                <Button className="px-8 py-4 text-lg">
                  <Link to="/order/new" className="">
                    Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {showConfirm && (
        <ConfirmOverlay
          onConfirm={confirmClearCart}
          onCancel={cancelClearCart}
          message="Are you sure you want to clear your cart?"
          confirmButtonMessage="Yes, clear"
          cancelButtonMessage="No, keep it"
        />
      )}
    </div>
  );
}

export default Cart;
