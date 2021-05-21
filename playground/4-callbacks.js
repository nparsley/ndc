/* setTimeout(() => {
    console.log('two seconds are up')
}, 2000)

const names = ['Andrew', 'Jan', 'Jess']
const shortNames = names.filter((name) => {
    return name.length <= 4;
})

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            lat: 0,
            lng: 0
        }
    
        callback(data);
    }, 2000)
}

geocode('philadelphia', (dataposition) => {
    console.log(dataposition);
}); */



const add = (math, math1, callback) => {
    setTimeout(() => {
        // const numbers = 1 + 4;

        // callback(numbers);

        callback(math + math1)
    }, 2000)
    
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})


































































