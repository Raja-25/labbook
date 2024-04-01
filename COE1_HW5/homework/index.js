function isEquals(a, b) {
    return a == b;
}

function isBigger(a, b) {
    return a > b;
}

function storeNames(...args) {
    var names = [];
    for(var i = 0; i < args.length; i++) {
        names.push(args[i]);
    }
    return names;
}


function getDifference(a, b) {
    return a > b ? a - b : b - a;
}

function negativeCount(arr) {
    var count = 0;
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] < 0) {
            count++;
        }
    }
    return count;
}

function ltCount(str, lt) {
    var count = 0;
    for(var i = 0; i < str.length; i++) {
        if(str[i] == lt) {
            count++;
        }
    }
    return count;
}
function countPoints(g) {
    var points = 0;
    for(var i = 0; i < g.length; i++) {
        var [x, y] = g[i].split(':').map(Number);
        points =points+( x > y ? 3 : x === y ? 1 : 0);
    }
    return points;
}
console.log(isEquals(5, 5)); // Output: true
console.log(isEquals(5, 6)); // Output: false

console.log(isBigger(5, 3)); // Output: true
console.log(isBigger(3, 5)); // Output: false

console.log(storeNames("John", "Doe", "Alice")); // Output: ["John", "Doe", "Alice"]

console.log(getDifference(5, 3)); // Output: 2
console.log(getDifference(-5, 3)); // Output: 8

console.log(negativeCount([1, -2, 3, -4, 5])); // Output: 2
console.log(negativeCount([0, 1, 2, 3, 4])); // Output: 0

console.log(ltCount("hello", "l")); // Output: 2
console.log(ltCount("hello", "x")); // Output: 0

console.log(countPoints(["3:0", "2:2", "1:3"])); // Output: 7
console.log(countPoints(["1:0", "2:0", "3:0"])); // Output: 9
