import { Item } from "./Item";
import {useState} from "react"

export default function Packinglist({items ,onItemDeleted,onToggelPacked,onClearing}) {
  const [SortBy , setSortBy] = useState("input");
  let SortedItem;

  if(SortBy === "input") SortedItem = items;

  if(SortBy === "description") SortedItem = items
  .slice()
  .sort((a,b) => a.description.localeCompare(b.description));

  if(SortBy === "packed") SortedItem = items
  .slice()
  .sort((a,b) => Number(a.packed) - Number(b.packed));



  return(
    <div className="list">
    <ul>
        {SortedItem.map(item => <Item item={item} key={item.id } onItemDeleted={onItemDeleted} onToggelPacked={onToggelPacked}/>)}
    </ul>
    <div className="actions">
      <select value={SortBy} onChange={e=>setSortBy(e.target.value)}>
        <option value="input">Sort By input Order</option>
        <option value="packed">Sort By Packed Status</option>
        <option value="description">Sort By Description</option>
      </select>
      <button onClick={() => onClearing()}>reset</button>
    </div>
  </div>
  )
}