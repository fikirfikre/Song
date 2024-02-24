import { useDispatch, useSelector } from "react-redux"
import { Box, EachTotal, Nav, Song, SongTile, StatBox, TotalBar, TotalDetail, TotalDiv } from "./style"
import { StatState, getSongDataStart } from "../slices/statSlice"
import { SongByAlbum } from "../model/statistics";
import { SongState } from "../slices/songSlice";
import { useEffect } from "react";
import Loader from "./Loader";

function Stat(){
   const dispatch = useDispatch()
   const stat = useSelector((state:StatState)=>state.stat.songData);
   const isLoading = useSelector((state:StatState)=>state.stat.isLoading);
   const songs = useSelector((state: SongState) => state.songs.list);
   useEffect(()=>{
      dispatch(getSongDataStart())
   },[songs])
  console.log(stat)
   return (
     
    <StatBox>
      {!isLoading ?
     <>
        <TotalBar>
         <TotalDiv>
            <p>Total Songs</p>
            <h3>{stat.totalSongs}</h3>
         </TotalDiv>
         <TotalDiv>
            <p>Total Genre</p>
            <h3>{stat.totalGenres}</h3>
         </TotalDiv>
         <TotalDiv>
            <p>Total Artist</p>
            <h3>{stat.totalArtist}</h3>
         </TotalDiv>
         <TotalDiv>
            <p>Total Album</p>
            <h3>{stat.totalAlbums}</h3>
         </TotalDiv>
        </TotalBar>
        <TotalDetail>
         <EachTotal>
            <SongTile><p>Album</p> <p>Songs</p></SongTile>
            {stat.songsByAlbum.map((album)=>(
               <SongTile><p>{album._id}</p> <p>{album.songs}</p></SongTile>
            ))}
            
         </EachTotal>

         <EachTotal>
         <SongTile><p>Genre</p> <p>Songs</p></SongTile>
          {stat.songsByGenre.map((genre)=>(
            <SongTile><p>{genre._id}</p> <p>{genre.songs}</p></SongTile>
          ))}
            
         </EachTotal>
         <EachTotal>
         <SongTile><p>Artist</p> <p>Songs</p> <p>Albums</p></SongTile>
         {stat.songsAndAlbumByArtist.map((artist)=>(
            <SongTile><p>{artist._id}</p> <p>{artist.songs} </p> <p>{artist.albumCount} </p></SongTile>
         ))}
            
         </EachTotal>
        </TotalDetail> 
        </>
: <Loader/>}
    </StatBox>
   
         
   )
}
export default Stat