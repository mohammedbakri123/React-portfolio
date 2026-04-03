import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 23,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [Friends, setFriends] = useState(initialFriends);

  const [ShowAddFriend, setShowAddFriend] = useState(false);

  const [SelecedFriend, setSelectedFriend] = useState(null);

  function HandleAddFriendClick() {
    setShowAddFriend((i) => !i);
  }
  function CloseAddFrinedForm() {
    setShowAddFriend(false);
  }
  function HandleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function HandleFriendSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function HandleSblit(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === SelecedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          Friends={Friends}
          onFriendSelection={HandleFriendSelection}
          SelecedFriend={SelecedFriend}
        />
        {ShowAddFriend && (
          <AddFriend
            onAddFriend={HandleAddFriend}
            Friends={Friends}
            closeForm={CloseAddFrinedForm}
          />
        )}
        <Button onClick={HandleAddFriendClick}>
          {ShowAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {SelecedFriend && (
        <SplitForm
          SelecedFriend={SelecedFriend}
          onSpliting={HandleSblit}
          key={SelecedFriend?.id}
        />
      )}
    </div>
  );
}

function FriendsList({ Friends, onFriendSelection, SelecedFriend }) {
  return (
    <div className="sidebar">
      <ul>
        {Friends.map((friend) => (
          <Friend
            friend={friend}
            SelecedFriend={SelecedFriend}
            onFriendSelection={onFriendSelection}
            key={friend.id}
          />
        ))}
      </ul>
    </div>
  );
}
function Friend({ friend, SelecedFriend, onFriendSelection }) {
  const isSelected = SelecedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt=""></img>
      <h3>{friend.name}</h3>
      <p
        className={
          friend.balance === 0 ? "" : friend.balance > 0 ? "green" : "red"
        }
      >
        {friend.balance === 0
          ? `You and ${friend.name} are Even`
          : friend.balance < 0
          ? `You Owe ${friend.name} $${Math.abs(friend.balance)}`
          : ` ${friend.name} Owes you $${Math.abs(friend.balance)} `}
      </p>
      <Button onClick={() => onFriendSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
function AddFriend({ onAddFriend, Friends, closeForm }) {
  const [FriendName, setFriendName] = useState("");
  const [FriendURL, setFriendURL] = useState("https://i.pravatar.cc/48?u=");

  function HandleSubmition(e) {
    e.preventDefault();
    if (!FriendName) return;
    const ID = crypto.randomUUID();
    const Friend = {
      id: ID,
      name: FriendName,
      image: FriendURL + ID,
      balance: 0,
    };

    onAddFriend(Friend);
    closeForm();
  }

  return (
    <form className="form-add-friend" onSubmit={HandleSubmition}>
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        value={FriendName}
        onChange={(e) => setFriendName(e.target.value)}
      ></input>
      <label>🖼️Image URL</label>
      <input
        value={FriendURL}
        onChange={(e) => setFriendURL(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}
function SplitForm({ SelecedFriend, onSpliting }) {
  const [BillValue, setBillValue] = useState("");
  const [YourExpense, setYourExpense] = useState("");
  const FriendExpense = BillValue ? BillValue - YourExpense : "";
  const [WhoIsPaying, setWhoIsPaying] = useState("user");
  function HandleSblit(e) {
    e.preventDefault();
    if (!BillValue || !YourExpense) return;
    onSpliting(WhoIsPaying === "user" ? FriendExpense : -YourExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={HandleSblit}>
      <h2>split Bill with {SelecedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input
        value={BillValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      ></input>
      <label>🤵Your Expense</label>
      <input
        value={YourExpense}
        onChange={(e) =>
          setYourExpense(
            Number(e.target.value) > BillValue
              ? Number(YourExpense)
              : Number(e.target.value)
          )
        }
      ></input>
      <label>🧑‍🤝‍🧑{SelecedFriend.name}'s Expense</label>

      <input disabled value={FriendExpense}></input>
      <label>🤑Who Is Paying</label>

      <select
        value={WhoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{SelecedFriend.name}</option>
      </select>
      <Button>Sblit Bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
