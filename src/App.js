import Interface from "./components/Interface";
import { useDispatch } from "react-redux";
import { types } from "./redux/types";
import { useSelector } from "react-redux";

const App = () => {

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.general.loggedIn);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear localStorage
      </button>
      <h1>Sparks</h1>
      {loggedIn === true && (
        <button
          className="btn btn-dark"
          style={{ float: "right" }}
          onClick={() => {
            dispatch({ type: types.LOG_OUT });
          }}
        >
          Log Out
        </button>
      )}
      <Interface />
    </>
  );
};

export default App;
