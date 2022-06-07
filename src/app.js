const express = require('express');
const { parseBVID, parseAVID, parseDownloadUrl } = require("./parser")
const axios = require('axios').default;
var app = express();
app.get("/download/:bvid", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(req.url);
    parseBVID(req.params.bvid, (err, data) => {
        if (err) {
            res.json({ code: 114, msg: err })
        } else {
            parseDownloadUrl(data.data.aid, data.data.cid).then(
                dt => {
                    if (dt.data.code == 0) {
                        res.json({ code: 0, url: dt.data.data.durl })
                    } else {
                        res.json({ code: dt.data.code, msg: dt.data.message })
                    }
                }
            ).catch(
                err => {
                    res.json({ code: 114, msg: err })
                }
            )
        }
    });
});

/*
{
	"code": 0,
	"url": [{
		"order": 1,
		"length": 94315,
		"size": 34765441,
		"ahead": "",
		"vhead": "",
		"url": "https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/93/81/292658193/292658193-1-208.mp4?e=ig8euxZM2rNcNbhjnwdVhwdlhzT3hwdVhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1654543660&gen=playurlv2&os=cosbv&oi=3028882984&trid=8952075b23114da994bc473053644cb1T&mid=0&platform=html5&upsig=bad018cbb2b321cb45f46ff2e01f5e67&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&bvc=vod&nettype=0&bw=369845&orderid=0,1&logo=80000000",
		"backup_url": null
	}]
}
*/

app.listen(3999);