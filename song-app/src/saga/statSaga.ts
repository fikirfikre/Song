import { call, put, takeEvery } from "redux-saga/effects";
import SongData from "../model/statistics";
import { getSongDataSuccess } from "../slices/statSlice";

function* workGetSongData(){
    const response:Response = yield call(fetch,"http://localhost:5000/api/stat/")
    const songData: SongData = yield response.json();
    console.log(songData);
    yield put(getSongDataSuccess(songData))
}

function* statSaga(){
    yield takeEvery('stat/getSongDataStart',workGetSongData);
}
export default statSaga