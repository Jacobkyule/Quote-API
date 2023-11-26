const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`server is up and running on port ${PORT}`)
});

const quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter)

quotesRouter.get('/random', (req, res, next) => {
   const randomQuote = {};
   randomQuote.quote = getRandomElement(quotes);
   
   //console.log(randomQuote)
   res.json(randomQuote)
})

quotesRouter.get('/', (req, res, next) => {
    const hasQueryString = req.query.person;

    if(!hasQueryString){
        const allQuotes = {
            quotes: quotes
        };
        
       // console.log(allQuotes)
        res.json(allQuotes);

    } else if (hasQueryString){
        let newObj = {}
        let newArr = [];
      quotes.forEach((quote)=>{
        if(quote.person === hasQueryString){
            newArr.push(quote)
            newObj.quotes = newArr
        }
      })
      //console.log(newObj)
      res.json(newObj);
    } else {
        const emptyArrObj = {
            quotes: []
        };
        
        //console.log(emptyArrObj)
        res.json(emptyArrObj)
    }
})


quotesRouter.post('/', (req, res, next)=>{
    const { quote, person } =   req.query;
    if (quote && person){
        const receivedQuote = {
            quote,
            person
        }

        quotes.push(receivedQuote);
        const response = {
            quote: receivedQuote
        }
        console.log("Response", response);
        res.json(response);
    } else {
        res.status(400).send();
    }
        
})