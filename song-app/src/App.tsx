import { useEffect, useRef, useState } from "react";
import Add from "./components/Add";
import Songs from "./components/Songs";
import Stat from "./components/Stat";
import { NavBar, Main, Nav } from "./components/style";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SongState, getSongsFetch } from "./slices/songSlice";

import _ from "lodash";
import Edit from "./components/Edit";
function App() {

  const [index, setSelected] = useState(0);
  const edit = useSelector((state: SongState) => state.songs.isEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, []);


  return (<BrowserRouter>
    <NavBar>
      <Nav onClick={() => setSelected((index) => index = 0)} bg={index === 0 ? "#6741d9" : "#2b3035"}
      ><Link to="/"><p>Songs</p></Link></Nav>
      <Nav onClick={() => setSelected((index) => index = 1)} bg={index === 1 ? "#6741d9" : "#2b3035"}><Link to="stat"> <p>Stat</p></Link></Nav>
    </NavBar>
    <Main>
      <Routes>
        <Route path="/" element={<Songs/>} />
        <Route path="stat" element={<Stat />} />

      </Routes>
      {edit ? <Edit  /> : <Add/>}
    </Main>

  </BrowserRouter>
  )
}

export default App;
