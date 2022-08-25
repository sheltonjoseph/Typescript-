import React, { useState } from "react";
import "./App.css";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Todo } from "./model";
import TodoList from "./components/todolist";

// declaring a react functional componenet
const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  console.log(todos);

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <div
        style={{
          backgroundColor: "white",
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter The task"
          value={todo}
          // inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
          endIcon={<AddTaskIcon />}
          onClick={handleAdd}
        />
      </div>

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
