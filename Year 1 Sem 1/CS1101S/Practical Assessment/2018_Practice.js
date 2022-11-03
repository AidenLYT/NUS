// QUESTION 1

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================



//===============================================================
// TASK 1A
//===============================================================
function make_big_int_from_number(num) {

    // WRITE HERE.
    function helper(digit){
        return digit === 0
            ? null
            : pair(digit % 10, helper(math_floor(digit / 10)));
    }
    
    if (num === 0){
        return list(0);
    } else { 
        return helper(num);
    }
}


// TASK 1A TESTS
assert("1A_1", () => make_big_int_from_number(0),
    list(0), []);
assert("1A_2", () => make_big_int_from_number(5),
    list(5), []);
assert("1A_3", () => make_big_int_from_number(10),
    list(0,1), []);
assert("1A_4", () => make_big_int_from_number(1234),
    list(4,3,2,1), []);
assert("1A_5", () => make_big_int_from_number(9876543210),
    list(0,1,2,3,4,5,6,7,8,9), []);


//===============================================================
// TASK 1B
//===============================================================
function big_int_to_string(bint) {

    // WRITE HERE.
    function number(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + number(X, ref - 1, multi - 1);
    }
    retunr number(bint, length(bint) - 1, length(bint) - 1); 
}


// TASK 1B TESTS
assert("1B_1", () => big_int_to_string(list(0)),
    "0", []);
assert("1B_2", () => big_int_to_string(list(5)),
    "5", []);
assert("1B_3", () => big_int_to_string(list(0,1)),
    "10", []);
assert("1B_4", () => big_int_to_string(list(4,3,2,1)),
    "1234", []);
assert("1B_5", () => big_int_to_string(list(0,1,2,3,4,5,6,7,8,9)),
    "9876543210", []);
assert("1B_6", () => big_int_to_string(
    list(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9)),
    "9876543210987654321", []);


//===============================================================
// TASK 1C
//===============================================================
function big_int_add(bintX, bintY) {
    // You may modify the given partial implementation,
    // or remove it and write your own.

    // function add(x, y, carry) {
    //     if (is_null(x) && is_null(y)) {
    //         return (carry === 0) ? null : pair(carry, null);
    //     } else {
    //         // WRITE HERE.
            
    //     }
    // }
    // return add(bintX, bintY, 0);
    function first(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + first(X, ref - 1, multi - 1);
    }
    
    function second(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + second(X, ref - 1, multi - 1);
    }
    return make_big_int_from_number(
            first(bintX, length(bintX) - 1, length(bintX) - 1) 
            + second(bintY, length(bintY) - 1, length(bintY) - 1));
}


// TASK 1C TESTS
assert("1C_1", () => big_int_add(list(0), list(3,2,1)),
    list(3,2,1), ["make_big_int_from_number"]);
assert("1C_2", () => big_int_add(list(5,6,7), list(0)),
    list(5,6,7), ["make_big_int_from_number"]);
assert("1C_3", () => big_int_add(list(4,3,2,1), list(5,4,3,2)),
    list(9,7,5,3), ["make_big_int_from_number"]);
assert("1C_4", () => big_int_add(list(7,8,9), list(5,6)),
    list(2,5,0,1), ["make_big_int_from_number"]);
assert("1C_5", () => big_int_add(list(5,6), list(7,8,9)),
    list(2,5,0,1), ["make_big_int_from_number"]);
assert("1C_6", () => big_int_add(
    list(9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9), list(5)),
    list(4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),
    ["make_big_int_from_number"]);


//===============================================================
// TASK 1D
//===============================================================
function big_int_mult_by_digit(bint, digit) {

    // WRITE HERE.
    function first(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + first(X, ref - 1, multi - 1);
    }
    
    return make_big_int_from_number(
            first(bint, length(bint) - 1, length(bint) - 1) * digit);
}


// TASK 1D TESTS
assert("1D_1", () => big_int_mult_by_digit(list(0), 5),
    list(0), ["make_big_int_from_number", "big_int_add"]);
assert("1D_2", () => big_int_mult_by_digit(list(7,4,3), 0),
    list(0), ["make_big_int_from_number", "big_int_add"]);
assert("1D_3", () => big_int_mult_by_digit(list(7,4,3), 5),
    list(5,3,7,1), ["make_big_int_from_number", "big_int_add"]);
assert("1D_4", () => big_int_mult_by_digit(
    list(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9), 3),
    list(3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,2),
    ["make_big_int_from_number", "big_int_add"]);


