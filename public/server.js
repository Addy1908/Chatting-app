const express = require('express')
const app=express()
const http = require('http').createServer(app)

const port=1800;

http.listen(port,function(){
    console.log(`listening at port ${port}`)
})


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html' )
})


//socket

const io = require('socket.io')(http)

io.on('connection',(socket) => {
console.log('connected ....')


socket.on('message',(msg) => {
socket.broadcast.emit('message',msg)        //it is used to send the message to all the connected users except the person who send the msg


})
})