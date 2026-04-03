import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import InputTxt from "../../core/ui/Input";

function SearchOrder() {
  //
  const [quary, setQuary] = useState("");
  //
  const navigator = useNavigate();

  //
  function handleSubmit(e) {
    e.preventDefault();
    if (!quary) return;
    navigator(`/order/${quary}`);
    setQuary("");
  }
  return (
    <Form onSubmit={handleSubmit} className="flex flex-2 justify-center">
      <InputTxt
        value={quary}
        onChange={setQuary}
        placeholder={"Search orders"}
        customeStyles={"bg-yellow-200"}
      />
    </Form>
  );
}

export default SearchOrder;
