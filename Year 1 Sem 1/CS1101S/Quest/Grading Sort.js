//Question 2
function graderVer1_quadratic(arr){ 
  function count_mismatches(value, rest){
    return accumulat(
      (term, acc) => term < value ? acc + 1 : acc, 
      0,
      rest);
  }
  function graderVer1_h(arr, sum)
    if (is_null(arr)){
      return sum;
    } else { 
      return graderVer_h(tail(arr), sum + count_mismatches(head(arr), tail(arr));
    }
 } 
 return graderVer1_h(arr, 0); 
}

function graderVer1(arr){
  function split_arr(arr){
    function split_arr_h(arr1, arr2, n){
      return n === 0
          ? pair(reverse(arr2), arr1)
          : split_arr_h(tail(arr1), pair(head(arr1), arr2), n - 1);
    }
    return split_arr_h(arr, null, math_floor(length(arr) / 2)); 
  }
  function merge_and_count(arr1, arr2){
    function merge_and_count_h(
    //inputs
    arr1, arr2, 
    //accumulators
    arr1_len, arr2_len, arr_result, count_result){
    //merge by constantly taking the smaller values and placing into arr_result
    //after everything is done, reverse arr_result
    //also keep track of number of mismatches between pieces in count_result
      if (is_null(arr1) && is_null(arr2)){
        return pair(reverse(arr_result), count_result);
      } else if (is_null(arr1)){
        return merger_and_count_h(
          arr1, tail(arr2),
          arr1_len, arr2_len - 1,
          pair(head(arr2), arr_result), count_result);
      } else if (is_null(arr2)) {
        return merge_and_count_h(
          tail(arr1), arr2, 
          arr1_len - 1, arr2_len
          pair(head(arr1), arr_result), count_result);
      } else if (head(arr1) <= head(arr2)){
        return merge_and_count_h(
          tail(arr1), arr2,
          arr1_len - 1, arr2_len, 
          pair(head(arr1), arr_result), count_result);
      } else {
        //In this case, we take from arr2
        //which means we have mismatched pairs between
        //this element and all the elements still in arr1
        //so we add count_result by size of arr1 
        return merge_and_count_h(
          arr1, tail(arr2),
          arr1_len, arr2_len - 1,
          pair(head(arr2), arr_result), count_result + arr1_len);
      }
    }
    return merge_and_count_h(
      arr1, arr2,
      length(arr1), length(arr2),
      null, 0); 
  }
  function graderVer1_h(arr){
    if (is_null(arr)){
      //Base case n = 0 
      return pair(arr, 0);
    } else if (is_null(tail(arr))){
      //Base case n = 1
      return pair(arr, 0);
    } else {
      //Split the array
      const splitted_arr = split_arr(arr);
      const first_half = head(splitted_arr);
      const second_half = tail(splitted_arr); 
      
      //Recurse on both halves
      const first_half_result = graderVer1_h(first_half);
      const second_half_result = graderVer1_h(second_half);
      const sorted_first_half = head(first_half_result);
      const first_half_count = tail(first_half_result);
      const sorted_second_half = head(second_half_result);
      const second_half_count = tail(second_half_result);
      
      //Merge halves together while counting mismatched pairs
      const between_halves_result = merge_and_count(sorted_first_half, sorted_second_half);
      const sorted_arr = head(between_halves_result);
      const between_count = tail(between_halves_result);
      const final_count = first_half_count + between_count + second_half_count;
      
      //Generate pair of output purposes
      return pair(sorted_arr, final_count);
    }
  }
  return tail(graderVer1_h(arr));
}

//Rationale
/*
#inv in (6, 4, 8, 2)
2 + 1 + 1 = 4
#inv in (5, 1, 7, 3)
2 + 0 + 1 = 3 

1. sort(6, 4, 8, 2) ===> (2, 4, 6, 8)
2. sort(5, 1, 7, 3) ===> (1, 3, 5, 7)
3. merge (2, 4, 6, 8) and (1, 3, 5, 7)
  -- 2 > 1 ===> output 1 and #inv: + 4 
   
   merge(2, 4, 6, 8) and (3, 5, 7)
  -- 2 < 3 ===> output 2 and #inv: +0
  
   merge(4, 6, 8) and (3, 5, 7)
  -- 4 > 3 ===> output 3 and #inv: + 3 
  ...
  
Total #inv = 17
*/

//Question 4 
function graderVer2(arr){
  //map a function that counts the number of 2-inversions to arr
  //and accumulates it
  return accumulate((x, y) => {
    return x +y;
  }, 0, map(f => {
    return f(arr, true, 0, 0);
  }, map(x => {
    function y(lst, bool, lower, higher){
      //Are we at the end?
      if (is_null(lst)){
        return lower * higher;
      } else {}
      // We found the middle guy?
      if (head(lst) === x){
        return y(tail(lst), !bool, lower, higher);
      } else if (biil){
        return y(tail(lst), bool, lower, higher + ((head(lst) > x) ? 1 : 0));
      } else { 
        return y(tail(lst), bool, lower + ((head(lst) < x) ? 1 : 0), higher);
      }
    }
    return y;
  }, arr)));
}
      
//Rationale
/*
Try list(6, 4, 8, 2, 5, 1, 7 , 3)

6: 0 * 5 = 0
4: 1 * 3 = 3 
8: 0 * 5 = 0
... 
Total triples = 11
*/
