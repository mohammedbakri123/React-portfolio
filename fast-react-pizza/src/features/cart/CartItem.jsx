// import { formatCurrency } from "../../core/utils/helpers";

import { useDispatch } from "react-redux";
import {
  // calculateTotal,
  // calculateTotalquantity,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "./cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  console.log(item);

  const { pizzaId, quantity, name, unitPrice, totalPrice } = item;

  return (
    <li className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
        {/* Product */}
        <div className="col-span-5 flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center ">
            <span className="text-2xl font-bold text-orange-600">
              {quantity}×
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500 md:hidden">
              ${unitPrice} per pizza
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="col-span-2 flex items-center justify-center gap-2 mb-4 md:mb-0">
          <button
            onClick={() => {
              dispatch(decreaseItemQuantity(pizzaId));
            }}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-color hover:text-primary-color hover:bg-orange-50 transition-all font-bold text-lg"
          >
            −
          </button>
          <span className="w-12 text-center font-bold text-lg text-gray-900">
            {quantity}
          </span>
          <button
            onClick={() => {
              dispatch(increaseItemQuantity(pizzaId));
            }}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-color hover:text-primary-color hover:bg-orange-50 transition-all font-bold text-lg"
          >
            +
          </button>
        </div>

        {/* Price */}
        <div className="col-span-2 text-right mb-4 md:mb-0">
          <p className="font-semibold text-gray-900 md:hidden">${totalPrice}</p>
          <p className="text-gray-600">${unitPrice}</p>
        </div>

        {/* Total */}
        <div className="col-span-2 text-right mb-4 md:mb-0">
          <p className="font-bold text-xl text-primary-color">${totalPrice}</p>
        </div>

        {/* Delete */}
        <div className="col-span-1 flex justify-end">
          <button
            onClick={() => {
              dispatch(deleteItem(pizzaId));
            }}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
