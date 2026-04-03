import { Link } from "react-router-dom";

function LinkAlt({ children, to }) {
  return (
    <Link
      to={to}
      className="text-yellow-500 block  my-2 font-extrabold p-3 border-yellow-500 rounded-3xl outline-0 focus:bg-yellow-500 focus:text-stone-800 hover:bg-yellow-500 hover:text-stone-800 transition"
    >
      {children}
    </Link>
  );
}

export default LinkAlt;
