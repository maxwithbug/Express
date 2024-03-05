const Express = require("express");
const router = Express.Router();
router.use(logger) //using middle-ware (it works top to bottom - and define it at top of the page always)


router.get("/",logger,logger,logger, (req, res) => { //we can use middle-ware Individually like (logger) , it will run 3 times 
  res.send("this is user rout ");
});
router.get("/new", (req, res) => {
  res.send("this is new user rout ");
});
router.post("/login", (req, res) => {
  res.send("create user ");
});

//creating a dynamic code and getting the id from url (dynaamic paramiter )
router.get("/:id", (req, res) => {
  res.send(`get user with id : ${req.params.id} `);
});

//(vvi)-> static should be in top and dynamic should be in bottom , if you want to know then un-comment following code the then do user/new
// router.get('/new',(req,res)=>{
//     res.send('this is new user rout ')
// });

//EASY way to do get put delete , because it's soo common (chain technique)--
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`get user with id : ${req.params.id} `);
  })
  .put((req, res) => {
    res.send(`updated the user with id : ${req.params.id} `);
  })
  .delete((req, res) => {
    res.send(`deleted the user with id : ${req.params.id} `);
  });

//it's run the code when it finds the parameter (it's a middle ware --> it's running first then next() run the next middleware for this case is our get put delete )
/*middle-ware works in middle of starting of requst and ending of a request --> and every middle-ware takes req,res,next */
const users = [{ name: "noob" }, { name: "cool" }]; //for test
router.param("/id", (req, res, next, id) => {
  console.log(id); //2nd id means it is the value of the id
  req.user = users[id]; //id's value will be the index of the user array
  next();
});

/*it's a middle-ware */
function logger(req,res,next){
    const url = req.originalUrl
    console.log(url);
    next()
}



module.exports = router;
