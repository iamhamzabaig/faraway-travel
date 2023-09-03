import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearItem() {
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <Packaging
        items={items}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggleItem}
        onClearItem={handleClearItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🎑Far Away🛫</h1>;
}

function Form({ onAddItems }) {
  function handleSubmit(e) {
    e.preventDefault();
    const newItems = { description, quantity, packed: false, id: Date.now() };
    if (!description) return;
    console.log(newItems);
    onAddItems(newItems);

    setDescription("");
    setQuantity(1);
  }

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        placeholder="item"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function Packaging({ items, onDeleteItem, onToggleItem, onClearItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItem}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items 🚀👩🏾‍🚀</em>
      </p>
    );
  }
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentageItems = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentageItems === 100
          ? "You got everything. You are ready to go 🛤"
          : `You have ${numItems} items in your inventory, you have already packed
        ${packedItems} (${percentageItems ? percentageItems : 0}%)
      `}
      </em>
    </footer>
  );
}