//===============================================================
// TASK 1E
//===============================================================
function big_int_mult_by_10_pow_n(bint, n) {

    // WRITE HERE.
    function first(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + first(X, ref - 1, multi - 1);
    }
    
    return make_big_int_from_number(
            first(bint, length(bint) - 1, length(bint) - 1) * math_pow(10, n));
}


// TASK 1E TESTS
assert("1E_1", () => big_int_mult_by_10_pow_n(list(0), 5),
    list(0),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_2", () => big_int_mult_by_10_pow_n(list(7,4,3), 0),
    list(7,4,3),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_3", () => big_int_mult_by_10_pow_n(list(7,4,3), 3),
    list(0,0,0,7,4,3),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);
assert("1E_4", () => big_int_mult_by_10_pow_n(list(5,8,3,1), 20),
    list(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,8,3,1),
    ["make_big_int_from_number", "big_int_add", "big_int_mult_by_digit"]);


//===============================================================
// TASK 1F
//===============================================================
function big_int_mult(bintX, bintY) {

    // WRITE HERE.
    function first(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + first(X, ref - 1, multi - 1);
    }
    
    function second(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + second(X, ref - 1, multi - 1);
    }
    return make_big_int_from_number(
            first(bintX, length(bintX) - 1, length(bintX) - 1) 
            * second(bintY, length(bintY) - 1, length(bintY) - 1));
}


// TASK 1F TESTS
assert("1F_1", () => big_int_mult(list(0), list(0)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_2", () => big_int_mult(list(0), list(3,2,1)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_3", () => big_int_mult(list(3,2,1), list(0)),
    list(0),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_4", () => big_int_mult(list(3,2,1), list(1)),
    list(3,2,1),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_5", () => big_int_mult(list(9), list(6)),
    list(4,5),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_6", () => big_int_mult(list(7,8,9), list(5,6)),
    list(5,5,1,4,6),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
assert("1F_7", () => big_int_mult(
    list(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1), list(7,8,9)),
    list(7,8,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,9),
    ["make_big_int_from_number", "big_int_add",
    "big_int_mult_by_digit", "big_int_mult_by_10_pow_n"]);
//==============================================================


// QUESTION 2

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================



//===============================================================
// DO NOT REMOVE OR MODIFY THE FOLLOWING FUNCTIONS.
// You may call them in your functions.
//===============================================================
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}
//---------------------------------------------------------------
function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}
//---------------------------------------------------------------
function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
}
//---------------------------------------------------------------
function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}
//---------------------------------------------------------------
function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}
//---------------------------------------------------------------
// Sorts the array of numbers in ascending order.
function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
}
//---------------------------------------------------------------
function digits_to_string(digits) {
    const len = array_length(digits);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(digits[i]);
    }
    return str;
}
// const D = [8, 3, 9, 2, 8, 1];
// digits_to_string(D);  // returns "839281"
//===============================================================
// DO NOT REMOVE OR MODIFY THE ABOVE FUNCTIONS.
//===============================================================



//===============================================================
// TASK 2A
//===============================================================
function build_largest_int(digits) {

    // WRITE HERE.
    function partition(xs, p) {
        return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
                
    }
    
    function quicksort(xs) {
        return is_null(xs)
            ? null
            : append(quicksort(head(partition(tail(xs), head(xs)))), 
            pair(head(xs), quicksort(tail(partition(tail(xs), head(xs))))));
    }
    
    function number(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + number(X, ref - 1, multi - 1);
    }
    
    const num = quicksort(array_to_list(digits));
    return stringify(number(num, length(num) - 1, length(num) - 1));
}


// TASK 2A TESTS
assert("2A_1", () => build_largest_int([1]),
    "1", []);
assert("2A_2", () => build_largest_int([1,2,3,4,5]),
    "54321", []);
assert("2A_3", () => build_largest_int([9,8,7]),
    "987", []);
assert("2A_4", () => build_largest_int([4,1,9,1,4,9,1]),
    "9944111", []);
assert("2A_5", () => build_largest_int([5,5,5,5,5,5,7,5,5,5]),
    "7555555555", []);
assert("2A_6", () => build_largest_int([5,5,5,5,5,5,5,5,5,5]),
    "5555555555", []);


