import LinkAlt from "../../core/ui/LinkAlt";
import { useSelector } from "react-redux";
import LinkMain from "../../core/ui/linkMain";

function CartOverview() {
  const { items: cart } = useSelector((state) => state.cart);
  console.log(cart);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartTotalPizzaCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <div className="bg-stone-800 flex justify-center shadow w-screen">
      <div className=" text-stone-200  uppercase w-8/10 flex justify-between">
        <p className="text-stone-300 font-bold flex justify-between items-center">
          {cartTotal ? (
            <>
              <span className="bg-yellow-500 p-2 text-stone-700 rounded-3xl mx-1 h-fit">
                {cartTotalPizzaCount} pizzas
              </span>
              <span className="bg-yellow-500 p-2 text-stone-700 rounded-3xl mx-1 h-fit">
                {cartTotal}$
              </span>
            </>
          ) : (
            <LinkMain to={"/menu"}>
              <span className="bg-yellow-500 p-2 text-stone-700 rounded-3xl mx-1 h-fit">
                Get Statrted
              </span>
            </LinkMain>
          )}
        </p>
        <LinkAlt to="/cart">
          Open cart <span className="animate-pulse">➡️</span>
        </LinkAlt>
      </div>
    </div>
  );
}
CartOverview;
export default CartOverview;
