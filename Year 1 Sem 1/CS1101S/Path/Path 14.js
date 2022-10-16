//What do we mean when we say that arrays are random access?
//Accessing any array element takes O(1) time

//Which one of the following statements about linear search (or sequential search) in arrays is correct?
//Linear search works on unsorted arrays

//Which one of the following statements about binary search in arrays is correct?
//In each step, binary search halves the remaining portion of the array that needs to be searched

function insertion_sort(A) {
    const len = array_length(A);

    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) {
            swap(A, j, j + 1);
            j = j - 1;
        }
    }
}

function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}
//In each run of the inner loop, insertion sort may swap two neighboring elements

function selection_sort(A) {
    const len = array_length(A);

    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
}

function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
            min_pos = j;
        }
    }
    return min_pos;
}

function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}
//In each iteration of the for loop in function selection_sort, two elements may be swapped

//Which one of the following statements about merge sort on arrays is not correct?
//Merge sort runs in Θ(n) time if the array is already sorted

//Which one of the following statements about memoization is correct?
//Memoization avoids repeated calculation of the result of a function applied to the same argument


//Write the function search_cond that takes as arguments an array A and a predicate function cond, 
//and returns the index i of the first element A[i] of A such that cond(A[i]) is true, 
//otherwise, if no such element exists in A, the function returns -1.

const A = [1,2,3,4,5];
search_cond(A, x => x % 2 === 0);
// should return 1, which is the position of the first even element 2.
search_cond(A, x => x > 9);
// should return -1.

function search_cond(A, cond) {
    const len = array_length(A);
    let i = 0;
    
    if (len === 0){
        return i = -1; 
    } else {
        while (i < len && !cond(A[i])){
            i = i + 1;
            if (i === len){
                return i = -1;
            }
        }
    }
    return i;
}

//Write the function insert that takes as arguments an array A, 
//a non-negative integer pos and a value x, and inserts x into array A at position pos. 
//All the elements in A after pos should be shifted to the right. For example,

const A = [1, 2, 3, 4];
insert(A, 2, 9);
A;  // should now be [1, 2, 9, 3, 4]

function insert(A, pos, x) {
    const len = array_length(A);
    let i = 0;
    
    function search(A, pos){
        while (i < len && A[i] !== pos){
            i = i + 1;
        }
        return i;
    }
    
    function put(A){
        if (len === 0){
            return A[i] = x;
        } else { 
            let pivot = A[i + 1];
            A[i + 1] = x;
            for (let k = i + 2; k <= len; k = k + 1){
                A[k] = pivot;
                pivot = pivot + 1;
            }
        }
    }
    search(A, pos);
    return put(A);
}

//Implement insertion sort using the provided insert and search_cond functions. 
//Your function should return a new array instead of destructively modify the input array.
function insertion_sort(A) {
    let B = [];
    const len = array_length(A);
    
    for (let i = 0; i < len; i = i + 1){
        let x = A[i];
        let cond = y => y > x;
        let pos = search_cond(B, cond);
        
        if (pos === -1){
            B[i] = x;
        } else {
            insert(B, pos, x);
        }
    }
    
    return B;
}
