const express = require("express");
const { json } = require("stream/consumers");
const app = express();

// middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));


// get route 
app.get("/temp", (req,res) => {
    res.render("./index.ejs");
});


// post route
app.post("/temp", async (req,res) => {
    if(!req.body) {
        res.send("please enter a valid data");
    } 

    let arr = req.body.cities.split(" ");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "3720862c5796f12af9a5afceb0bdadf2";
    let nums = [];

    try {
        for(let i=0; i<arr.length; i++) {
            let response = await fetch(`${API_URL}?q=${arr[i]}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            jsonResponse.city = arr[i];
            nums.push(jsonResponse);
        }

    } catch(err) {
         nums.push(false);
    }
     res.render("./temp.ejs", { nums });
});




// page not found
app.use((req,res) => {
    res.send("404 Page not found got on route http://localhost:8080/temp");
});


app.listen(8080, () => {
    console.log("app is Listening");
});