// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../core/services/apiRestaurant";
import { calcMinutesLeft } from "../../core/utils/helpers";
import OrderHeader from "./OrderHeader";
import OrderList from "./OrderList";
import OrderSummary from "./OrderSummary";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const order = await getOrder(params.orderid);
  return order;
}

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const { id, status, priority, estimatedDelivery } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      {/* 1. Main Header */}
      <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-stone-100">
        <OrderHeader
          priority={priority}
          status={status}
          id={id}
          deliveryIn={deliveryIn}
          estimatedDelivery={estimatedDelivery}
        />
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <OrderList order={order} />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary order={order} />
        </div>
      </div>
    </div>
  );
}

export default Order;
