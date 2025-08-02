function genTicket(n) { // returns an arrays of size n of randomly generates numbers
    let arr = new Array(n);
    for(let i=0; i<n; i++) {
        arr[i] = Math.floor(Math.random() * 10);
    }
    return arr;
}

function sum(arr) {
    return arr.reduce((sum, curr) => sum + curr);
}

function genNDigitNum(n) {
    const min = Math.pow(10, n - 1); // Smallest n-digit number
    const max = Math.pow(10, n) - 1; // Largest n-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {genTicket, sum, genNDigitNum};
