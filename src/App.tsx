import React, { useState, useEffect } from "react";
import "./App.css";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Todo } from "./model";
import TodoList from "./components/todolist";

// declaring a react functional componenet
const App: React.FC = () => {
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isGetTodos, setIsGetTodos] = useState<boolean>(true);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setIsGetTodos(true);
      setDescription("");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const getResponse = await fetch("http://localhost:3000/items");
      const jsonData = await getResponse.json();
      setTodos(jsonData);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isGetTodos) {
      getTodos();
      setIsGetTodos(false);
    }
  },[]);

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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
          }}
          disabled={!description}
          endIcon={<AddTaskIcon />}
          onClick={handleAdd}
        />
      </div>

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
