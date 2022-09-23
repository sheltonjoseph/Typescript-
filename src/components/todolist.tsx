import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState } from "react";
import { Todo } from "../model";
import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
// import DoneIcon from "@mui/icons-material/Done";
// import toDocard from "./toDoCard.tsx"
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "sheltonjoseph-npm-button";
import Stack from "@mui/material/Stack";

// import { Button } from 'shelly-button';

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
var isDone = false;
  const deleteTodo = async (id: Number) => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/items/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateDescription = async (id: Number) => {
    try {
      const body = { isDone };
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="todos">
      {todos.map((todo) => (
        <Card sx={{ minWidth: 275, m: 5 }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {todo.isDone ? (
              <s> {todo.description}</s>
            ) : (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {todo.description}
              </Typography>
            )}
            <Stack direction="row" spacing={1}>
              <Button
                handleClick={() => updateDescription(todo._id)}
                label={todo.isDone ? "Completed" : "Done"}
                kind={todo.isDone ? "completedButton" : "button"}
              />
              <IconButton
                aria-label="delete"
                onClick={() => deleteTodo(todo._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
        // <toDocard todo={todo}/>
      ))}
    </div>
  );
};

export default TodoList;
