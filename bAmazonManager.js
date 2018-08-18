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
})

function addNewItem(){
    inquirer.prompt(
        [{
            name: "item",
            message: "What item do you want to add? \n",
            type: "input"
            
        },{
            name: "department",
            message: "What department do you want to add it into? \n",
            type: "input"
            
        },{
            name: "price",
            message: "What price do you want to set it as? \n",
            type: "input"
            
        },{
            name: "stock",
            message: "How much stock would you like to add? \n",
            type: "input"
            
        }]).then(function(answers) {

            var query = connection.query (
                "INSERT INTO products SET ?",
                {
                    product_name : answers.item,
                    department_name: answers.department,
                    price : parseInt(answers.price),
                    stock_quantity : answers.stock
                },
                function(err, res){
                    if (err)
                    throw (err);
                    
                    console.log ("New item added into the inventory!");
                    menu();
                }
            );
   
        }
     );
}
console.log("********************************************");
console.log("Welcome to Amazon Managers!");
console.log("********************************************");

menu();
//Initial Menu
function menu() {

    inquirer.prompt(
        {
            name: "option",
            message: "What would you like to do? (Use Arrow Keys) \n",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
            
        }).then(function(answers) {
            console.log(answers.option);
            if (answers.option == "View Products for Sale") {
                viewProducts();
            } else if (answers.option == "View Low Inventory"){
                
                viewLowInventory()

            } else if (answers.option == "Add to Inventory"){

                addToInventory()

            } else if (answers.option == "Add New Product") {
                addNewItem();
            } else if (answers.option == "EXIT") {
                console.log ("Thank you for managing Amazon. Have a nice day!");
                connection.end();
            }
            
        }
    );
};

//Displays all the products 
function viewProducts() {

    connection.query("SELECT * FROM products", function(err, res){
        if (err) {
            console.error("There was an error!");
        }
        var choicesArray = [];

        console.log("********************************************");
        for (var i = 0; i < res.length; i ++){
            choicesArray[i] = res[i].product_name;
            console.log("Item " + i + ": " + choicesArray[i] + " has a price of $" + res[i].price + ". Department: " + res[i].department_name + ". Stock available: " + res[i].stock_quantity);
        }
        console.log("********************************************");
        menu();
    });

    

}

//View all items that have less than 5 in stock
function viewLowInventory() {

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
        if (err) {
            console.error("There was an error!");
        }
        console.log("Items with less than 5");
        var choicesArray = [];
        console.log("********************************************");

        for (var i = 0; i < res.length; i ++){
            choicesArray[i] = res[i].product_name;
            console.log("Item " + i + ": " + choicesArray[i] + " has a price of " + res[i].price + ". Stock available: " + res[i].stock_quantity);
        }
        console.log("********************************************");
        menu();
    });

    

}

//Queries the user about what inventory they would like to add
function addToInventory() {

        connection.query("SELECT * FROM products", function(err, res){
            if (err) {
                console.error("There was an error!");
            }

            var choicesArray = [];

            for (var i = 0; i < res.length; i ++){
                choicesArray[i] = res[i].product_name;
            }

            

            inquirer.prompt(
                {
                    name: "item",
                    message: "What would you like to add inventory to? (Use Arrow Keys) \n",
                    type: "list",
                    choices: choicesArray
                    
                }).then(function(answers) {
                    
                    var existingStock;

                    for (var i = 0; i < res.length; i ++){
                        if (res[i].product_name == answers.item){
                           existingStock = res[i].stock_quantity;
                           console.log ("Currently, there are " + existingStock + " in stock.");
                        }
                    }

                    inquirer.prompt(
                        {
                            name: "amount",
                            message: "How many would you like to add? \n",
                            type: "input"
                            
                        }).then(function(answers2) {
                            
                            
                            addAmount(answers.item, answers2.amount, existingStock);
                            
                        }
                    );

                
                    
                }
            );
        

        });

        
}

//Function that updates the stock for a specific item by a pre-specified amount
function addAmount(item, amount, stock) {

    connection.query("UPDATE products SET ? WHERE ?",
            [{
                stock_quantity : parseInt(stock)+parseInt(amount)
            },{
                product_name : item
            }], function(err, res2){

            if (err) {
                console.error("There was an error! why");
            }
                        
            console.log("Inventory added by " + amount + " for " + item + ". We now have " + (parseInt(stock)+parseInt(amount)) + " in stock.");
                    
            menu();
                     
     }); 

}
