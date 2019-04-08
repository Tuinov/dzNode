const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());


app.get('/products', (req, res) => {
//    res.send('hello');
   fs.readFile('./db/products.json', 'utf-8', (err, data) => {
        if(err) {
        console.error(err);
        res.send('Произошла ошибка');
    }
//       console.log('start');
       res.send(data);
   });
});

app.listen(3000, () => {
    console.log('start');
});



app.post('/cart', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    const cart = JSON.parse(data);
    cart.push(req.body);
      res.send(req.body);

  });
});

app.patch('/cart/:id', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    let cart = JSON.parse(data);
    
    cart = cart.map((item) => {
      if(+item.id === +req.params.id) {
        item.quantity = req.body.quantity;
      }

      return item;
    });

    fs.writeFile('./db/cart.json', JSON.stringify(cart), () => {
      res.send(cart.find((item) => +item.id === +req.params.id));

    });
  });
});

app.delete('/cart/:id', (req, res) => {
  fs.readFile('./db/cart.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err);
      res.send('Произошла ошибка');
    }

    let cart = JSON.parse(data);
    
    cart = cart.map((item) => {
      if(+item.id === +req.params.id) {
         delete req.body.id;
      }

      return item;
    });

    
  });
});