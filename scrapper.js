var express=require('express');
var fs=require('fs');
var request=require('request');
var cheerio=require('cheerio');
var app=express();

app.get('/scrape',function(req,res){

  url = 'http://www.imdb.com/title/tt3405236/';

  request(url,function(error,response,html){
    if(!error)
    {
      var $=cheerio.load(html);
      var title,release,rating;
      var json={title:"",release:"",rating:""};
      $('.title_wrapper').filter(function(){
        var data=$(this);
        title=data.children().first().first().text();
        release=data.children().last().children().last().text();
        json.title=title;
        json.release=release;
      })
        $('.ratingValue').filter(function(){
          var data = $(this);
          rating=data.children().first().text();

          json.rating = rating;
      })
    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');
    })
    res.send('Check your console!')
      });
    })
    app.listen('3000')
    console.log('Magic happens on port 3000');
    exports = module.exports = app;
