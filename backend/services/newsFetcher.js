const axios = require("axios");
const Alert = require("../models/Alert");
const User = require("../models/User");
const sendEmail = require("./emailService");

module.exports = async function fetchNewsAndSendEmails() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=${today}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );

    const articles = res.data.articles.slice(0, 5);
    const users = await User.find();

    for (const article of articles) {
      const alert = new Alert({
        title: article.title,
        description: article.description,
        category: 'Tesla',
        url: article.url,
        sentTo: users.map((u) => u.email),
        createdAt: new Date()
      });

      await alert.save();

      for (const user of users) {
        try {
          await sendEmail(
            user.email,
            article.title,
            `${article.description}\n\nRead more: ${article.url}`
          );
        } catch (emailErr) {
          console.error(`Failed to send to ${user.email}:`, emailErr.message);
        }
      }
    }
  } catch (err) {
    console.error("Error fetching/sending news:", err.message);
  }
};
