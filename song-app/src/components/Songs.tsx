
import { useDispatch, useSelector } from "react-redux";
import SongModel from "../model/song";
import { SongState, deleteSongStart, selectSong, setEditPage } from "../slices/songSlice";
import { Song, Btn, SongList, Box, Loading } from "./style";
import { useState } from "react";
import Edit from "./Edit";
import Add from "./Add";
import Loader from "./Loader";

interface SongsProps {
  index:number;
}
interface SongProps{
  song:SongModel;
}

function Songs(props:SongsProps){
  const songs = useSelector((state: SongState) => state.songs.list);
  const isLoading = useSelector((state: SongState) => state.songs.isLoading);
  const edit = useSelector((state: SongState) => state.songs.isEdit);
    return (
  <>
        <Box>
          {isLoading ? <Loader/>:
            <SongList key={2}>
            {songs.map((song)=>(
              <SongTile  song={song} key={song._id} />
            ))}
          </SongList>
           }
      
       </Box>
       {props.index===0 && (edit ? <Edit  /> : <Add/>)}
       </>
     
    )
}
function SongTile(props:SongProps){
  const dispatch = useDispatch();
  const song = useSelector((state: SongState) => state.songs);
  return (
    <Song>
    <div key={props.song._id}>
      <h4>{props.song.song}</h4>
      <p>
        <span>
          {props.song.genre}
        </span>
        <span>
          {props.song.artist}
        </span>
      </p>

    </div>
    <p>
      <Btn onClick={()=>{dispatch(selectSong(props.song)); dispatch(setEditPage())}} >
      ✏️
      </Btn>
    
      {!song.selectedSong || song.selectedSong._id !== props.song._id &&
      <Btn onClick={()=>{dispatch(deleteSongStart(props.song._id))}}>
      🗑️
      </Btn>
}
    </p>
  </Song>
  )
}
export default Songs