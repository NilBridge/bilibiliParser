const { default: axios } = require("axios");

function parseBVID(id, callback) {
    axios('http://api.bilibili.com/x/web-interface/view?bvid=' + id).then(
        dt => {
            if(dt.data.code == 0){
                callback(null,dt.data);
            }else{
                callback(dt.data.message);
            }
        }
    ).catch(resson => {
        callback(resson);
    })
}

function parseAVID(id,callback){
    axios("http://api.bilibili.com/archive_stat/stat?aid="+id+"&type=jsonp").theb(
        dt=>{
            if(dt.data.code == 0){
                callback(null,dt.data);
            }else{
                callback(dt.data.message);
            }
        }
    ).catch(
        reason=>{
            callback(reason)
        }
    )
}
function parseDownloadUrl(aid, cid) {
    return axios(`https://api.bilibili.com/x/player/playurl?avid=${aid}&cid=${cid}&qn=1&type=&otype=json&platform=html5&high_quality=1`);
}

module.exports = {parseAVID,parseBVID,parseDownloadUrl};