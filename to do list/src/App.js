import { useState } from "react";

const initialTaks = [
  {
    id: 1,
    note: "finish this project",
    isCompleted: false,
  },
  {
    id: 2,
    note: "plan this project",
    isCompleted: true,
  },
  {
    id: 3,
    note: "ask deepseek to make UI",
    isCompleted: true,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <AppBody />
      <Footer />
    </div>
  );
}

export default App;

function Header() {
  return (
    <header>
      <h1>TaskMaster</h1>
      <p>Organize your tasks and boost productivity</p>
    </header>
  );
}

function AppBody() {
  const [Tasks, setTasks] = useState(initialTaks);
  function onAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }
  function onTaskDelete(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }
  function onTaskUpdate(task) {
    const newText = prompt("Edit your task:", task.note);
    setTasks((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...t, note: newText } : t))
    );
  }
  function onToggelTaskCompleted(id) {
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  }
  return (
    <div className="app-body">
      <AddTask onAddTask={onAddTask} />
      <TasksList
        TasksList={Tasks}
        onTaskDelete={onTaskDelete}
        onTaskUpdate={onTaskUpdate}
        onToggelTaskCompleted={onToggelTaskCompleted}
      />
    </div>
  );
}

function AddTask({ onAddTask }) {
  const [note, setNote] = useState("");
  function HandleAdding() {
    if (!note) return;
    const task = {
      id: crypto.randomUUID(),
      note: note,
      isCompleted: false,
    };

    onAddTask(task);
    setNote("");
  }
  return (
    <div className="input-section">
      <input
        type="text"
        id="task-input"
        placeholder="Add a new task..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></input>
      <button id="add-btn" onClick={HandleAdding}>
        Add
      </button>
    </div>
  );
}

function TasksList({
  TasksList,
  onTaskDelete,
  onTaskUpdate,
  onToggelTaskCompleted,
}) {
  const [filter, setFilter] = useState("All");
  function onFiltering(value) {
    setFilter(value);
  }

  let filteredTasks;
  if (filter === "All") filteredTasks = TasksList?.slice();
  if (filter === "Active")
    filteredTasks = TasksList?.filter((task) => !task.isCompleted);
  if (filter === "Completed")
    filteredTasks = TasksList?.filter((task) => task.isCompleted);
  return (
    <>
      <Filter filter={filter} onFiltering={onFiltering} />
      <TasksStates TasksList={TasksList} />
      <Tasks
        TasksList={filteredTasks}
        onTaskDelete={onTaskDelete}
        onTaskUpdate={onTaskUpdate}
        onToggelTaskCompleted={onToggelTaskCompleted}
      />
    </>
  );
}
function TasksStates({ TasksList }) {
  const totalTasks = TasksList?.length;
  const Completedlength = TasksList?.filter((task) => task.isCompleted).length;
  return (
    <div className="stats">
      <span id="total-tasks">Total: {totalTasks} tasks</span>
      <span id="completed-tasks">Completed: {Completedlength}</span>
    </div>
  );
}

function Tasks({
  TasksList,
  onTaskDelete,
  onTaskUpdate,
  onToggelTaskCompleted,
}) {
  return (
    <ul className="task-list" id="task-list">
      {TasksList ? (
        TasksList.map((task) => (
          <Task
            task={task}
            key={task.id}
            onTaskDelete={onTaskDelete}
            onTaskUpdate={onTaskUpdate}
            onToggelTaskCompleted={onToggelTaskCompleted}
          />
        ))
      ) : (
        <div className="empty-state">
          <i>📝</i>
          <h3>No tasks yet</h3>
          <p>Add a task above to get started!</p>
        </div>
      )}
    </ul>
  );
}

function Task({ task, onTaskDelete, onTaskUpdate, onToggelTaskCompleted }) {
  return (
    <li className={`task-item ${task.isCompleted ? "completed" : ""} `}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        className={`task-checkbox ${task.isCompleted ? "checked" : ""}`}
        onChange={() => onToggelTaskCompleted(task.id)}
      ></input>
      <span className="task-text">{task.note}</span>
      <div className="task-actions">
        <button className="edit-btn" onClick={() => onTaskUpdate(task)}>
          ✏️
        </button>
        <button className="delete-btn" onClick={() => onTaskDelete(task.id)}>
          🗑️
        </button>
      </div>
    </li>
  );
}

function Filter({ filter, onFiltering }) {
  return (
    <div className="filter-section">
      <button
        className={`filter-btn ${filter === "All" && "active"}`}
        data-filter="all"
        onClick={() => onFiltering("All")}
      >
        All Tasks
      </button>
      <button
        className={`filter-btn ${filter === "Active" && "active"}`}
        data-filter="active"
        onClick={() => onFiltering("Active")}
      >
        Active
      </button>
      <button
        className={`filter-btn ${filter === "Completed" && "active"}`}
        data-filter="completed"
        onClick={() => onFiltering("Completed")}
      >
        Completed
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>TaskMaster &copy; 2023 - Your productivity companion</p>
    </footer>
  );
}
