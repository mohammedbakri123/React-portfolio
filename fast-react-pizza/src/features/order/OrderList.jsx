import { useFetcher } from "react-router-dom";
import OrderListItem from "./OrderListItem";
import { useEffect } from "react";

function OrderList({ order }) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load(`/menu`);
    }
  }, [fetcher]);

  return (
    <section className="flex-1">
      <h4 className="text-md font-semibold text-stone-700 mb-4 px-1 flex items-center gap-2">
        <span>📦</span> Your Items
      </h4>
      <ul className="space-y-3">
        {order.cart.map((item) => (
          <OrderListItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((pizza) => pizza.id === item.pizzaId)
                ?.ingredients
            }
          />
        ))}
      </ul>
    </section>
  );
}

export default OrderList;
