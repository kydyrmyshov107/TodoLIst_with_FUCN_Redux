import { createSlice } from "@reduxjs/toolkit";

interface createSliceType {
  id: number;
  title: string;
  text: string;
  img: string;
  completed: boolean;
}

const initialState: { data: createSliceType[] } = {
  data: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newData = {
        id: Date.now(),
        title: action.payload.title,
        text: action.payload.text,
        img: action.payload.img,
        completed: false,
      };
      state.data.push(newData);
    },

    deleteAll: (state) => {
      state.data = [];
    },
    deleteItems: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },

    toggle_completed: (state, action) => {
      const todo = state.data.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const todo = state.data.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.text = action.payload.text;

        todo.img = action.payload.img;
      }
    },
  },
});
export const { deleteItems, deleteAll, addTodo, toggle_completed, editTodo } =
  todoSlice.actions;
export const todoReducer = todoSlice.reducer;
