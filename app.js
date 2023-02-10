
//npm packages
const { response } = require("express");
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/", function(req, res){
    res.sendFile(__dirname+ "/index.html");
})
app.post("/",function(req, res){
    const LocationName = req.body.cityName;
    console.log(LocationName);
    const appID = 'd4a4d6cb7d405a66e04d641a7518d76a'
    const url =  "https://api.openweathermap.org/data/2.5/weather?q="+LocationName+"&units=metric&appid="+appID+""


    https.get(url,function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp =weatherData.main.temp;
            const humidity =weatherData.main.humidity;
            const weather =weatherData.weather[0].description;
            const windSpeed =weatherData.wind.speed;
            const imageLogo = weatherData.weather[0].icon;
            let all = console.log(temp,humidity, weather, windSpeed);
            const urlWeatherIconLogo = "https://openweathermap.org/img/wn/"+imageLogo+"@2x.png";
            // const urlWeatherIconLogo = `https://openweathermap.org/img/wn/${imageLogo}@2x.png`;
            res.write('<head><meta charset="utf-8"></head>');
            res.write("<p>The temperature is " + temp +". & the humidity is " +humidity +"</p>");
            res.write("<h1>The weather here is " + weather+" &  the speed of the wind is "+ windSpeed +"</h1>");
            // res.write("<img src =" + urlWeatherIconLogo+">");
            res.write(`<img src=${urlWeatherIconLogo}>`);
            res.send()
    })
    })
})




app.listen(3000, function(){
    console.log("Server is running on the port 3000");

})