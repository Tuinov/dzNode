const fs = require('fs');

fs.readFile('./products.json', 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
        return;
    }
    
    //    console.log(data);
    const products = JSON.parse(data);
    products.push({"id": 4, "name": "зарядка", "price": 2500});
    
    
    
    fs.writeFile('./db/products.json', JSON.stringify(products), (err) => {
        console.log('Done');
    });

    
});





