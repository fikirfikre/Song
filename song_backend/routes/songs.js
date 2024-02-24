import express from "express";
import Song from "../models/song.js";

const router = express.Router();

router.post('/songs',async(req,res)=>{
    console.log(req.body)
    const newSong = new Song(req.body);
    console.log(newSong)
    try{
        await newSong.save();
        res.status(201).json(newSong);
    }catch(e){
        console.log(e)
        res.status(400).json({error:e})
    }
});

router.get('/songs',async(req,res)=>{
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500)
    }
});

router.get('/songs/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const song = await Song.findById(id);
        if(song){
            res.status(200).json(song);
            
        }else{
            res.status(404).json({error:'Song Not Found'})
        }
    } catch (error) {
        res.status(500)
    }
})
router.put('/songs/:id',async (req,res)=>{
    const {id} = req.params;
    try {
        const updatedSong = await Song.findByIdAndUpdate(id,req.body,{new:true});
        if(updatedSong){
            res.status(300).json(updatedSong);
        }else{
            res.status(404).json({error:"Song not found"})
        }
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.delete('/songs/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const deleteSong = await Song.findByIdAndDelete(id);
        if(deleteSong){
            res.status(200).json(deleteSong);
        }else{
            res.status(404).json({error:"Song not found"})
        }
    } catch (error) {
        res.status(500).jsong({error:error.message})
    }
})

router.get('/stat', async(req,res)=>{
    try {
        const songs = await Song.find();
        const genreCount = await Song.aggregate([
            {$group: {_id:'$genre' }},
            {$count: 'genreCount' }
      
        ]);
        const albumCount = await Song.aggregate([
            {$group:{_id:'$album'}},
            {$count:'albumCount'}
        ])
        const artistCount = await Song.aggregate([
            { $group: { _id: '$artist' } }, 
            { $count: 'artistCount' } // Count unique artists
          ])
        const genreBasedSongCount = await Song.aggregate([
            {$group: {_id: '$genre',songs:{$sum:1}}}
        ]);
        const artistBasedSongCount = await Song.aggregate([
            {$group:{_id:'$artist',songs:{$sum:1}}}
        ]);
        const albumBasedSongCount = await Song.aggregate([
            {$group:{_id:'$album',songs:{$sum:1}}}
        ])
        const artistBasedSongAndAlbumCount = await Song.aggregate([
            {
              $group: {
                _id: '$artist',
                songs: { $sum: 1 },
                distinctAlbums: { $addToSet: '$album' },
            
              },
            },
            {
                $addFields: {
                  albumCount: { 
                    $cond: { if: { $eq: ['$distinctAlbums', []] }, then: 0, else: { $size: '$distinctAlbums' } },
                   }
                }
              }
          ]);
          
        
        
        res.json({
            totalSongs: songs.length,
            totalAlbums: albumCount[0]==null?0:albumCount[0]['albumCount'],
            totalArtist: artistCount[0]==null?0: artistCount[0]['artistCount'],
            totalGenres: genreCount[0]==null?0:genreCount[0]['genreCount'],
            songsByGenre: genreBasedSongCount,
            songsByAlbum: albumBasedSongCount,
            songsAndAlbumByArtist : artistBasedSongAndAlbumCount

        })
    } catch (error) {
            res.status(500).json({error:error.message})
    }
});

router.get('/stat/genres/:genre',async (req,res)=>{
    const genre = req.params.genre;

    try {
       const songCount = await Song.countDocuments({genre});
       res.json({
        genre,
        numberOfSongs: songCount
       })
    } catch (error) {
        res.status(500).jsong({error:error})
    }
})
router.get('/stat/artists/:artist',async(req,res)=>{
    const artist = req.params.artist;
    try {
        console.log(artist)
        const songCount = await Song.countDocuments({artist});
        console.log(songCount)
        const stats = await Song.aggregate([
            {$match : {artist}},
            {
                $lookup:{
                    from:'albums',
                    localField:"album",
                    foreignField:'_id',
                    as:'albumInfo'
                },

            },
            {$unwind: '$albumInfo'},
            {
                $group: {
                    _id: {artist : '$artist'},
                    numberOfAlbums: {$addToSet: '$albumInfo._id'}
                }
            }

        ]);
        const artistStats = stats[0]
        res.json({
            artist:artist,
            numberOfSongs: songCount,
            numberOfAlbums: artistStats.numberOfAlbums.length
        })
    } catch (error) {
        
    }
})


export default router;
