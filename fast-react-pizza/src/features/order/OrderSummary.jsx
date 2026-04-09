import { useNavigate } from "react-router-dom";
import Button from "../../core/ui/Button";
import ButtonAlt from "../../core/ui/ButtonAlt";

import { formatCurrency } from "../../core/utils/helpers";

function OrderSummary({ orderPrice, priority, priorityPrice }) {
  const navigate = useNavigate();
  return (
    <aside className="w-full md:w-80 mt-2 md:mt-0">
      <div className="bg-stone-50 p-4 rounded-lg shadow-inner">
        <h4 className="text-md font-semibold mb-3">Summary</h4>
        <div className="flex justify-between text-sm text-stone-600">
          <span>Items total</span>
          <span>{formatCurrency(orderPrice)}</span>
        </div>
        {priority && (
          <div className="flex justify-between text-sm text-stone-600 mt-2">
            <span>Priority fee</span>
            <span>{formatCurrency(priorityPrice)}</span>
          </div>
        )}

        <div className="border-t mt-3 pt-3 flex justify-between items-center">
          <div>
            <div className="text-sm text-stone-500">To pay on delivery</div>
            <div className="text-lg font-extrabold text-stone-700">
              {formatCurrency(orderPrice + (priority ? priorityPrice : 0))}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Button onClick={() => {}}>Contact restaurant</Button>
          <ButtonAlt onClick={() => navigate("/menu")}>Back to menu</ButtonAlt>
        </div>
      </div>
    </aside>
  );
}

export default OrderSummary;
