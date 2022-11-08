// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


////////////////////////////////////////////////////////////
// Question 1A
////////////////////////////////////////////////////////////

function is_nucleobase(s) {

    // WRITE HERE.
    return (s === "A" || s === "C" || s === "G" || s === "T");

}



////////////////////////////////////////////////////////////
// Question 1B
////////////////////////////////////////////////////////////

function is_dna_strand(xs) {

    // WRITE HERE.
    return is_null(xs)
        ? true
        : (!is_nucleobase(head(xs)))
            ? false
            : is_dna_strand(tail(xs)); 
}



////////////////////////////////////////////////////////////
// Question 1C
////////////////////////////////////////////////////////////

function combine(xss) {

    // WRITE HERE.
    return is_null(xss)
        ? null
        : append(head(xss), combine(tail(xss)));
}



////////////////////////////////////////////////////////////
// Question 1D
////////////////////////////////////////////////////////////

function oxoguanine_repair(xs) {

    // WRITE HERE.
    if (is_null(xs)){
        return null;
    } else if (is_nucleobase(head(xs))){
        const adding = list(head(xs));
        return append(adding, oxoguanine_repair(tail(xs)));
    } else if (head(xs) === "8") {
        const repaired = list("G");
        return append(repaired, oxoguanine_repair(tail(xs)));
    }
}



////////////////////////////////////////////////////////////
// Question 1E
////////////////////////////////////////////////////////////

function find_gene_start(xs) {

    // WRITE HERE.
    if (is_null(xs)){
        return null;
    } else if (length(xs) < 3){
        return null;
    } else if (list_ref(xs, 0) === "A" && list_ref(xs, 1)
            === "T" && list_ref(xs, 2) === "G"){
        return list(tail(tail(tail(xs))));
    } else {
        return find_gene_start(remove(list_ref(xs, 0), xs)); 
    }
}



////////////////////////////////////////////////////////////
// Question 1F
////////////////////////////////////////////////////////////

function find_gene_end(xs) {
    // WRITE HERE.
    function helper(xs, noref){
        if (is_null(xs)){
            return null;
        } else if (length(xs) < 3){
            return null;
        } else if (noref > length(xs) - 2){
            return null;
        } else if (list_ref(xs, noref) === "T" && list_ref(xs, noref + 1)
                === "A" && list_ref(xs, noref + 2) === "G"){
            function adding(xs, addref){
                return addref < 0
                    ? null
                    : pair(list_ref(xs, addref), adding(xs, addref - 1));
            }
            if (noref === 0){
                return list(null);
            } else {
                return list(reverse(adding(xs, noref - 1))); 
            }
        } else if (list_ref(xs, noref) === "T" && list_ref(xs, noref + 1)
                === "A" && list_ref(xs, noref + 2) === "A"){
            function adding(xs, addref){
                return addref < 0
                    ? null
                    : pair(list_ref(xs, addref), adding(xs, addref - 1));
            }
            if (noref === 0){
                return list(null);
            } else {
                return list(reverse(adding(xs, noref - 1))); 
            }
        } else if (list_ref(xs, noref) === "T" && list_ref(xs, noref + 1)
                === "G" && list_ref(xs, noref + 2) === "A"){
            function adding(xs, addref){
                return addref < 0
                    ? null
                    : pair(list_ref(xs, addref), adding(xs, addref - 1));
            }
            if (noref === 0){
                return list(null);
            } else {
                return list(reverse(adding(xs, noref - 1))); 
            }
        } else { 
            return helper(xs, noref + 1);
        }
    }
    return helper(xs, 0);
}



////////////////////////////////////////////////////////////
// Question 1G
////////////////////////////////////////////////////////////

function all_genes(xs) {

    // WRITE HERE.
    let gene_arr = [];
    function gene_finder(xs, arr_pos){
        if (is_null(find_gene_start(xs))){
            return null; 
        } else if (is_null(find_gene_end(head(find_gene_start(xs))))){ 
            return null;
        } else {
            gene_arr[arr_pos] = find_gene_end(head(find_gene_start(xs)));
            return gene_finder(head(find_gene_start(xs)), arr_pos + 1);
        }
    }
    gene_finder(xs, 0);
    function list_gen(arr, pos){
        if (!is_list(gene_arr[0])){
            return null;
        } else if (pos === array_length(arr)){
            return null;
        } else {
            return pair(arr[pos][0], list_gen(arr, pos + 1)); 
        }
    }
    return list_gen(gene_arr, 0);
}


