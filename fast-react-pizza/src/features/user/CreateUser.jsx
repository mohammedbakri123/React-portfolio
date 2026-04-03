import { useState } from "react";
import InputTxt from "../../core/ui/Input";
import Button from "../../core/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const { username: storedUsername } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;

    dispatch(setUser({ name: username }));

    console.log("Creating user with name:", username);
    navigate("/menu");
  }

  if (storedUsername) {
    setTimeout(() => {
      navigate("/menu");
    }, 5000);
  }

  return (
    <>
      {storedUsername && (
        <p className="text-green-600 font-medium mt-2">
          Welcome back, {storedUsername}
        </p>
      )}

      {!storedUsername && (
        <form
          onSubmit={handleSubmit}
          className="bg-stone-200 p-5 w-full max-w-md mx-auto rounded-3xl flex flex-col items-center"
        >
          <p>👋 Welcome! Please start by telling us your name:</p>
          <InputTxt
            value={username}
            onChange={setUsername}
            placeholder="Your full name"
            customeStyles="bg-stone-50"
          />
          {username !== "" && <Button>Start ordering</Button>}
        </form>
      )}
    </>
  );
}

export default CreateUser;
