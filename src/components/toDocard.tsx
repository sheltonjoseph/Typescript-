import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Todo} from "../model"
import TodoList from "./todolist";
 
type Props ={
    todo:Todo;
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>

}

const toDoCard: React.FC<Props>= ({todo,todos,setTodos}) => {
    const handleDone =( id:number) =>{
        setTodos(todos.map((todo)=>todo.id === id?{...todo,isDone: !todo.isDone}:todo))
    }
  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {todo.todo}
        </Typography>

      </CardContent>
    </Card>
    </>
  );
};

export default toDoCard;
