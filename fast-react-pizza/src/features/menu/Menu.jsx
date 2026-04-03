import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../core/services/apiRestaurant";
import MenuItem from "./MenuItem";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}

function Menu() {
  const menu = useLoaderData();

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Menu</h2>
      <ul className="grid md:grid-cols-2 gap-6">
        {menu.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </div>
  );
}

export default Menu;
