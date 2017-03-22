
const express = require('express')
const bodyParser = require('body-parser')
var currentId = 3
var theArticles = { articles : [ { id: 1, author: 'Scott', text:'A post' }, { id: 2, author: 'Scotty', text:'A posty' },
            { id: 3, author: 'Scottie', text:'A postie' }]}

const addArticle = (req, res) => {
     theArticles.articles.push({id: currentId+1, author: req.body.author, text: req.body.text});
     currentId++;
     res.json({id: currentId, author:req.body.author, text: req.body.text});
}

const getArticles = (req, res) => {
    console.log(req.params)
    articlesObj = {};
    articlesObj.articles = [];
    if (req.params.id)
    {
    theArticles.articles.forEach(function(element) {
      console.log("Element id is ", element.id)
      console.log("req.params.id is, ", req.params.id)
      if (element.id == req.params.id)
      {
        console.log("pushing")
        articlesObj.articles.push(element);
      }
    });
  }
  else{
    articlesObj = theArticles;
  }
  if (articlesObj.articles.length == 0){
    res.sendStatus(404)
  }
       res.send(articlesObj)
}

const hello = (req, res) => res.send({ hello: 'world' })
module.exports = app => {
  app.use(bodyParser.json())
  app.post('/article', addArticle)
  app.get('/', hello)
  app.get('/articles/:id?', getArticles)
}
