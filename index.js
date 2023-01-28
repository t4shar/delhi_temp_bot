const { default: axios } = require('axios');
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config()  

const TOKEN = process.env.TOKEN;

const api_key = process.env.API;
const bot = new TelegramBot(TOKEN, {polling: true});

var now = new Date();
var delay = 60 * 60 * 1000; 
var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();


var cron = require('node-cron');

const dosomething = async()=>{
    try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=28.7041,77.1025&aqi=no`

    const res = await axios(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
    return res.data.current.temp_c;
    
} catch (error) {
        console.log(error);
}
}



bot.on('message', async (msg) => {
    var time = now.getHours() + ":" + now.getMinutes();
    var mins = now.getMinutes();
    console.log(mins);
    if(mins !='00'){
        const data = await dosomething();
        const chatId = msg.chat.id;
        bot.sendMessage(chatId,'Delhi Temperature at '+time+' = '+data+'°C');
    }
    setTimeout( async function rfun() {
    const f_now = new Date();
     const data = await dosomething();
     const chatId = msg.chat.id;
     bot.sendMessage(chatId,'Delhi Temperature at '+f_now.getHours() + ":" + f_now.getMinutes()+' = '+data+'°C');
        setTimeout(rfun, delay);
     }, start);
  
    });