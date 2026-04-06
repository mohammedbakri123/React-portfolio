import { formatCurrency } from "../../core/utils/helpers";
import Button from "../../core/ui/Button";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  function HandleAddItem() {
    const PizzaToAdd = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice,
    };
    soldOut ? null : dispatch(addItem(PizzaToAdd));
  }
  return (
    <li className="group flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary-color/30 transition-all duration-300">
      <img
        src={imageUrl}
        alt={name}
        className={`w-24 h-24 object-cover rounded-md  ${
          soldOut ? "opacity-50 grayscale" : "group-hover:scale-105"
        } transition-transform duration-300`}
      />

      <div
        className={`flex flex-col flex-1 gap-2 ${soldOut ? "opacity-50" : ""}`}
      >
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{ingredients.join(", ")}</p>
        </div>

        <div className="flex items-center gap-3 mt-auto">
          {!soldOut ? (
            <p className="font-bold text-primary-color text-lg">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
              Sold Out
            </span>
          )}

          <Button disabled={soldOut} onClick={HandleAddItem}>
            Add ➕
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
