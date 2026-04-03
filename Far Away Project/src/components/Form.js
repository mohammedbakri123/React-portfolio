import {useState} from "react"
export default function Form({onAdditem , items}) {
  const [description , setDescriptoin] = useState("");
  const [quantity , setQuantity] = useState(1);

  function Clear(){
    setDescriptoin("");
    setQuantity(1);
  }

  function GetID(){
    return items.length >0 ? items[items.length-1].id +1 : 1;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return ;

    const item = { 
      id: GetID(), 
      description: description, 
      quantity: quantity, 
      packed: false };

      onAdditem(item);
      Clear();
    
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your😍trip?</h3>
      <select value={quantity} onChange={e=>setQuantity(e.target.value)}>
        {Array.from({length: 20} , (_ , i) => i +1 ).map(
          num => 
            <option value={num} key={num}>{num}</option>
        )}
      </select>
      <input placeholder="Add..." value={description} onChange={(e) => setDescriptoin(e.target.value)}></input>
      <button>Add</button>
    </form>


  ) 
}