import { useNavigate } from "react-router-dom";
import Button from "../../core/ui/Button";
import ButtonAlt from "../../core/ui/ButtonAlt";
import { formatCurrency } from "../../core/utils/helpers";
import SetPriority from "./SetPriority";

function OrderSummary({ order }) {
  const navigate = useNavigate();
  const { orderPrice, priority, priorityPrice } = order;
  const total = orderPrice + (priority ? priorityPrice : 0);

  return (
    <aside className="sticky top-6">
      <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
        <h4 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2 border-b pb-4">
          <span>🧾</span> Payment Summary
        </h4>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-500 font-medium">Subtotal</span>
            <span className="text-stone-800 font-bold">
              {formatCurrency(orderPrice)}
            </span>
          </div>

          {priority && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-amber-600 font-medium flex items-center gap-1">
                <span>🚀</span> Priority Delivery
              </span>
              <span className="text-stone-800 font-bold">
                {formatCurrency(priorityPrice)}
              </span>
            </div>
          )}

          <div className="pt-4 border-t border-dashed border-stone-200">
            <div className="flex justify-between items-end mb-1">
              <span className="text-stone-500 text-xs font-bold uppercase tracking-wider">
                Total to pay
              </span>
              <span className="text-2xl font-black text-stone-900 leading-none">
                {formatCurrency(total)}
              </span>
            </div>
            <p className="text-[10px] text-stone-400 text-right italic font-medium">
              Pay with cash on delivery
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {priority || <SetPriority order={order} />}
          <Button onClick={() => {}}>Support</Button>
          <ButtonAlt onClick={() => navigate("/menu")}>New Order</ButtonAlt>
        </div>
      </div>
    </aside>
  );
}

export default OrderSummary;
