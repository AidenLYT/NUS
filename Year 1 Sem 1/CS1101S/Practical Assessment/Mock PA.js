


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
