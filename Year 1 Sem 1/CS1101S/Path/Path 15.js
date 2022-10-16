function ones_stream() {
    return pair(1, ones_stream);
}
//This function returns a stream when applied to no arguments

function make_prompt_stream() {
    return pair(prompt("Enter next stream element: "), make_prompt_stream);
}

const prompt_stream = make_prompt_stream();
//A window pops up and after a button is pressed, prompt_stream refers to a stream 

function make_prompt_stream() {
    return pair(prompt("Enter next stream element: "), make_prompt_stream);
}

const prompt_stream = make_prompt_stream();

stream_ref(prompt_stream, 2);
//The program successively pops up three windows and returns the last entered string

function make_prompt_stream() {
    return pair(prompt("Enter next stream element: "), make_prompt_stream);
}

const prompt_stream = make_prompt_stream();

is_stream(prompt_stream);
//The program keeps popping up new window and never return a value

//Can we write a function is_infinite_stream that returns true if its argument stream is an infinite stream 
//and false if its argument stream is a finite stream? NO.


//Write the function n_of_n_stream() that returns an infinite stream that contains 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, …
function n_of_n_stream() {
    function helper(a, b, n){
        return (n === b)
            ? helper(a + 1, b + 1, 0)
            : pair(a, () => helper(a, b, n + 1));
    }
    return helper(1, 1, 0);
}

//Write a function shorten_stream(s, k) that takes as arguments a stream s and a non-negative integer number k, 
//and returns a stream that contains the first k elements of s.
//If the length of s is less than or equal to k, then the result stream will just behave like s.
//Note that s may be an infinite stream.
function shorten_stream(s, k) {
    if (k === 0){
        return null;
    } else if (is_null(s)) {
        return s;
    } else {
        return pair(head(s), 
        () => shorten_stream(stream_tail(s), k - 1));
    }
}
