type Pizza = {
    name: string,
    price: number
}

type Order = {
    id: number,
    pizza: Pizza,
    status: string
}


const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 }
]

console.log(menu)

let cashInRegister = 300;
let nextOrderID: number = 1;
const orderHistory: Order[] = [];


function addNewPizza(pizzaObj: Pizza) {
    menu.push(pizzaObj);
}

function placeOrder(pizzaName: string) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        console.error("No pizza found!")
        return
    }
 
    cashInRegister += selectedPizza.price;
    const newOrder = { id: nextOrderID++, pizza: selectedPizza, status: "ordered" };
    orderHistory.push(newOrder)
    return newOrder;
}

function completeOrder(orderId: number) {
    const order = orderHistory.find(order => order.id === orderId)
    if (!order) {
        throw new Error(`Order id ${orderId} was not found!`)
        return
    }
    order.status = "completed"
    return order;
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chickem", price: 11.5 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order History", orderHistory)