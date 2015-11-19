/**
 * A number is called a circular prime if it is prime and all of its rotations are primes.
 *
 * For example the number 197 has two rotations: 971, and 719. Both of them are prime.
 *
 * There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
 *
 * How many circular primes are there below N?
 *
 * 1 <= N <= 1000000
 *
 * Test Cases
 *
 * There are 0 circular primes below 1.
 * There are 4 circular primes below 10.
 * There are 13 circular primes below 100.
 * There are 25 circular primes below 1000.
 * There are 33 circular primes below 10000.
 * There are 43 circular primes below 100000.
 * There are 55 circular primes below 1000000.
 */

function isPrime(c) {
    if (c === 1) {
        return false;
    }

    for (var i = 2; i < c; ++i) {
        if (c % i === 0) {
            return false;
        }
    }
    return true;
}

var map = {};

function rotations(n) {
    if (map[n]) {
        return map[n];
    }
    var str = n.toString()
      , rot = []
      , digits = str.split("").map(function (c) {
            return Number(c);
        })
      ;

    if (digits.length === 1) {
        return [n];
    }

    function rotate(k) {
        return Number(digits.slice(k).concat(digits.slice(0, k)).join(""));
    }

    for (i = 0; i < digits.length; ++i) {
        rot.push(rotate(i));
    }

    return map[n] = rot;
}

function isCircularPrime(n) {
    var rot = rotations(n)
      , i = 0
      , c = null
      ;

    for (; i < rot.length; ++i) {
        c = rot[i];
        if (!isPrime(c)) {
            return false;
        }
    }

    return true;
}

function Solution(n) {
    var count = 0;
    for (var i = 1; i <= n; ++i) {
        if (isCircularPrime(i)) {
            ++count;
        }
    }
    return count;
}

var tests = [
    1
  , 10
  , 100
  , 1000
  , 10000
  , 100000
  , 1000000
  , 10000000
];

tests.forEach(function (c) {
    console.log("There are " + Solution(c) + " circular primes below " + c);
});
