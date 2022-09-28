import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState } from "react";
import { Todo } from "../model";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "sheltonjoseph-npm-button";
import Stack from "@mui/material/Stack";

// import { Button } from 'shelly-button';

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const deleteTodo = async (id: Number) => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/items/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateDescription = async (id: Number, isDone: Boolean) => {
    try {
      const body = { isDone: !isDone };
      console.log(body);
      const response = fetch(`http://localhost:3000/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      response
        .then((response) => response.json())
        .then((data) => {
          let result = todos.map((res: any) => {
            if (res.id === id) {
              return { ...res, isDone: data.isDone };
            } else {
              return res;
            }
          });
          setTodos(result);
          // console.log(data)
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
                handleClick={() => updateDescription(todo.id, todo.isDone)}
                label={todo.isDone ? "Completed" : "Done"}
                kind={todo.isDone ? "completedButton" : "button"}
              />
              <IconButton
                aria-label="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;
