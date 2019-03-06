const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'QQ',
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {
        user: '593405087@qq.com', //账户
        pass: 'pxgzpinzsnvvbeci',
    }
});

let mailOptions = {
    from: '"Sue" <593405087@qq.com>', // 发送者昵称和地址
    to: '1430999133@qq.com',
    subject: '来自你爸爸的圣旨',
    text: 'To my son.',  //邮件的text
    // html: html  //也可以用html发送
};

//发送邮件
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('邮件发送成功 ID：', info.messageId);
});