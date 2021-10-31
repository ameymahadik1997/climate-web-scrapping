const PORT = 8000;
const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const app  = express();
const articles = []
const articles2 = []


app.get('/',(req,res)=>{
    res.json("Welcome to the web climate scrapping API")
});

app.get('/news-main',(req,res)=>{
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)

        $(`a:contains("Climate")`,html).each(function (){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,url
            })
        })


        res.json(articles)
    }).catch((er) => console.log(er))
});

app.get('/hot-news-main',(req,res)=>{
    axios.get('https://www.skysports.com/football/news')
    .then((response)=>{
        const html2 = response.data
        const $ = cheerio.load(html2)

        $(`a:contains("hospital")`,html2).each(function (){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles2.push({
                title,url
            })
        })
        res.json(articles2)
    }).catch((er) => console.log(er))
})

app.listen(PORT, ()=> {
    console.log(`Server is running in PORT number that we instantiated =  ${PORT}`)
});

