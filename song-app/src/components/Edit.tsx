import { useDispatch, useSelector } from "react-redux";
import SongModel from "../model/song";
import { SongState, addSongStart, closeEditPage, selectSong, updateSongStart } from "../slices/songSlice";
import Button, { NavBar,Main,Box,Input, SongList, Song,Btn,Nav, InputList, InputDiv, BackButton } from "./style";
import { useEffect, useState } from "react";

function Edit(){
  const dispatch = useDispatch();
  const song = useSelector((state:SongState)=>state.songs.selectedSong)
  const [editedsong,setSong] = useState<SongModel>(song)
  useEffect(() => {
    setSong(song);
  }, [song]);
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = event.target;
    setSong({...editedsong,[name]:value});
  };
  

  


    return(
      <Box>
       <BackButton onClick={()=>{
        dispatch(closeEditPage())
        dispatch(selectSong({_id:"",song:"",artist:"",album:"",genre:""}))}}>←</BackButton>
        <InputList>
        <h3>Edit Song</h3>
       <InputDiv> <p>Song:</p>
       <Input type="text" name="song" value={editedsong.song} onChange={handleInputChange}></Input>
       </InputDiv>
       <InputDiv> <p>Artist:</p>
       <Input type="text" name="artist" value={editedsong.artist} onChange={handleInputChange}></Input>
       </InputDiv>  
       <InputDiv> <p>genre:</p>
       <Input type="text" name="genre" value={editedsong.genre} onChange={handleInputChange}></Input>
       </InputDiv> 
       <InputDiv> <p>Album:</p>
       <Input type="text" name="album" value={editedsong.album} onChange={handleInputChange}></Input>
       </InputDiv> 
        <Button onClick={()=>{ dispatch(updateSongStart({editedsong}));
      dispatch(closeEditPage())}} >Edit</Button>
        </InputList>
        
        </Box>
    )
}
export default Edit