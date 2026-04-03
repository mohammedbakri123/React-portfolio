import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../../features/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="max-w-3xl m-auto p-5">
        {isLoading ? <Loader /> : <Outlet />}
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
