import {useState} from "react"
import { Logo } from "./Logo";
import { States } from "./States";
import Packinglist from "./Packinglist";
import Form from "./Form"

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 2, packed: true },
];

function App() {
  const [items , setItems] = useState(initialItems);
  function AddItem(item){
    setItems(items => [...items , item]);
  }
  function DeleteItem(id){
    setItems(items => items.filter(item => item.id !== id))
  }
  function ToggelPacked(id) {
    setItems(items=> items.map(item => item.id === id ? {...item, packed : !item.packed} : item))
  }

  function handleClear(){
    const confirmed = window.confirm("Are You Sure You want to delete everything")
    if (confirmed) setItems([]);
  }
  return (
  <div className="app">
    <Logo />
    <Form onAdditem={AddItem} items={items} />
    <Packinglist items={items} onItemDeleted={DeleteItem} onToggelPacked={ToggelPacked} onClearing={handleClear}/> 
    <States items={items} />
  </div>

  )
}





export default App;
