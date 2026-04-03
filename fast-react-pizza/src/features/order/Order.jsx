// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../core/services/apiRestaurant";
import { calcMinutesLeft } from "../../core/utils/helpers";
import OrderHeader from "./OrderHeader";
import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";
import { clearCart } from "../cart/cartSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const order = await getOrder(params.orderid);
  return order;
}

function Order() {
  const dispatch = useDispatch();
  dispatch(clearCart());
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <OrderHeader priority={priority} status={status} id={id} />

        <main className="p-6">
          <div className="flex flex-col md:flex-row md:gap-6 gap-4">
            <OrderList
              order={order}
              deliveryIn={deliveryIn}
              estimatedDelivery={estimatedDelivery}
            />
            <OrderSummary
              orderPrice={orderPrice}
              priority={priority}
              priorityPrice={priorityPrice}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Order;
