import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { Todo } from "../model";
// import Button from "@mui/material/Button";
// import DoneIcon from "@mui/icons-material/Done";
// import toDocard from "./toDoCard.tsx"
import { Button } from "sheltonjoseph-npm-button";
// import { Button } from 'shelly-button';

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const handleClick = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
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
              <s> {todo.todo}</s>
            ) : (
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {todo.todo}
              </Typography>
            )}

            <Button
              handleClick={() => handleClick(todo.id)}
              label={todo.isDone ? "Completed" : "Done"}
              kind={todo.isDone ? "completedButton" : "button"}
            />
          </CardContent>
        </Card>
        // <toDocard todo={todo}/>
      ))}
    </div>
  );
};

export default TodoList;
