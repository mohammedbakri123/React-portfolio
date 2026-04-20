import { formatCurrency } from "../../core/utils/helpers";

function OrderListItem({ item, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="bg-stone-50/50 p-4 rounded-xl border border-stone-100 flex items-start gap-4">
      {/* Visual Icon */}
      <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center text-xl border border-stone-100">
        🍕
      </div>

      <div className="flex-1 flex flex-col gap-1">
        {/* Top Row: Name and Price */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="bg-stone-200 text-stone-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
              {quantity}x
            </span>
            <h4 className="font-bold text-stone-800 text-sm md:text-base leading-tight">
              {name}
            </h4>
          </div>
          <span className="font-bold text-stone-700 text-sm md:text-base ml-2">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        {/* Bottom Row: Ingredients */}
        {ingredients ? (
          <p className="text-[11px] md:text-xs italic text-stone-400 capitalize leading-relaxed">
            {ingredients.join(", ")}
          </p>
        ) : (
          <div className="h-2 w-24 bg-stone-200 animate-pulse rounded-full mt-2"></div>
        )}
      </div>
    </li>
  );
}

export default OrderListItem;
