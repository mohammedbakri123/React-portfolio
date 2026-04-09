import { formatCurrency } from "../../core/utils/helpers";
import Button from "../../core/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseItemQuantity, decreaseItemQuantity, deleteItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.pizzaId === id);
  const isInCart = !!cartItem;

  function handleAddItem() {
    const pizzaToAdd = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice,
    };
    if (!soldOut) dispatch(addItem(pizzaToAdd));
  }

  function handleIncrease() {
    dispatch(increaseItemQuantity(id));
  }

  function handleDecrease() {
    dispatch(decreaseItemQuantity(id));
  }

  function handleDelete() {
    dispatch(deleteItem(id));
  }

  return (
    <li className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-yellow-400">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            soldOut ? "opacity-40 grayscale" : "group-hover:scale-110"
          }`}
        />
        {/* Sold Out Badge */}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <span className="px-4 py-2 bg-white/90 text-stone-700 font-bold text-sm rounded-full shadow-lg">
              Sold Out
            </span>
          </div>
        )}
        {/* Price Badge */}
        {!soldOut && (
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
            <span className="font-bold text-yellow-600 text-sm">
              {formatCurrency(unitPrice)}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-stone-800 leading-tight mb-2">
          {name}
        </h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">
          {ingredients.join(", ")}
        </p>

        {/* Actions */}
        {!isInCart ? (
          <Button disabled={soldOut} onClick={handleAddItem}>
            {soldOut ? "Unavailable" : "Add to Cart ➕"}
          </Button>
        ) : (
          <div className="space-y-3">
            {/* Quantity Badge */}
            <div className="flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-xl py-2 px-4">
              <span className="text-sm font-semibold text-yellow-700">
                In Cart: <span className="font-bold text-lg">{cartItem.quantity}</span> {cartItem.quantity === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                disabled={cartItem.quantity <= 1}
                className="flex-1 py-2.5 text-lg font-bold bg-stone-100 hover:bg-stone-200 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed text-stone-600"
              >
                −
              </button>
              <button
                onClick={handleIncrease}
                disabled={cartItem.quantity >= 10}
                className="flex-1 py-2.5 text-lg font-bold bg-stone-100 hover:bg-stone-200 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed text-stone-600"
              >
                +
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-1.5 flex-[2] py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition border border-red-200"
              >
                <span>🗑️</span>
                <span>Remove</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default MenuItem;
