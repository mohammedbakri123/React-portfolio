import { useNavigate } from "react-router-dom";
import Button from "../../core/ui/Button";

function EmptyCart() {
  const navigator = useNavigate();
  return (
    <div className="text-center p-16 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="w-20 h-20  mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <p className="text-xl font-semibold text-gray-800 mb-2">
        Your cart is empty
      </p>
      <p className="text-gray-500 mb-6">
        Looks like you haven't added anything yet
      </p>
      <Button
        onClick={() => {
          navigator("/menu");
        }}
      >
        Start Shopping
      </Button>
    </div>
  );
}

export default EmptyCart;
