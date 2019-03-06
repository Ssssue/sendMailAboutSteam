const ejs = require('ejs'); //ejs模版引擎
const fs  = require('fs'); //文件读写
const path = require('path'); //路径配置
const nodemailer = require('nodemailer');

const superagent = require('superagent'); //发送网络请求获取DOM
const cheerio = require('cheerio'); //获取DOM节点

const steamUrl = 'https://store.steampowered.com/explore/new/';

let transporter = nodemailer.createTransport({
    service:'QQ',
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {
        user: '593405087@qq.com', //账户
        pass: 'pxgzpinzsnvvbeci',
    }
});

let saleData = [];

//将目录下的mail.ejs获取到，得到一个模版
const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'main.ejs'), 'utf8'));

(() => {
    return new Promise(function(resolve,reject){
        superagent.get(steamUrl).end(function (err, res) {
            if (err) {
                reject(err);
            }
            let $ = cheerio.load(res.text);
            $('.newonsteam_headercaps a').each((i, e) => {
                let obj = {};
                if ($(e).find('img').attr('src')) {
                    obj.imgHref = $(e).attr('href');
                    obj.imgUrl = $(e).find('img').attr('src');
                    obj.discount = $(e).find('.discount_pct').text();
                    obj.price = $(e).find('.discount_final_price').text();
                    saleData.push(obj);
                }
            });
            resolve(saleData);
        });
    }).then(()=>{
        //传给EJS的数据
        let data={
            title:'Steam新品推荐',
            saleData,
        };
        console.log(saleData);
        //将数据传入模版中，生成HTML
        const html = template(data);


        let mailOptions = {
            from: '"酥酥大人" <593405087@qq.com>', // 发送者昵称和地址
            to: 'lzp4ever@gmail.com',
            subject: '来自宝贝的问候(＾Ｕ＾)ノ~',
            html: html
        };

        //发送邮件
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('邮件发送成功 ID：', info.messageId);
        });
    })
})();

