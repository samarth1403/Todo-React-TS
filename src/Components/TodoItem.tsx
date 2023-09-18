import React,{useState} from "react";
import {Paper , Typography , Button , Stack , Checkbox, TextField} from "@mui/material";
import {Delete , Edit} from '@mui/icons-material';

type PropsType = {
  todo: TodoItemType;
  completeHandler : (id:TodoItemType["id"]) => void;
  deleteHandler : (id:TodoItemType["id"]) => void;
  editHandler : (id:TodoItemType["id"],newTitle:TodoItemType["title"]) => void;
};

const TodoItem = ({ todo , completeHandler , deleteHandler , editHandler}: PropsType) => {
  const [editActive , setEditActive] = useState<boolean>(false);
  const [newTitle , setNewTitle] = useState<TodoItemType["title"]>(todo.title);

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems="center">
        {editActive ? (
          <TextField
            sx={{ marginRight: "auto" }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newTitle !== "") {
                editHandler(todo.id, newTitle);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight="auto">{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => {
            completeHandler(todo.id);
          }}
        />
        <Button
          onClick={() => {
            editHandler(todo.id, newTitle);
            setEditActive((prev) => !prev);
          }}
        >
          {editActive ? "Done" : <Edit />}
        </Button>
        <Button
          onClick={() => {
            deleteHandler(todo.id);
          }}
        >
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
