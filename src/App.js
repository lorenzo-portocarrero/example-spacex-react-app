import { Fragment } from "react";
import "./App.css";
import Header from "./components/Header";
import Launches from "./screens/Launches";

function App() {
  return (
    <Fragment>
      <Header></Header>
      <Launches></Launches>
    </Fragment>
  );
}

export default App;
