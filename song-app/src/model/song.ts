type SongModel  = {
    _id:string ;
    song:string;
    genre:string;
    artist:string;
    album:string;
}
export type PostSongModel = {
  song:string;
  genre:string;
  artist:string;
  album:string;
}
const songs: SongModel[] = [];

export interface SongsProps {
    songs:SongModel[]
  }
 export interface SongProps {
    song:SongModel;
  }
 export default SongModel