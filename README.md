# BAmazon
A CLI application meant to simulate a store. Uses MySQL, Javascript, and Node.

**BAmazonCustomer**

Video Link: <a href="https://drive.google.com/file/d/1KVua8EGJt624gBH_rVsBIYmSFOErtxPW/view?usp=sharing">

This application is used by the customer to shop at our Amazon store.

A list of products are displayed, with their name, price, and stock shown. The department of the product is hidden.

The user is now given an option as to which product they would like to buy. Alternatively, they can choose the last option to stop shopping and exit the program.

After a product is selected, the program will ask the user how many they would like to buy. Once the number is inputted, an amount of available stock is once again shown.

If the quantity is insufficient, the transaction will fail and the user will be sent back to the main menu.

However, if the quantity is sufficient, then the order will be processed, the mySQL database will be updated, and the total cost of the order will be displayed. The user will then be sent back to the main menu.

As stated, the user may choose to exit the program at the main menu by selecting the last option, which will display a final "Thank you for shopping at Amazon" message before terminating.

**BAmazonManager**

Video Link: <a href="https://drive.google.com/file/d/1I3nUwZ797cSWtaS6YN0P3l1eItMqoHte/view?usp=sharing">

This application is used by the manager of the Amazon store to manage what's being sold at the store.

The program begins at the main menu, where the user has a few options.

View Products for Sale: This allows the manager to view the products that they have on sale right now in the store. Afterwards, the user will be sent back to the main menu.

View Low Inventory: This allows the manager to view the products in store that have a stock that's less than 5. It helps the manager identify which products need urgent restocking. Afterwards, the user will be sent back to the main menu.

Add to Inventory: This allows the manager to add to the inventory to one of the existing products, thereby increasing stock available for that product. The user will be prompted which product and the amount of additional stock they would like to add into the store. Then, the user will be sent back to the main menu.

Add New Product: This allows the manager to add an entirely new product to the store. The manager will be prompted a number of questions, such as the product's name, department, price, and stock. Then, the user will be sent back to the main menu.

Exit: This allows the user to end the program.

