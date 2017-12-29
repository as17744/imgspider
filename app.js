const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
// app.get('/', function(req, res) {
    request('http://www.gamersky.com/', function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body);
            const t = $('.h1').eq(0).text().trim();
            // fs.appendFile('./data/title.txt', t, 'utf-8', function (err) {
            //     if (err) {
            //         console.log(err);
            //     }
            // });
            $('img').each(function(index, item) {
                const src = $(this).attr('src');
                if (src) {
                    const len = src.length;
                    const suffix = src.substr(len-4);
                    request.head(src, function(err, res, body){
                        request(src).pipe(fs.createWriteStream(`./img/${index}${suffix}`));
                    });
                } else {
                    console.log('Invalid URL');
                }
            });
        }
    });
// });