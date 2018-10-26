
const TelegramBot = require('node-telegram-bot-api');
const https = require('https');
const token = 'key';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/getQuote/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; 
    https.get('https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=text&lang=ru', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            bot.sendMessage(chatId, data);
        });
    }).on("error", (err) => {
        bot.sendMessage(chatId, "Не удалось получить новую цитату :(");
    });
});


bot.onText(/\/getWeather/, (msg) => {
    const chatId = msg.chat.id;
bot.sendMessage(chatId, "Узнать погоду в ", {
"reply_markup": {
    "keyboard": [["Москве"],["Санкт-Петербурге"],["Севастополе"]],
    "one_time_keyboard":true
    }
});
    
});


bot.on('message', (msg) => {
const chatId = msg.chat.id;
if (msg.text.toString() === "Москве") {
     https.get('https://api.openweathermap.org/data/2.5/weather?q=Moscow&lang=ru&units=metric&appid=key', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {

            let res = "В Москве сейчас "+JSON.parse(data).weather[0].description + '. Температура за окном ' + parseInt(JSON.parse(data).main.temp) + ' градусов Цельсия. Влажность воздуха составляет ' +JSON.parse(data).main.humidity + '%. Скорость ветра ' + parseInt(JSON.parse(data).wind.speed)+'м/с.'
            bot.sendMessage(chatId, res);
        });
    }).on("error", (err) => {
        bot.sendMessage(chatId, "Не удалось получить информацию о погоде :(");
    });
}

if (msg.text.toString() === "Санкт-Петербурге") {
     https.get('https://api.openweathermap.org/data/2.5/weather?q=Saint Petersburg&lang=ru&units=metric&appid=key', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            let res = "В Санкт-Петербурге сейчас "+JSON.parse(data).weather[0].description + '. Температура за окном ' + parseInt(JSON.parse(data).main.temp) + ' градусов Цельсия. Влажность воздуха составляет ' +JSON.parse(data).main.humidity + '%. Скорость ветра ' + parseInt(JSON.parse(data).wind.speed)+'м/с.'
            bot.sendMessage(chatId, res);
        });
    }).on("error", (err) => {
        bot.sendMessage(chatId, "Не удалось получить информацию о погоде :(");
    });
}    
var robot = "Севастополе";
if (msg.text.toString() === "Севастополе") {
    https.get('https://api.openweathermap.org/data/2.5/weather?q=Sevastopol&lang=ru&units=metric&appid=key', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
             let res = "В Севастополе сейчас "+JSON.parse(data).weather[0].description + '. Температура за окном ' + parseInt(JSON.parse(data).main.temp) + ' градусов Цельсия. Влажность воздуха составляет ' +JSON.parse(data).main.humidity + '%. Скорость ветра ' + parseInt(JSON.parse(data).wind.speed)+'м/с.'
            bot.sendMessage(chatId, res);
        });
    }).on("error", (err) => {
        bot.sendMessage(chatId, "Не удалось получить информацию о погоде :(");
    });
}
});