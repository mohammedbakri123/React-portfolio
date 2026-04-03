import { useSelector } from "react-redux";

function UserName() {
  const { username } = useSelector((state) => state.user);

  return (
    <>
      {username && (
        <div className="uppercase tracking-widest flex-1 text-right text-stone-700 m-5">
          <h1>{username}</h1>
        </div>
      )}
    </>
  );
}

export default UserName;
