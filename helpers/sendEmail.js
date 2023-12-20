const ElasticEmail = require("@elasticemail/elasticemail-client");
require("dotenv").config();

const { ELASTICEMAIL_API_KEY, EMAIL_FROM } = process.env;
const defaultClient = ElasticEmail.ApiClient.instance;
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const callback = function (error, data, response) {
  if (error) {
    console.error(error.message);
  } else {
    console.log("API called successfully.");
  }
};
const sendEmail = (data) => {
  console.log(data);
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(data.to)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: data.html,
        }),
      ],
      Subject: data.subject,
      From: EMAIL_FROM,
    },
  });
  api.emailsPost(email, callback);
  return true;
};

module.exports = sendEmail;
