function parseDownloadUrl(bvid) {
    return axios(`http://mc.lition.online:3999/download/${bvid}`);
}

var prompt = function (message, style, time)
{
    style = (style === undefined) ? 'alert-success' : style;
    time = (time === undefined) ? 1200 : time * 1000;
    $('<div>')
        .appendTo('body')
        .addClass('alert ' + style)
        .html(message)
        .show()
        .delay(time)
        .fadeOut();
};

// 成功提示
var success_prompt = function(message, time)
{
    prompt(message, 'alert-success', time);
};

// 失败提示
var fail_prompt = function(message, time)
{
    prompt(message, 'alert-danger', time);
};

// 提醒
var warning_prompt = function(message, time)
{
    prompt(message, 'alert-warning', time);
};

// 信息提示
var info_prompt = function(message, time)
{
    prompt(message, 'alert-info', time);
};

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
            info_prompt(dt.data.url[0].url,10);
        }
    ).catch(alert)
}