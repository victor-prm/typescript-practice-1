let cashInRegister = 300;
let nextOrderID: number = 1;
let nextPizzaID: number = 1;
const orderHistory: Order[] = [];


type Pizza = {
    id: number,
    name: string,
    price: number
}

type Order = {
    id: number,
    pizza: Pizza,
    status: "completed" | "ordered"
}


const menu: Pizza[] = [
    { id: nextPizzaID++, name: "Margherita", price: 8 },
    { id: nextPizzaID++, name: "Pepperoni", price: 10 },
    { id: nextPizzaID++, name: "Hawaiian", price: 10 },
    { id: nextPizzaID++, name: "Veggie", price: 9 }
]

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
    const newPizzaObj = {
        id: nextPizzaID++,
        ...pizzaObj
    }
    menu.push(newPizzaObj);
    return newPizzaObj;
}

function placeOrder(pizzaName: string): Order | null {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        console.error("No pizza found!")
        return null
    }

    cashInRegister += selectedPizza.price;
    const newOrder: Order = { id: nextOrderID++, pizza: selectedPizza, status: "ordered" };
    orderHistory.push(newOrder)
    return newOrder;
}

function completeOrder(orderId: number): Order | null {
    const order = orderHistory.find(order => order.id === orderId)
    if (!order) {
        throw new Error(`Order id ${orderId} was not found!`)
        return null
    }
    order.status = "completed"
    return order;
}

function getPizzaDetail(identifier: number | string): Pizza | undefined {
    if (typeof identifier === "string") {
        let selectedPizza = menu.find(pizzaObj => pizzaObj.name.toLowerCase() === identifier);
        return selectedPizza;
    }
    else if (typeof identifier === "number") {
        let selectedPizza = menu.find(pizzaObj => pizzaObj.id === identifier);
        return selectedPizza;
    } else {
        throw new Error("Not a number or string!")
    }
}

addNewPizza({name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({name: "BBQ Chicken", price: 11.5 })
addNewPizza({name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order History", orderHistory)

console.log(getPizzaDetail(1))