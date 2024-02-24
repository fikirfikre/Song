
import { useDispatch, useSelector } from "react-redux";
import SongModel from "../model/song";
import { SongState, deleteSongStart, selectSong, setEditPage } from "../slices/songSlice";
import { Song, Btn, SongList, Box } from "./style";

interface SongProps {
  song:SongModel;
 
}

function Songs(){
  const songs = useSelector((state: SongState) => state.songs.list);
    return (

        <Box>
        <SongList key={2}>
          {songs.map((song)=>(
            <SongTile  song={song} key={song._id} />
          ))}
        </SongList>
       </Box>
     
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