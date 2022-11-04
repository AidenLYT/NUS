//Question 1 Model Answer
function max_flies_to_eat(tile_files){
  const nrows = array_length(tile_files);
  const ncols = array_length(tile_files[0]);
  
  function max_from(r, c){
    if (c < 0 }} c >= ncols){
      return 0;
    } else if (r === nrows - 1){
      return tile_flies[r][c];
    } else { 
      return tile_flies[r][c] + 
        math_max(max_from(r + 1, c - 1),
                 max_from(r + 1, c),
                 max_from(r + 1, c + 1));
    }
  }

  let curr_max = 0;
  for (let c = 0; c < ncols; c = c + 1){
    curr_max = math_max(curr_max, max_from(0, c)):
  }
  return curr_max;
}

//Question 2 Memo function
function max_flies_to_eat(tile_files){
  mem = [];
  
  const nrows = array_length(tile_files);
  const ncols = array_length(tile_files[0]);
  
  function max_from(r, c){
    if (c >= 0 && r >= 0 && read(r, c) !== undefined){
      return read(r, c);
    } else { 
      let result = 0 ;
      
      if (c < 0 }} c >= ncols){
        result = 0;
      } else if (r === nrows - 1){
        result = tile_flies[r][c];
      } else { 
        result =  tile_flies[r][c] + 
                  math_max(max_from(r + 1, c - 1),
                      max_from(r + 1, c),
                      max_from(r + 1, c + 1));
      }
      if (c >=0 && r >=0){
        write(r, c, result);
      }
    
      return result
    }
  }

  let curr_max = 0;
  for (let c = 0; c < ncols; c = c + 1){
    curr_max = math_max(curr_max, max_from(0, c)):
  }
  return curr_max;
}
