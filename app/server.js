// DEPENDENCIES:
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

// APP USES
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// MESSAGE MODEL
var Message = mongoose.model('Message',{
  name : String,
  message : String
})

// ROUTES
const dbUrl = "mongodb+srv://mickazops:Mickael90@cluster0.bgqfw.mongodb.net/?retryWrites=true&w=majority";

// FIND MESSAGES
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

// POST MESSAGE
app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);
    console.log('aqui')
    var savedMessage = await message.save()
      console.log('saved');

    var censored = await Message.findOne({message:'badword'});
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})

// GET USER
app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})

// SOCKET CONNECTION
io.on('connection', () =>{
  console.log('a user is connected')
})

// CONNECT TO DB
mongoose.connect(dbUrl ,(err) => {
  console.log('mongodb connected',err);
})

// SERVER LISTEN
var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
