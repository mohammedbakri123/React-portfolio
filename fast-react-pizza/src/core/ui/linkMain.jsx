import { Link } from "react-router-dom";

function LinkMain({ children, to }) {
  return (
    <Link
      to={to}
      className=" transition duration-300 p-2 rounded-3xl text-stone-700 hover:text-black focus:text-black font-bold outline-0"
    >
      {children}
    </Link>
  );
}

export default LinkMain;
