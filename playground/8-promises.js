const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([2, 5, 9])
        reject('error occured')
        // resolve([2, 3, 2])
    }, 2000)
})


doWorkPromise.then((result) => {
    console.log('success', result)
}).catch((error) => {
    console.log('error', error)
})




//                              fulfilled
// promise -- pending -->
//                              rejected










