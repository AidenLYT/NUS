//The following function, bubblesort_array, is an implementation of the Bubble Sort algorithm to sort an array of numbers into ascending order:
function bubblesort_array(A) {
  const len = array_length(A);
  for (let i = len - 1; i >= 1; i = i - 1) {
    for (let j = 0; j < i; j = j + 1) { if (A[j] > A[j + 1]) {
      const temp = A[j]; A[j] = A[j + 1]; A[j + 1] = temp;
    } 
  }
}
//(a) What is the order of growth of its runtime for an input array of n elements?

//(b) Write the function, bubblesort_list, that takes as argument a list of numbers and uses the bubble sort algorithm to sort the list into ascending order. 
//Your function must not create any new pair or array, and must not use the function set_tail. 
//Its runtime must have the same order of growth as that of bubblesort_array.
function bubblesort_list(L) { 
   //???
}
//Example use:
const LL = list(3, 5, 2, 4, 1); bubblesort_list(LL);
LL; // should show [1, [2, [3, [4, [5, null]]]]]

function bubblesort_list(L) {
    const len = length(L);
    for (let i = len - 1; i >= 1; i = i - 1) {
        let A = L; 
        for (let j = 0; j < i; j = j + 1) {
            if (head(A) > head(tail(A))) {
                const temp = head(A);
                set_head(A, head(tail(A)));
                set_head(tail(A), temp);
            } 
            A = tail(A);
        }     
    }
    return L;
}

const LL = list(3, 5, 2, 4, 1);
bubblesort_list(LL);
LL;

  
  

//Consider the cc (coin change) function presented in Lecture L3:
function cc(amount, kinds_of_coins) { 
  return amount === 0
        ? 1
        : amount < 0 || kinds_of_coins === 0 
            ? 0
            : cc(amount, kinds_of_coins - 1)
              +
              cc(amount - first_denomination(kinds_of_coins), kinds_of_coins);
}
  
function first_denomination(kinds_of_coins) {
      return  kinds_of_coins === 1 ? 5: 
              kinds_of_coins === 2 ? 10 : 
              kinds_of_coins === 3 ? 20 : 
              kinds_of_coins === 4 ? 50 : 
              kinds_of_coins === 5 ? 100 : 0;
}
  
// The memoized version.
const mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ?   5 :
           kinds_of_coins === 2 ?  10 :
           kinds_of_coins === 3 ?  20 :
           kinds_of_coins === 4 ?  50 :
           kinds_of_coins === 5 ? 100 : 0;
}

// n is the amount in cents, and k is the number of denominations.
function mcc(n, k) {
    if (n === 0){
        return 1;
    } else if (n < 0 || k === 0){
        return 0;
    } else if (read(n, k) === undefined) {
        write(n, k, mcc(n, k - 1) + mcc(n - first_denomination(k), k));
        return mcc(n, k - 1) + mcc(n - first_denomination(k), k);
    } else {
        return read(n, k);
    }
    
}

mcc(365, 5);  // Expected result: 1730
  
//What are the orders of growth in time and space of the memoized version?
