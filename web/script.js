let options = {
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin':"*",
        'Access-Control-Allow-Credentials':true
    }
};

function parseDownloadUrl(aid, cid) {
    return axios(options, `https://127.0.0.1:8080/download?avid=${aid}&cid=${cid}`);
}

function parseBVID(id, callback) {
    axios(options, 'http://127.0.0.1:8080/view?bvid=' + id).then(
        dt => {
            let data = dt.data.data;
            let aid = data.aid;
            let cid = data.cid;
            parseDownloadUrl(aid, cid).then(
                res => {
                    callback(null, res.data.data.durl);
                }
            ).catch(callback);
        }
    ).catch(resson => {
        callback(resson);
    })
}

function onClick() {
    
}