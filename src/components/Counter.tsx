import { RootState } from "../redux/store";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handlAdd,
  handleMinus,
  handlAddByAmont,
} from "../redux/tools/counterSlice";

const Counter: FC = () => {
  const count = useSelector<RootState>((state) => state.counterReducer);
  const dispatch = useDispatch();
  console.log(count);

  const handleIncrement = () => {
    dispatch(handlAdd());
  };
  const handleDecrement = () => {
    dispatch(handleMinus());
  };

  const handleIncrementByAmont = () => {
    dispatch(handlAddByAmont(10));
  };

  return (
    <div>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleIncrementByAmont}>byAmont</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
};

export default Counter;
