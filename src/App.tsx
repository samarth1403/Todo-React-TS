import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import TodoItem from "./Components/TodoItem";
import { saveTodos } from "./utils/saveTodos";
import { getTodos } from "./utils/getTodos";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  useEffect(()=>{
     saveTodos(todos);
  },[todos])

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos:TodoItemType[] = todos.map((item)=>{
      if(item.id === id){
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodos(newTodos);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos:TodoItemType[] = todos.filter((item)=>{
      return item.id !== id;
    })
    setTodos(newTodos);
  };

  const editHandler = (id:TodoItemType["id"] , newTitle:TodoItemType["title"]):void => {
     const newTodos: TodoItemType[] = todos.map((item)=>{
      if(item.id === id){
        item.title = newTitle;
        console.log(item);
      }
      return item;
     })
     setTodos(newTodos)
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title: title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };


  const todosArray = todos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        completeHandler={completeHandler}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    );
  });

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <Typography>TO DO</Typography>
        </Toolbar>
      </AppBar>
      <Stack height={"80%"} direction="column" spacing={"1rem"} p="1rem">
        {todosArray}
      </Stack>
      <TextField
        fullWidth
        label="New Task"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onKeyDown={(e) => {
          if(e.key === "Enter" && title !== ""){
            submitHandler();
          }
        }}
      />
      <Button
        onClick={submitHandler}
        disabled={title === ""}
        variant="contained"
        fullWidth
        sx={{
          margin: "1rem 0",
        }}
      >
        Add
      </Button>
    </Container>
  );
};

export default App;
