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

//Check each and every one of the evaluation 
// CHANGED HERE
// Follow the structure of evaluate
// to catch everything.
// No need to return any value; 
// just raise error whenever an
// undeclared name occurs
function check_names(component, env) {
    is_literal(component)
    ? "ok"
    : is_name(component)
    ? lookup_symbol_value(symbol_of_name(component), env)
    : is_application(component)
    ? check_names(
          make_sequence(
              pair(function_expression(component), 
                   arg_expressions(component))),
          env)
    : is_operator_combination(component)
    ? check_names(operator_combination_to_application(component), env)
    : is_conditional(component)
    ? check_names(
          make_sequence(
              list(conditional_predicate(component),
                   conditional_consequent(component),
                   conditional_alternative(component))),
          env)
    : is_lambda_expression(component)
    ? check_names(lambda_body(component), 
                  extend_environment(
                      lambda_parameter_symbols(component),
                      list_of_unassigned(
                         lambda_parameter_symbols(component)),
                      env))
    : is_sequence(component)
    ? map(stmt => check_names(stmt, env),
          sequence_statements(component))
    : is_block(component)
    ? check_names(block_body(component), 
                  extend_environment(
                      scan_out_declarations(block_body(component)),
                      list_of_unassigned(
                          scan_out_declarations(block_body(component))),
                      env))
    : is_function_declaration(component)	    
    ? check_names(function_decl_to_constant_decl(component), env)
    : is_declaration(component)
    ? check_names(make_sequence(
                      list(make_name(declaration_symbol(component)), 
                           declaration_value_expression(component))),
                  env)
          : error(component, "Unknown syntax -- check_names");
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