//===============================================================
// TASK 2B
//===============================================================
function build_2nd_largest_int(digits) {

    // WRITE HERE.
    function partition(xs, p) {
        return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
    }
        
    function quicksort(xs) {
        return is_null(xs)
            ? null
            : append(quicksort(head(partition(tail(xs), head(xs)))), 
            pair(head(xs), quicksort(tail(partition(tail(xs), head(xs))))));
    }
        
    let inter = reverse(quicksort(array_to_list(digits)));
    let newarray = [];
        
    for (let i = 0; i < length(inter); i = i + 1){
        newarray[i] = list_ref(inter, i); 
    }
    
    let len = array_length(newarray);
    let lastplc = len - 1;
    let seclastplc = len - 2;
    
    function swapping(A, last, sec){
        if (len <= 1){
            return stringify(newarray[0]); 
        } else if (lastplc > 0 && seclastplc > 0) {
            if (newarray[lastplc] === newarray[seclastplc]){
                lastplc = lastplc - 1;
                seclastplc = seclastplc - 1;
                return swapping(A, last, sec);
            } else { 
                const temp = newarray[lastplc];
                newarray[lastplc] = newarray[seclastplc];
                newarray[seclastplc] = temp;
            }
        }
    }
    
    function number(X, ref, multi){
        return ref < 0
            ? 0
            : (math_pow(10, multi) * list_ref(X, ref)) 
                + number(X, ref - 1, multi - 1);
    }
    
    swapping(newarray, lastplc, seclastplc);
    const num = reverse(array_to_list(newarray));
    return stringify(number(num, length(num) - 1, length(num) - 1));
}


// TASK 2B TESTS
assert("2B_1", () => build_2nd_largest_int([1]),
    "1", ["build_largest_int"]);
assert("2B_2", () => build_2nd_largest_int([1,2,3,4,5]),
    "54312", ["build_largest_int"]);
assert("2B_3", () => build_2nd_largest_int([9,8,7]),
    "978", ["build_largest_int"]);
assert("2B_4", () => build_2nd_largest_int([4,1,9,1,4,9,1]),
    "9941411", ["build_largest_int"]);
assert("2B_5", () => build_2nd_largest_int([5,5,5,5,5,5,7,5,5,5]),
    "5755555555", ["build_largest_int"]);
assert("2B_6", () => build_2nd_largest_int([5,5,5,5,5,5,5,5,5,5]),
    "5555555555", ["build_largest_int"]);


//===============================================================
// TASK 2C
//===============================================================
function build_nth_largest_int(digits, n) {

    // WRITE HERE.
//     function partition(xs, p) {
//         return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
//     }
        
//     function quicksort(xs) {
//         return is_null(xs)
//             ? null
//             : append(quicksort(head(partition(tail(xs), head(xs)))), 
//             pair(head(xs), quicksort(tail(partition(tail(xs), head(xs))))));
//     }
        
//     let inter = reverse(quicksort(array_to_list(digits)));
//     let newarray = [];
        
//     for (let i = 0; i < length(inter); i = i + 1){
//         newarray[i] = list_ref(inter, i); 
//     }
    
//     let len = array_length(newarray);
//     let lastplc = len - 1;
//     let seclastplc = len - 2;
    
//     function swapping(A, last, sec){
//         if (len <= 1){
//             return stringify(newarray[0]); 
//         } else if (lastplc > 0 && seclastplc > 0) {
//             if (newarray[lastplc] === newarray[seclastplc]){
//                 lastplc = lastplc - 1;
//                 seclastplc = seclastplc - 1;
//                 return swapping(A, last, sec);
//             } else { 
//                 const temp = newarray[lastplc];
//                 newarray[lastplc] = newarray[seclastplc];
//                 newarray[seclastplc] = temp;
//             }
//         }
//     }
    
//     function number(X, ref, multi){
//         return ref < 0
//             ? 0
//             : (math_pow(10, multi) * list_ref(X, ref)) 
//                 + number(X, ref - 1, multi - 1);
//     }
    
//     swapping(newarray, lastplc, seclastplc);
//     const num = reverse(array_to_list(newarray));
//     return stringify(number(num, length(num) - 1, length(num) - 1));
}


// TASK 2C TESTS
assert("2C_1", () => build_nth_largest_int([1,2,4,3], 1),
    "4321", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_2", () => build_nth_largest_int([3,1,4,2], 2),
    "4312", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_3", () => build_nth_largest_int([3,1,4,2], 10),
    "3214", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_4", () => build_nth_largest_int([1,3,4,2], 18),
    "2134", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_5", () => build_nth_largest_int([3,1,4,2], 24),
    "1234", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_6", () => build_nth_largest_int([4,3,2,1], 28),
    "1234", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_7", () => build_nth_largest_int([5,3,7], 1),
    "753", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_8", () => build_nth_largest_int([3,5,7], 4),
    "537", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_9", () => build_nth_largest_int([5,3,7], 6),
    "357", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_10", () => build_nth_largest_int([5,3,7], 10),
    "357", ["build_largest_int", "build_2nd_largest_int"]);
assert("2C_11", () => build_nth_largest_int([5], 10),
    "5", ["build_largest_int", "build_2nd_largest_int"]);


//===============================================================
