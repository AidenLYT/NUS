//Question 1
//Model Answer 
let frame_count = 0;

function count_frames_created(program_string){
   frame_count = 0;
   parse_and_evaluate(program_string);
   return fram_count;
}

function make_frame(symbols, values){ 
  if (!is_null(symbols)){
    frame_count = frame_count + 1;
  }
  return pair(symbols, values);
}

//Question 2
//Model Answer
let func_obj_count = 0; 

function count_function_objects_created(program_string){
  func_obj_count = 0;
  parse_and_evaluate(program_string);
  return func_obj_count;
}

function make_function(parameters, body, env){
  func_obj_count = func_obj_count + 1;
  return list("compound_function", parameters, body, env);
}

//Question 3 
//Model Answer
function super_plus(x, y) {
  return is_list(x) && is_list(y)
    ? append(x, y)
    : x + y;
}

//Question 4
//Model Answer 
function is_function(x){ 
  return is_primitive_function(x) || is_compound_function(x);
}

function super_greater(x, y){
  return is_function(x) && is_list(y)
     ? map(e => apply(x, list(e)), y)
     : x > y;
}
