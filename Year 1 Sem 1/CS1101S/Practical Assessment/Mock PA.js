//Question 1A
function is_pa_word(s) {
    // your solution goes here
    function helper(s, firstposition, secondposition){
        if (char_at(s, 8) === undefined){
            return false; 
        } else {
            if (char_at(s, secondposition) === undefined){
                return true;
            } else {
                return char_at(s, firstposition) === char_at(s, secondposition)
                    ? false
                    : helper(s, firstposition +1, secondposition + 1); 
            }
        }
    }
    return helper(s, 0, 1);
}

//Question 1B
function count_matches(char, pos) {
    // your solution goes here
    const words = filter(x => char_at(x, pos) === char ,pa_words);
    return length(words);
}

//Question 1C


//Question 1D
function solve(n, constraints) {
    // your solution goes here
    let wording = pa_words;
    
    function filtering(char, pos, words){
        const filteredwords = filter(x => char_at(x, pos) === char, words);
        return wording = filteredwords;
    }
    
    function helper(n, constraints){
        if (is_null(constraints)){
            const final = filter(x => string_length(x) === n, wording); 
            return final; 
        } else { 
            filtering(tail(head(constraints)), head(head(constraints)), wording);
            return helper(n, remove(list_ref(constraints, 0), constraints));
        }
    }
    return helper(n, constraints);
}


//Question 3
function alt_column_matrix(R, C) {
    const M = [];
    let adding = 1; 
    // WRITE YOUR SOLUTION HERE.
    for (let x = 0; x < C; x = x + 1){
        M[x] = [];
        for (let y = 0; y < R; y = y + 1){
            M[x][y] = adding;
            adding = adding + 1;
        }
    }
    M;
    for (let i = 1; i < C; i = i + 2){
        for (let j = 0; j < R / 2; j = j + 1){
            let temp = M[i][j]; 
            M[i][j] = M[i][R - j - 1];
            M[i][R - j - 1] = temp; 
        }
    }
    M; 
    let newarray =[];
    for (let q = 0; q < R; q = q + 1){
        newarray[q] = [];
        for (let r = 0; r < C; r = r + 1){
            newarray[q][r] = M[r][q];
        }
    }
    return newarray;
}

alt_column_matrix(1, 6);
