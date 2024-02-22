import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTodo,
  deleteAll,
  deleteItems,
  editTodo,
  toggle_completed,
} from "../redux/tools/todoSlice";
import { useAppSelector } from "../redux/store";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import scss from "./TodoList.module.scss";
const TodoList: FC = () => {
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  //edit
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [newimg, setNewImg] = useState<string>("");

  const todos = useAppSelector((state) => state.todoReducer.data);
  console.log(todos);

  const dispatch = useDispatch();
  const notifyError = () => toast.error("Заполните все поля!");
  const notify = () => toast.success("Успешно добавлено");
  const notifyDelete = () => toast.dark("Успешно Удалено!");

  const handleAdd = () => {
    if (title === "" || text === "" || img === "") {
      notifyError();
      return null;
    } else {
      dispatch(addTodo({ title, text, img }));
      notify();
    }
    setTitle("");
    setText("");
    setImg("");
  };
  const ClearAll = () => {
    dispatch(deleteAll());
  };

  const deleteFilter = (id: number) => {
    dispatch(deleteItems(id));
    notifyDelete();
  };

  const comlete = (id: number) => {
    dispatch(toggle_completed(id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const edit = (item: any) => {
    setNewTitle(item.title);
    setNewText(item.text);
    setNewImg(item.img);
    setIsEdit(item.id);
  };

  const saveTodo = (id: number) => {
    dispatch(editTodo({ id, title: newTitle, text: newText, img: newimg }));
    setIsEdit(null);
  };

  return (
    <div className={scss.container}>
      <div className={scss.content}>
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Text"
          variant="standard"
          type="text"
          placeholder="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Image"
          variant="standard"
          type="ulr"
          placeholder="image"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <Button variant="outlined" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="outlined" onClick={ClearAll}>
          Delete All
        </Button>
        <ToastContainer />
      </div>
      <div className={scss.aside}>
        {todos.map((item) => (
          <div key={item.id}>
            {isEdit === item.id ? (
              <>
                <div className={scss.edits}>
                  <TextField
                    id="standard-basic"
                    label="Title"
                    variant="standard"
                    type="text"
                    placeholder="title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Text"
                    variant="standard"
                    type="text"
                    placeholder="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Image"
                    variant="standard"
                    type="url"
                    placeholder="image"
                    value={newimg}
                    onChange={(e) => setNewImg(e.target.value)}
                  />
                  <Button variant="outlined" onClick={() => saveTodo(item.id)}>
                    Save
                  </Button>
                  <Button variant="outlined" onClick={() => setIsEdit(null)}>
                    cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className={scss.items}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => comlete(item.id)}
                  />
                  <p>{item.title}</p>
                  <p>{item.text}</p>
                  <img src={item.img} alt="image" />
                  <Button variant="outlined" onClick={() => edit(item)}>
                    edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => deleteFilter(item.id)}
                  >
                    delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
