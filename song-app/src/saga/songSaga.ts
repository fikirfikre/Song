import {call, put, takeEvery} from "redux-saga/effects";
import SongModel, { PostSongModel } from "../model/song";
import axios from 'axios';
import { addSongSuccess, deleteSongSuccess, getSongsFailure, getSongsSuccess, updateSongSuccess } from "../slices/songSlice";
import { access } from "fs";
import { PayloadAction } from "@reduxjs/toolkit";
import { update } from "lodash";

const getSongs = () => fetch("http://localhost:5000/api/songs");
function* workGetSongsFetch(){
    try {
      const response:Response = yield call(getSongs);
      const songs:SongModel[] = yield response.json();
      yield put(getSongsSuccess(songs))
    } catch (error) {
       
      yield put(getSongsFailure)
    } 
  }
  function* workPostSongs(action:PayloadAction<PostSongModel>){
         try{
          const response:Response = yield call(fetch, "http://localhost:5000/api/songs",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(action.payload)});
          const song: SongModel = yield response.json() 
          yield put(addSongSuccess(song))
         } catch(error){
           
         }
  }
  function* workDeleteSong(action:PayloadAction<{id:string}>){
    try {
      const id = action.payload;
      console.log(action.payload)
      const response:Response = yield call(fetch, `http://localhost:5000/api/songs/${id}`, {
        method: 'DELETE',
      });
      
      yield put(deleteSongSuccess(id))
  
    } catch (error) {
      console.log(error)
    }
  }
  function* workPutSong(action:PayloadAction<{editedsong:SongModel}>){
    try{
      const id = action.payload.editedsong._id;

      const response:Response = yield call(fetch, `http://localhost:5000/api/songs/${id}`,{method:"PUT",headers:{'Content-Type':'application/json'},body:JSON.stringify(action.payload.editedsong)});
    
       yield put(updateSongSuccess(action.payload))

    }catch (error){
      console.log(error)
    }

  }
function* songSaga(){
    yield takeEvery('songs/getSongsFetch',workGetSongsFetch);
    yield takeEvery('songs/addSongStart',workPostSongs);
    yield takeEvery('songs/deleteSongStart',workDeleteSong);
    yield takeEvery('songs/updateSongStart',workPutSong);
}

export default songSaga