function parseDownloadUrl(bvid) {
    return axios(`http://127.0.0.1:12345/download/${bvid}`);
}

function onClick() {
    let bv = document.getElementById("input-bv").value;
    if (bv == "") {
        let tg = TGTool();
        tg.error("请填写正确的BVID  ::>_<::");
        return;
    }
    parseDownloadUrl(bv).then(
        dt => {
            if (dt.data.code != 0) {
                let tg = TGTool();
                tg.error("输入的BV号有误  ::>_<::");
                return;
            }
            if (dt.data.url.length == 0) {
                let tg = TGTool();
                tg.error("无法找到视频解析  ::>_<::");
                return;
            }
            window.open(dt.data.url[0].url)
        }
    ).catch(alert)
}