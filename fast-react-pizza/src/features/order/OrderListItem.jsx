import { formatCurrency } from "../../core/utils/helpers";

function OrderListItem({ item }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex items-center justify-between gap-4 bg-stone-50 p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-stone-200 rounded-md flex items-center justify-center text-stone-500">
          🍕
        </div>
        <div>
          <div className="font-medium text-stone-700">{name}</div>
          <div className="text-sm text-stone-500">Qty: {quantity}</div>
        </div>
      </div>
      <div className="text-stone-700 font-semibold">
        {formatCurrency(totalPrice)}
      </div>
    </li>
  );
}

export default OrderListItem;
