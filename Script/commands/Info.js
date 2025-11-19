const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Ridu",
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "info",
    cooldowns: 2
};

module.exports.run = async function({ api, event }) {
    const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

    const callback = () => api.sendMessage({
        body: `
╭━━━━━━━━━━━━━━━✦
│ 👑 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  
├━━━━━━━━━━━━━━━✦
│ 👤 𝗡𝗮𝗺𝗲 : 𝗥𝗶𝗱𝘂
│ 🚹 𝗚𝗲𝗻𝗱𝗲𝗿 : 𝗠𝗮𝗹𝗲
│ ❤️ 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : 𝗦𝗶𝗻𝗴𝗹𝗲
│ 🎂 𝗔𝗴𝗲 : 𝟮𝟱
│ 📍 𝗟𝗼𝗰𝗮𝘁𝗶𝗼𝗻 : 𝗦𝘆𝗹𝗵𝗲𝘁, 𝗛𝗮𝗯𝗶𝗴𝗮𝗻𝗷
╰━━━━━━━━━━━━━━━✦
`,
        attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

    // Direct image URL
    return request("https://i.ibb.co.com/p6LZf25P/20251118-021040-1.jpg")
        .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
        .on('close', () => callback());
};
