const superagent = require('superagent'); //发送网络请求获取DOM
const cheerio = require('cheerio'); //获取DOM节点

const steamUrl = 'https://store.steampowered.com/explore/new/';
let saleData = [];

superagent.get(steamUrl).end(function(err,res){
    if(err){
        console.log(err);
    }
    let $ = cheerio.load(res.text);
    $('.newonsteam_headercaps a').each((i, e) => {
        let obj = {};
        if($(e).find('img').attr('src')){
            obj.imgHref = $(e).attr('href');
            obj.imgUrl = $(e).find('img').attr('src');
            obj.discount = $(e).find('.discount_pct').text();
            obj.price = $(e).find('.discount_final_price').text();
            saleData.push(obj);
        }
    });
    console.log(saleData);
});