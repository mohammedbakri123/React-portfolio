import { formatDate } from "../../core/utils/helpers";
import OrderListItem from "./OrderListItem";

function OrderList({ order, deliveryIn, estimatedDelivery }) {
  return (
    <section className="flex-1">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-stone-700">Delivery</h3>
        <p className="text-sm text-stone-500">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-400 mt-1">
          Estimated: {formatDate(estimatedDelivery)}
        </p>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Items</h4>
        <ul className="space-y-3">
          {order.cart.map((item) => (
            <OrderListItem item={item} key={item.pizzaId} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default OrderList;
