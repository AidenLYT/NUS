//Source will produce error as f is not declared before
const x = f(8);
function f(y) { 
  return y + 34;
}
x;
//Javascript will move function up 
function f(y) {
  return y + 34; 
}
const x = f(8);
x;
//add reorder function to evaluate 
 : is_sequence(component)
                      // CHANGED HERE
           ? eval_sequence(reorder_statements(
                             sequence_statements(component)), env)
//reorder the sequence such that function to one list and rest to another
function reorder_statements(stmts) {
    // split_statements splits given stmts
    // into pair(function_declarations,
    //           all_other_statements)
    function split_statements(stmts) {
        if (is_null(stmts)) {
            return pair(null, null);
        } else {
            const first_statement = head(stmts);
            const split_rest = split_statements(tail(stmts));
            return is_function_declaration(first_statement)
                   ? pair(pair(first_statement, head(split_rest)),
                          tail(split_rest))
                   : pair(head(split_rest), 
                          pair(first_statement, tail(split_rest)));
        }
    }
    const split = split_statements(stmts);
    return append(head(split), tail(split));
}


//In-class
// const x = y;
// const y = 42;
// const z = "***" + x + "***"; z;
//Source will produce: ReferenceError: Cannot access uninitialized variable.
//MCE will produce: ***unassigned***

//Change lookup_symbol_value 
function lookup_symbol_value(symbol, env) {
    function env_loop(env) {
        function scan(symbols, vals) {
            return is_null(symbols)
                   ? env_loop(enclosing_environment(env))
                   : symbol === head(symbols)
                     // CHANGED HERE:
                     ? ( head(vals) === "*unassigned*"
                         ? error(symbol, 
                                 "Cannot access name before initialization:")
                         : head(vals)
                       )
                     : scan(tail(symbols), tail(vals));
        }
        if (env === the_empty_environment) {
            error(symbol, "unbound name");
        } else {
            const frame = first_frame(env);
            return scan(frame_symbols(frame), frame_values(frame));
        }
    }
    return env_loop(env);
}
