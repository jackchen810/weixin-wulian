import wepy from 'wepy';
import util from './util';
import md5 from './md5';
import tip from './tip'

const API_SECRET_KEY = 'www.mall.cycle.com'
const TIMESTAMP = util.getCurrentTime()
const SIGN = md5.hex_md5((TIMESTAMP + API_SECRET_KEY).toLowerCase())

const wxRequest = async(params = {}, url) => {
    tip.loading();
    let data = params.query || {};
    data.sign = SIGN;
    data.time = TIMESTAMP;

    let res = await wepy.request({
        url: url,
        method: params.method || 'POST',
        data: data,
        header: { 'Content-Type': 'application/json', 'Cookie': wepy.getStorageSync("Cookie") },
    });
    tip.loaded();
    return res;
};


module.exports = {
    wxRequest
};
