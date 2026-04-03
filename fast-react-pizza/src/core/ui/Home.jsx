import CreateUser from "../../features/user/CreateUser";

function Home() {
  return (
    <div className="text-center ">
      <h1 className="text-xl font-bold text-center m-10  text-stone-700 ">
        The best pizza.
        <br />
        <span className="text-yellow-500 ">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
