var mysql = require("mysql");

var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("********************************************");    
    console.log ("Welcome to Amazon! Here are the products available for sale. \n")
    showItems();

})

//Displays all the products available to purchase, and asks the customer what they would like to buy and how much
function showItems() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) {
            console.error("There was an error!");
        }

        var choicesArray = [];

        for (var i = 0; i < res.length; i ++){
            choicesArray[i] = res[i].product_name;
            console.log("Item " + i + ": " + choicesArray[i] + " has a price of $" + res[i].price + ". Stock available: " + res[i].stock_quantity);
        }
        console.log("********************************************");

        var exit = {
            name: '!!!!!! I would like to stop shopping !!!!!!'
        }

        choicesArray.push(exit)

            inquirer.prompt(
            [{
              name: "option",
              message: "What product would you like to buy? \n",
              type: "list",
              choices: choicesArray
            }]).then(function(answers) {
                if (answers.option == '!!!!!! I would like to stop shopping !!!!!!') {
                    console.log ("Thank you for shopping at Amazon. Have a nice day.");
                    connection.end();
                } else {

                    inquirer.prompt(
                        {
                          name: "number",
                          type: "input",
                          message: "How many would you like to buy? (Enter the number) \n"
                        }).then(function(answers2) {

                            checkSpecificItem(answers.option, answers2.number);
                            
                        });
                
                };
            });
    
            
                
                  
        

    });
}

//Checks to see if there's enough stock for a customer's purchase
function checkSpecificItem(item, count) {

    connection.query("SELECT * FROM products WHERE product_name = \'" + item + "\'", function(err, res){
        
        console.log("Number of items in inventory: " + res[0].stock_quantity);
        
        if (res[0].stock_quantity >= count){ 
            console.log ("Order processed.");
            processOrder(item, count, res[0].stock_quantity);
        } else {
            console.log ("Insufficient quantity!");
            showItems();
        }
    });

};

//Processing the customer's order
function processOrder(item, count, stock) {
    connection.query (
        "UPDATE products SET ? WHERE ?",
        [{
           stock_quantity: stock-count
        },
        {
          product_name: item
        }],
         function(err, res){
             console.log ("Database updated.");
         }
    );
    connection.query("SELECT * FROM products WHERE product_name = \'" + item + "\'", function(err, res){
        console.log ("Total cost was: $" + res[0].price * count);
        console.log("********************************************");
        showItems();
    });
}


