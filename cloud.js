const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
   res.sendFile(__dirname + "/pro.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const id="fcecb3e1729e2cf92398cdc451e9972a";
    const unit="metric";
    url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + id + "&units=" + unit + "";
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL="http://openweathermap.org/img/w/" + icon + ".png"

        res.write("<h1>The weather description is " + weatherDescription + "</h1>");
        res.write("<h2>The temperatue is " + temp + " degree Celcius</h2>");
        res.write("<img src=" + imageURL + ">");
        res.send();
    });

  });

});


app.listen(3000,function(){
    console.log("server is at port 3000");
});

