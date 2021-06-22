const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')


test('should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)

    // if (total !== 13) {
    //     throw new Error('total tip should be 13. got ' + total)
    // }
})

test('should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})


/* // string-test case name. function-containing code to test

test('Hello world', () => {

})

test('this should fail', () => {
    throw new Error('failure!')
}) */


test('should convert 32 F to 0 C', () => {
const temp = fahrenheitToCelsius(32)
expect(temp).toBe(0)

})



test('should convert 0 C to 32 F', () => {
const temp = celsiusToFahrenheit(0)
expect(temp).toBe(32)
})



// test('async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)

// })

test('should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})


test('should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})


