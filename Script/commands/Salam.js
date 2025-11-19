const fs = require("fs");
const gTTS = require("gtts");

module.exports.config = {
  name: "salambot",
  version: "1.3.0",
  hasPermssion: 0,
  credits: "Ridu",
  description: "সালামের মেসেজের সাথে ❤️ ইমোজি এবং female voice",
  commandCategory: "Auto",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  // সালামের trigger
  const salamTriggers = ["সালাম", "assalamu", "assalamualaikum", "salam"];

  if (salamTriggers.some(t => msg.includes(t))) {
    // মূল message এর সাথে ❤️ emoji যোগ করা
    const editedText = body + " ❤️";

    // Female voice text
    const voiceText = "ওয়া আলাইকুমুস সালাম। ঋদু বস এর পক্ষ থেকে আপনাকে শুভেচ্ছা।";

    // TTS generate
    const tts = new gTTS(voiceText, "bn");
    const filePath = __dirname + "/salam_voice.mp3";

    tts.save(filePath, async () => {
      // মেসেজে emoji attach এবং voice পাঠানো
      api.sendMessage(
        {
          body: editedText,
          attachment: fs.createReadStream(filePath)
        },
        threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  }
};

module.exports.run = () => {};
