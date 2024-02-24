interface SongData {
    totalSongs:number;
    totalAlbums: number;
    totalGenres: number;
    totalArtist: number;
    songsByGenre: SongByGenre[];
    songsByAlbum: SongByAlbum[];
    songsAndAlbumByArtist: SongAndAlbumByArtist[];
}
interface SongByGenre{
    _id:string;
    songs:number;
}
export type SongByAlbum={
    _id: string;
    songs:number;
}
interface SongAndAlbumByArtist {
    _id:string;
    songs:number;
    distinctAlbums:string[];
    albumCount: number;
}
export default SongData