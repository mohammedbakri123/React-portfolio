export function States({ items }) {
  if (items.length === 0) return <div className="stats">
    <em>Start By adding items you need for your trip 🚀 </em>
  </div>;

  const numItems = items.length;
  const PackedItems = items.filter(item => item.packed).length;
  const persentage = Math.round((PackedItems / numItems) * 100);

  return <div className="stats">
    {(persentage === 100) ?
      <em>You are ready for the Trip ✈️</em>
      :
      <em>You have {numItems} items in your list, you have already packed {PackedItems}, ({persentage}%)</em>}
  </div>;
}
