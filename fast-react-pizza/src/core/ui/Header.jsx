import { Link } from "react-router-dom";
import SearchOrder from "../../features/order/SearchOrder";
import UserName from "../../features/user/UserName";
import LinkMain from "./linkMain";

function Header() {
  return (
    <div className="bg-yellow-500 flex justify-center shadow">
      <div className="w-8/10 flex flex-col sm:flex-row  items-center justify-between ">
        <ul className="flex justify-around flex-1 m-2 p-2 uppercase tracking-widest">
          <LinkMain to={"/"}>home</LinkMain>
          <LinkMain to={"/menu"}>menu</LinkMain>
          <LinkMain to={"/order/new"}>order</LinkMain>
        </ul>
        <SearchOrder />
        <UserName />
      </div>
    </div>
  );
}

export default Header;
