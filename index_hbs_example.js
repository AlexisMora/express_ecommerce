const express = require('express')
const app = express()
const engines = require('consolidate')
app.engine('hbs',engines.handlebars)

app.set('views', './views')
app.set('view engine','hbs')

app.get("/",(request,response)=>response.render("index",{hello : "hola", world: "mundo"}))

const server = app.listen(8000,function(){
    console.log(`Listening on http://localhost:${server.address().port}`)
})