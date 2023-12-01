const app = require("./app");
const setupMongoConection = require("./common/utils/setupMongoConection");

app.listen(3000, async () => {
  await setupMongoConection();
  console.log("Server running. Use our API on port: 3000");
});
