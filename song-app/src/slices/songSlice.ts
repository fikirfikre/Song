import { access, stat } from 'fs';
import { Song } from './../components/style';
import { undef } from './../../node_modules/@redux-saga/is/index.d';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import SongModel, { PostSongModel } from "../model/song";
export type SongState = {
  songs: {
    list: SongModel[],
    isLoading: Boolean,
    selectedSong: SongModel,
    isEdit: Boolean
  },

}

const lists: SongModel[] = [];
const initialState = {
  list: lists,
  isLoading: false,
  selectedSong: {},
  isEdit:false

}
export const songSlice = createSlice({
  name: "songs",
  initialState: initialState,
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action) => {

      state.isLoading = false;
      state.list = action.payload;
    },
    getSongsFailure: (state) => {
      state.isLoading = false;
    },
    addSongSuccess: (state, action: PayloadAction<SongModel>) => {
      state.isLoading = false;
      state.list.push(action.payload);

    },
    addSongFailure: (state) => {
      state.isLoading = false;
    },
    addSongStart: (state, action) => {
      state.isLoading = true;

    },
    updateSongSuccess: (state, action: PayloadAction<{ editedsong: SongModel }>) => {
      const index: string = action.payload.editedsong._id;

      const songIndex = state.list.findIndex((song) => {

        return song._id == index;
      });
      console.log(action.payload.editedsong)
      console.log(songIndex)
      if (songIndex !== -1) {
        console.log(...state.list)
        state.list[songIndex] = { ...state.list[songIndex], ...action.payload.editedsong };
      }
    },
    updateSongStart: (state, action) => {
      console.log(action)
      state.isLoading = true;
    },
    updateSongFailure: (state) => {
      state.isLoading = false;
    },
    deleteSongSuccess: (state, action) => {
      const index: string = action.payload;

      const songIndex = state.list.findIndex((song) => {

        return song._id == index;
      });
      console.log(songIndex);
      if (songIndex !== -1) {
        state.list.splice(songIndex, 1);

      }
    },
    deleteSongStart: (state, action) => {
      state.isLoading = true;
    },
    selectSong:(state,action:PayloadAction<SongModel>)=>{
      state.selectedSong= action.payload;
    },
    setEditPage:(state)=>{
      state.isEdit = true;
    },
    closeEditPage:(state)=>{
      state.isEdit = false;
    }





  }

});

export const { getSongsFetch,
  getSongsSuccess,
  getSongsFailure,
  addSongFailure, 
  addSongStart,
  addSongSuccess, 
  deleteSongSuccess, 
  deleteSongStart, 
  updateSongSuccess, 
  updateSongStart,
selectSong,
setEditPage,
closeEditPage } = songSlice.actions;
export default songSlice.reducer;