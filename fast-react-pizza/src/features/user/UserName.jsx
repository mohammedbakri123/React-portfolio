import { useSelector } from "react-redux";
import { selectUsername } from "./userSlice";

function UserName() {
  const username = useSelector(selectUsername);

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
