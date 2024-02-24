import { useDispatch } from "react-redux";
import SongModel, { PostSongModel } from "../model/song";
import { addSongStart } from "../slices/songSlice";
import Button, { NavBar,Main,Box,Input, SongList, Song,Btn,Nav, InputList, InputDiv } from "./style";
import { useState } from "react";

function Add(){
  const dispatch = useDispatch();
  const [song,setSong] = useState<PostSongModel>({song:" ",genre:"",artist:"",album:""})
  const randomNumber = Math.floor(Math.random() * 100) + 1; 


  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = event.target;
    setSong({...song,[name]:value});
  
  }
  const handleSubmit = ()=>{
    
     dispatch(addSongStart(song));
     setSong({song:" ",genre:"",artist:"",album:""})
   
  }

    return(
      <Box>
     
        <InputList>
        <h3>Register Song</h3>
       <InputDiv> <p>Song:</p>
       <Input type="text" name="song" value={song.song} onChange={handleInputChange}></Input>
       </InputDiv>
       <InputDiv> <p>Artist:</p>
       <Input type="text" name="artist" value={song.artist} onChange={handleInputChange}></Input>
       </InputDiv>  
       <InputDiv> <p>genre:</p>
       <Input type="text" name="genre" value={song.genre} onChange={handleInputChange}></Input>
       </InputDiv> 
       <InputDiv> <p>Album:</p>
       <Input type="text" name="album" value={song.album} onChange={handleInputChange}></Input>
       </InputDiv> 
        <Button onClick={()=>{handleSubmit()}} >Add</Button>
        </InputList>
        
        </Box>
    )
}
export default Add