const Express = require("express");
const app = Express();
const PORT = 5050;


app.get("/", (req, res) => {
  res.send("thias is the default page ");
});

const userrout = require('./routes/user')
app.use('/api',userrout);



app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