////////////////////////////////////////////////////////////
// Question 2A
////////////////////////////////////////////////////////////

function all_different(nums) {

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
    
    if (length(nums) <= 1){
        return true; 
    } else {
        const arranged = quicksort(nums);
        function checker(lst, refno){
            return refno > length(lst) - 2
                ? true
                : list_ref(lst, refno) === list_ref(lst, refno + 1)
                    ? false
                    : checker(lst, refno + 1);
        } 
        return checker(arranged, 0);
    }
}



////////////////////////////////////////////////////////////
// Question 2B
////////////////////////////////////////////////////////////

function is_valid_toto_set(nums, n, min, max) {

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
    const arranged = quicksort(nums); 
    
    if (list_ref(arranged, 0) < min){
        return false;
    } else if (list_ref(arranged, length(arranged) - 1) > max){
        return false; 
    } else if (length(nums) !== n){
        return false;
    } else {
        return all_different(nums);
    }
}



////////////////////////////////////////////////////////////
// Question 2C
////////////////////////////////////////////////////////////

function num_of_matches(numsA, numsB) {

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
    const A = quicksort(numsA);
    const B = quicksort(numsB); 
    let match = 0;
    function helper(A, B){
        if (is_null(A) || is_null(B)){
            return match;
        } else if (head(A) === head(B)){
            match = match + 1;
            return helper(tail(A), tail(B));
        } else if (head(A) > head(B)){
            return helper(A, tail(B));
        } else {
            return helper(tail(A), B);
        }
    }
    return helper(A, B);
}



////////////////////////////////////////////////////////////
// Question 2D
////////////////////////////////////////////////////////////

function check_winning_group(bet_nums, draw_nums, extra_num) {

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
    const bet = quicksort(bet_nums);
    const draw = quicksort(draw_nums);
    
    const matching = num_of_matches(bet, draw);
    function checker(bet, extra){
        return is_null(bet)
            ? false
            : head(bet) === extra
                ? true
                : checker(tail(bet), extra);
    }
    if (matching === length(bet)){
        return 1; 
    } else if (matching === length(bet) - 1){
        return checker(bet, extra_num)
            ? 2
            : 3;
    } else if (matching === length(bet) - 2){
        return checker(bet, extra_num)
            ? 4
            : 5;
    } else {
        return 0;
    }
}



////////////////////////////////////////////////////////////
// Question 3A
////////////////////////////////////////////////////////////

function evaluate_BAE_tree(bae_tree) {

    // WRITE HERE.
    if (is_number(bae_tree)) { 
        return bae_tree;
    } else {
        const left = evaluate_BAE_tree(head(bae_tree));
        const right = evaluate_BAE_tree(head(tail(tail(bae_tree)))); 
        const op = head(tail(bae_tree));
        if (op === "+"){
            return left + right;
        }
        if (op === "-"){
            return left - right;
        }
        if (op === "*"){
            return left * right;
        }
        if (op === "/"){
            return left / right;
        }
    }
}



////////////////////////////////////////////////////////////
// Question 3B
////////////////////////////////////////////////////////////

function build_BAE_tree(bae_list) {

    // WRITE HERE.
}



////////////////////////////////////////////////////////////
// Question 3C
////////////////////////////////////////////////////////////

function evaluate_BAE(bae_list) {

    // WRITE HERE.

}



////////////////////////////////////////////////////////////
// Question 3D
////////////////////////////////////////////////////////////

function check_parentheses(paren_list) {

    // WRITE HERE.
    let open = 0;
    let close = 0;
    function checker(paren_list){
        for (let i = 0; i < length(paren_list); i = i + 1){
            if (list_ref(paren_list, i) === "("){
                open = open + 1;
            }
            if (list_ref(paren_list, i) === ")"){
                close = close + 1;
            }
        }
    }
    checker(paren_list);
    
    if (length(paren_list) % 2 !== 0){
        return false;
    } else if (is_null(paren_list)){
        return true;
    } else {
        function eliminator(lst){
            if (is_null(lst)){
                return true;
            }
             else if (head(lst) === ")"){
                return false;
            } else if (open !== close){
                return false;
            } else {
                const r1 = remove("(", lst);
                const r2 = remove(")", r1);
                return eliminator(r2);
            }
        }
        return eliminator(paren_list);
    }
}
