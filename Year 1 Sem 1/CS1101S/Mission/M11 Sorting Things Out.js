// Task 1

function partition(xs, p) {
    // your answer here
    return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
            
}

// Test
const my_list = list(1, 2, 3, 4, 5, 6);
partition(my_list, 4);


// Task 2
function partition(xs, p) {
    // your answer from Task 1
    return pair(filter(x => x <= p, xs), filter(x => x > p, xs));
            
}

function quicksort(xs) {
    // your answer here
    return is_null(xs)
        ? null
        : append(quicksort(head(partition(tail(xs), head(xs)))), 
        pair(head(xs), quicksort(tail(partition(tail(xs), head(xs))))));
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);


//What is the order of growth in time for applying partition to a list of length n?
//Θ(n)

//What is the order of growth in time for applying quicksort to an already sorted list of length n?
//Θ(n^2)

//For lists of length n, the performance of quicksort may vary. 
//Let f(n) be the fastest running time of quicksort for any list with length n. What is the order of growth of the function f(n), using Θ notation?
//Θ(nlogn)
