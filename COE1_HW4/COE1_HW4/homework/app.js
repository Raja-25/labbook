// 1. Reverse an integer number
function reverseNumber(num) {
    const reversedNum = parseInt(num.toString().split('').reverse().join(''), 10);
    return num < 0 ? -reversedNum : reversedNum;
  }
  
  // 2. Iterate over array and execute function on each element
  function forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
      func(arr[i]);
    }
  }
  
  // 3. Transform array based on function
  function map(arr, func) {
    const result = [];
    forEach(arr, function(el) {
      result.push(func(el));
    });
    return result;
  }
  
  // 4. Return filtered array based on function
  function filter(arr, func) {
    const result = [];
    forEach(arr, function(el) {
      if (func(el)) {
        result.push(el);
      }
    });
    return result;
  }
  
  // 5. Return array of names of people over 18 and their favorite fruit is apple
  function getAdultAppleLovers(data) {
    return map(filter(data, function(person) {
      return person.age > 18 && person.favoriteFruit === 'apple';
    }), function(person) {
      return person.name;
    });
  }
  
  // 6. Return array of keys of an object
  function getKeys(obj) {
    const keys = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }
  
  // 7. Return array of values of an object
  function getValues(obj) {
    const values = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        values.push(obj[key]);
      }
    }
    return values;
  }
  
  // Example usage
  console.log(reverseNumber(12345));
  console.log(reverseNumber(-56789));
  
  const array = [2, 5, 8];
  forEach(array, function(el) {
    console.log(el);
  });
  
  console.log(map(array, function(el) { return el + 3; }));
  console.log(map([1, 2, 3, 4, 5], function(el) { return el * 2; }));
  
  console.log(filter([2, 5, 1, 3, 8, 6], function(el) { return el > 3; }));
  console.log(filter([1, 4, 6, 7, 8, 10], function(el) { return el % 2 === 0; }));
  
  const data = [
    { name: 'Raja', age: 20, favoriteFruit: 'Watermelon' },
    { name: 'Sevitha', age: 22, favoriteFruit: 'apple' },
    { name: 'Rani', age: 45, favoriteFruit: 'apple' },
    { name: 'Vasu', age: 50, favoriteFruit: 'apple' },
  ];
  console.log(getAdultAppleLovers(data));
  
  console.log(getKeys({ keyOne: 1, keyTwo: 2, keyThree: 3 }));
  console.log(getValues({ keyOne: 1, keyTwo: 2, keyThree: 3 }));
  