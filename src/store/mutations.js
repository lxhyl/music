export default {
    getUserId(state, id) {
        state.userId = id;
    },
    getSongListId(state, id) {
        state.songListId = id;
    },
    getSongId(state, id) {
        state.songId = id;
    },
    //上一页 name
    goToPreviousPage(state,page){
       state.previousPage = page
    },
    getTopListIdx(state,idx){
        state.topListIdx = idx 
    },
    getTopListName(state,name){
       state.topListName = name
    },
    search(state,e){
       state.search = e
    },
    getVideoId(state,e){
         state.videoId = e
    },
    getMvId(state,e){
         state.mvId = e
    }
   
}