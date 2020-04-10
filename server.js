const express =require('express')
var app=express()
var mysql=require('mysql')
var bodyParser=require('body-parser')
const cors=require('cors')
const engines = require('consolidate');
app.use(bodyParser.json({type:'application/json'}))
app.use(bodyParser.urlencoded({ extended: true }))
var checksum=require('./paytm/checksum')
const checksum_lib = require('./paytm/checksum');


app.engine('ejs',engines.ejs)
app.set("view engines","ejs")

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ritzynew'
})
app.listen(3000,function(){
    console.log('started')

})

app.use(cors())


app.get('/users',function (req,res) {

    connection.query(`select * from users`,function(err,rows){
        if(err){
            console.log(err)
        }else{
            res.send(rows)
        }
    })

})
app.get('/getuser/:id',function(req,res){
    connection.query(`select * from users where email='${req.params.id}'`,function(err,rows){

        if(err)
        {
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })
})


app.post('/users',function(req,res){
    connection.query(`Insert into users(name,email)select * from ( select '${req.body.name}','${req.body.email}') as tmp WHERE NOT EXISTS (select email from users where email='${req.body.email}')     `,function(err,rows){
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })
})

app.post('/username',function(req,res) {
    connection.query(`update users set username='${req.body.username}' ,name='${req.body.name}',image='${req.body.image}' where email='${req.body.email}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.send(rows)
        }
    })
})






app.get('/getcity',function(req,res){
    connection.query(`select * from cities`,function(err,rows){

        if(err)
        {
            console.log(err)
        }
        else{

            res.send(rows)
        }
    })
})



app.post('/subscribed',function(req,res){
    connection.query(`Insert into suscribe(userid,city)select * from ( select ${req.body.id},'${req.body.city}') as tmp WHERE NOT EXISTS (select userid,city from suscribe where userid=${req.body.id} and city='${req.body.city}')     `,function(err,rows){
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })


})



app.get('/getsub/:id',function(req,res){
    connection.query(`select * from suscribe where userid=${req.params.id}`,function(err,rows){
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })
})

app.post('/updateuser/:id',function(req,res){
    connection.query(`update users set name='${req.body.name}',username='${req.body.username}',email='${req.body.email}',image='${req.body.image}'`,function(err,rows){
        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })
})








app.get('/ispay/:id/:ids',function(req,res){

    connection.query(`select * from paycity where userid=${req.params.id} and city='${req.params.ids}'`,function(err,rows){
        if(err){
            console.log(err)
        }else{
            res.send(rows)
        }
    })

})


app.post('/postpay',function(req,res){
    connection.query(`Insert into paycity(userid,city,day)select * from ( select ${req.body.id},'${req.body.city}',${req.body.date}) as tmp WHERE NOT EXISTS (select userid,city from paycity where userid=${req.body.id} and city='${req.body.city}')   `,function (err,rows) {
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(rows)
        }

    })
})


app.post('/changedate',function(req,res){
    connection.query(`update paycity set remain=${req.body.date},day=${req.body.day} where userid=${req.body.id} and city='${req.body.city}' `,function(err,rows){

        if(err){
            console.log(err)
        }
        else{
            res.send(rows)
        }
    })
})








app.post('/changepay',function (req,res) {

    connection.query(`update paycity set remain=${req.body.remain},day=${req.body.day} where userid=${req.body.id} and city='${req.body.city}'`,function (err,rows) {


        if(err)
        {
            console.log(err)
        }
        else{
            res.send(rows)
            console.log("done")
        }

    })

})


















app.get('/paytm/request', function(req,res){
    res.render("index.ejs")
})




app.post('/paytm/request',function(req,res) {


    var paramlist = req.body;
    var paramarray = new Array();
    for (name in paramlist) {
        if (name == "PAYTM_MERCHANT_KEY") {
            var PAYTM_MERCHANT_KEY = paramlist[name];
        } else {
            paramarray[name] = paramlist[name];
        }
    }
    paramarray["CALLBACK_URL"] = "http://3.7.73.13:3000/paytm/response";
    checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, (err, result) => {
        if (err) throw err;
        res.render("request.ejs", { result });
    });

})








app.post('/paytm/response',function(req,res){
    if (req.body.RESPCODE === "01") {
        res.render("response.ejs", {
            status: true,
            result: req.body
        });
    } else {
        res.render("response.ejs", {
            status: false,
            result: req.body
        });
    }

})
