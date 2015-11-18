/**
 * Devise a function that takes an input 'n' (integer) and returns a string that is the
 * decimal representation of the number grouped by commas after every 3 digits. Do not
 * solve the task using a built-in formatting function that can accomplish the whole
 * task on its own.
 *
 * Assume: 0 <= n < 1000000000
 *
 * 1                    -> "1"
 * 10                   -> "10"
 * 100                  -> "100"
 * 1000                 -> "1,000"
 * 10000                -> "10,000"
 * 100000               -> "100,000"
 * 1000000              -> "1,000,000"
 * 35235235             -> "35,235,235"
 * 999999999            -> "999,999,999"
 */

const GROUP_LENGTH = 3;

function Solution(n) {
    n = n.toString();
    var groups = [];
    while (n) {
        if (n.length < GROUP_LENGTH) {
            groups.push(n);
            break;
        }
        groups.push(n.substr(-GROUP_LENGTH));
        n = n.substr(0, n.length - GROUP_LENGTH);
    }
    return groups.reverse().join(",");
}

console.log(Solution(1));
console.log(Solution(10));
console.log(Solution(100));
console.log(Solution(1000));
console.log(Solution(10000));
console.log(Solution(100000));
console.log(Solution(1000000));
console.log(Solution(35235235));
console.log(Solution(999999999));
