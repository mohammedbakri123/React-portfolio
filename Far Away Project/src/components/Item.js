export function Item({ item, onItemDeleted, onToggelPacked }) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onToggelPacked(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => onItemDeleted(item.id)}>❌</button>
    </li>
  );

}
