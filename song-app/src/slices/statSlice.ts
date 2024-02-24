import { createSlice } from "@reduxjs/toolkit";
import SongData from "../model/statistics";

export type StatState = {
    stat:{
        songData: SongData,
        isLoading:Boolean
    }
}
const songDatas:SongData={
    totalSongs:0,
    totalAlbums: 0,
    totalGenres: 0,
    totalArtist: 0,
    songsByGenre: [],
    songsByAlbum: [],
    songsAndAlbumByArtist: []
}
const initalState = {
    songData:songDatas,
    isLoading:false
}
export const statSlice = createSlice({
    name:"stat",
    initialState:initalState,
    reducers:{
        getSongDataStart:(state)=>{
            state.isLoading = true
        },
        getSongDataSuccess:(state,action)=>{
            state.songData = action.payload
            state.isLoading=false
        },
        getSongDataFailure:(state)=>{
            state.isLoading=false;
        }
    }
});
export const {getSongDataStart,getSongDataSuccess,getSongDataFailure} = statSlice.actions;
export default statSlice.reducer;