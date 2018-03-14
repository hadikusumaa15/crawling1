let axios = require('axios');
let cheerio = require('cheerio');
const mongoskin = require('mongoskin');
const dbUrl = 'mongodb://@localhost:27017/express_app';
const db = mongoskin.db(dbUrl);

//var blog1_url = "https://realpython.com/blog/python/modern-web-automation-with-python-and-selenium/";
var blog1_url = "http://panduanim.com/membuat-blog/"
axios.get(blog1_url)
.then( (response) => {
    let $ = cheerio.load(response.data);
    let article = {};
    article.title = $('h1').text();
    article.subtitle = $('h2').text();
    article.content = $('p.horizontal-bar-title').text();
    article.authorName = $('span.entry-author').text();
    article.date = $('time.entry-modified-time').text();

   
    return(article);
})
.then((data) => {
    console.log(data);
    const collections = {
        articles: db.collection('articles'),
    };
      collections.articles.insert(data);
      console.log('end');
})