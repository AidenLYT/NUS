// Task 1
// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive.
// where 0 - 9 represent the digits
// 10 represents *, 11 represents #,
// and 12 - 15 represent the letters A-D.

function get_dtmf_frequencies(number) {
    // your answer here
    const column = list(1209, 1336, 1477, 1633);
    const row = list(697, 770, 852, 941);
    const coordinate = list(
            pair(3, 1), pair(0, 0), pair(0, 1), pair(0, 2), pair(1, 0), 
            pair(1, 1), pair(1, 2), pair(2, 0), pair(2, 1), pair(2, 2), 
            pair(3, 0), pair(3, 2), pair(0, 3), pair(1, 3), pair(2, 3), 
            pair(3, 3));
    const call_coordinate = list_ref(coordinate, number);
    
    return pair(list_ref(row, head(call_coordinate)), 
                list_ref(column, tail(call_coordinate)));
}

//Test case
get_dtmf_frequencies(3);


// Task 2
// Copy your function get_dtmf_frequencies here.
function get_dtmf_frequencies(number) {
    const column = list(1209, 1336, 1477, 1633);
    const row = list(697, 770, 852, 941);
    const coordinate = list(
            pair(3, 1), pair(0, 0), pair(0, 1), pair(0, 2), pair(1, 0), 
            pair(1, 1), pair(1, 2), pair(2, 0), pair(2, 1), pair(2, 2), 
            pair(3, 0), pair(3, 2), pair(0, 3), pair(1, 3), pair(2, 3), 
            pair(3, 3));
    const call_coordinate = list_ref(coordinate, number);
    
    return pair(list_ref(row, head(call_coordinate)), 
                list_ref(column, tail(call_coordinate)));
}

function make_dtmf_tone(frequency_pair) {
    // your answer here
    const sounds = list(sine_sound(head(frequency_pair), 0.5),
                        sine_sound(tail(frequency_pair), 0.5));
                        
    return simultaneously(sounds);
}


//Task 3
// Copy your functions get_dtmf_frequencies and make_dtmf_tone here.
function get_dtmf_frequencies(number) {
    const column = list(1209, 1336, 1477, 1633);
    const row = list(697, 770, 852, 941);
    const coordinate = list(
            pair(3, 1), pair(0, 0), pair(0, 1), pair(0, 2), pair(1, 0), 
            pair(1, 1), pair(1, 2), pair(2, 0), pair(2, 1), pair(2, 2), 
            pair(3, 0), pair(3, 2), pair(0, 3), pair(1, 3), pair(2, 3), 
            pair(3, 3));
    const call_coordinate = list_ref(coordinate, number);
    
    return pair(list_ref(row, head(call_coordinate)), 
                list_ref(column, tail(call_coordinate)));
}

function make_dtmf_tone(frequency_pair) {
    const sounds = list(sine_sound(head(frequency_pair), 0.5),
                        sine_sound(tail(frequency_pair), 0.5));
                        
    return simultaneously(sounds);
}

function dial(list_of_digits) {
  // your answer here
  function sounds(digit) {
    return consecutively(
      list(make_dtmf_tone(get_dtmf_frequencies(digit)), silence_sound(0.1)));
  }

  return consecutively(map(sounds,list_of_digits));
}

//Test
play(dial(list(6,2,3,5,8,5,7,7)));


// Task 4
// Copy your functions get_dtmf_frequencies,
// make_dtmf_tone and dial here.
function get_dtmf_frequencies(number) {
    const column = list(1209, 1336, 1477, 1633);
    const row = list(697, 770, 852, 941);
    const coordinate = list(
            pair(3, 1), pair(0, 0), pair(0, 1), pair(0, 2), pair(1, 0), 
            pair(1, 1), pair(1, 2), pair(2, 0), pair(2, 1), pair(2, 2), 
            pair(3, 0), pair(3, 2), pair(0, 3), pair(1, 3), pair(2, 3), 
            pair(3, 3));
    const call_coordinate = list_ref(coordinate, number);
    
    return pair(list_ref(row, head(call_coordinate)), 
                list_ref(column, tail(call_coordinate)));
}

function make_dtmf_tone(frequency_pair) {
    const sounds = list(sine_sound(head(frequency_pair), 0.5),
                        sine_sound(tail(frequency_pair), 0.5));
                        
    return simultaneously(sounds);
}

function dial(list_of_digits) {
  function sounds(digit) {
    return consecutively(
      list(make_dtmf_tone(get_dtmf_frequencies(digit)), silence_sound(0.1)));
  }

  return consecutively(map(sounds,list_of_digits));
}

function dial_all(list_of_numbers) {
    // your answer here
    const evil_number = list(1, 8, 0, 0, 5, 2, 1, 1, 9, 8, 0);

    function check_evil(number) {
        return stringify(list(number)) === stringify(list(evil_number))
            ? false
            : true;
    }

    function total_sounds(sound, add_sound) {
        return consecutively(list(sound, add_sound));
    }

    return accumulate(total_sounds, silence_sound(0),
    map(dial, filter(check_evil, list_of_numbers)));
}

// Test
play(dial_all(
 list(
     list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
     list(6,2,3,5,8,5,7,7),
     list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
 ));
