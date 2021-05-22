// object property shorthand


const name = 'Andrew';
const userAge = 27;

const user = {
    // name: name,
    name,
    age: userAge,
    location: 'philadelphia'
}

console.log(user)



// object destructuring

const product = {
    label: 'red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.2
}

// const label = product.label
// const stock = product.stock

// const {label, stock} = product
// console.log(label)
// console.log(stock)

// const {label, stock, rating} = product
// console.log(label)
// console.log(stock)
// console.log(rating)

/* // *below getting a propert for label-product and renaming it
const {label: productLabel, stock, rating = 5} = product
// console.log(label)
console.log(productLabel)
console.log(stock)
console.log(rating)
 */


// * destructuring inside function/arguments, etc.
const transaction = (type, {label, stock}) => {
    console.log(type, label, stock)
}

transaction('order', product) 


    





























