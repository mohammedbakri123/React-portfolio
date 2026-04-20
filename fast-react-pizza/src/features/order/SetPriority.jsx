/* eslint-disable no-unused-vars */
import { useFetcher } from "react-router-dom";
import Button from "../../core/ui/Button";
import { updateOrder } from "../../core/services/apiRestaurant";

function SetPriority({ order }) {
  const fetcher = useFetcher();
  console.log(order);
  return (
    <fetcher.Form method="PATCH">
      <Button>Set Priority</Button>
    </fetcher.Form>
  );
}

export default SetPriority;

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }) {
  const data = { priority: true };

  await updateOrder(params.orderid, data);
  return null;
}
