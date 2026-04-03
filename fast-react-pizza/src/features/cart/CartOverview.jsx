import { Link } from "react-router-dom";
import LinkAlt from "../../core/ui/LinkAlt";

function CartOverview() {
  return (
    <div className="bg-stone-800 flex justify-center shadow w-screen">
      <div className=" text-stone-200 p-5 uppercase w-8/10 flex justify-between">
        <p className="text-stone-300 font-bold flex justify-between items-center">
          <span className="bg-yellow-500 p-2 text-stone-700 rounded-3xl mx-1 h-fit">
            23 pizzas
          </span>
          <span className="bg-yellow-500 p-2 text-stone-700 rounded-3xl mx-1 h-fit">
            $23.45
          </span>
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
