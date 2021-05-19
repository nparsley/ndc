/* const square = function (x) {
    return x * x;
}
 */

/* const square = (x) => {
    return x * x;
}
 */

/* const square = (x) => x * x


console.log((square)(2)); */


const event = {
    name: 'Birthday Party',
    guestList: ['andrew', 'jen', 'mike'],
    printGuestList() {
        console.log('guest list for ' + this.name);
        
        this.guestList.forEach((guest) => {
            console.log(guest + 'is attending the ' + this.name)
        })
    }
}

event.printGuestList()


