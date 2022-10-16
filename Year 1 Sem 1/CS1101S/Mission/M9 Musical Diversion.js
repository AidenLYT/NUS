//Task 1
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    /* your answer here */
    return drum_envelope(noise_sound(duration));
}

function bass_drum(note, duration) {
    /* your answer here */
    const prime_numbers = list(79, 83, 89, 97, 101, 103, 107, 109, 
                                113, 127, 131, 137, 139, 149);
                                
    function sound(frequency){
        return sine_sound(frequency, duration);
    }
    
    return simultaneously(map(sound, prime_numbers));
}

function mute(note, duration) {
    /* your answer here */
    return drum_envelope(silence_sound(duration));
}

// Test
play(snare_drum(50, 0.2));
play(bass_drum(50, 0.2));

play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2),
                        mute(0, 0.2),
                        snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2))));


//Task 2
function generate_list_of_note(letter_name, list_of_interval) {
    /* your answer here */
    const base_note = letter_name_to_midi_note(letter_name);
    
    function make_list(list_of_interval, base_note){
        return is_null(list_of_interval)
            ? null 
            : pair(head(list_of_interval) + base_note, 
                    make_list(tail(list_of_interval), 
                        head(list_of_interval) + base_note));
    }
    
    return append(list(base_note), make_list(list_of_interval, base_note));
}

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);

display(c_major_scale);

function list_to_sound(list_of_midi_note, duration, instrument) {
    /* your answer here */
    function sound(note){
        return instrument(note, duration);
    }
    
    return consecutively(map(sound, list_of_midi_note));
}

const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);

const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);


const c_harmonic_minor_scale = generate_list_of_note("C4", 
                                                harmonic_minor_scale_interval);
const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4, cello);
play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note("C4", 
                                                melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4, cello);
play(c_melodic_minor_scale_sound);

//Task 3
// copy your functions generate_list_of_note and list_to_sound
// from the previous Question here
function generate_list_of_note(letter_name, list_of_interval) {
    const base_note = letter_name_to_midi_note(letter_name);
    
    function make_list(list_of_interval, base_note){
        return is_null(list_of_interval)
            ? null 
            : pair(head(list_of_interval) + base_note, 
                    make_list(tail(list_of_interval), 
                        head(list_of_interval) + base_note));
    }
    
    return append(list(base_note), make_list(list_of_interval, base_note));
}

function list_to_sound(list_of_midi_note, duration, instrument) {
    function sound(note){
        return instrument(note, duration);
    }
    
    return consecutively(map(sound, list_of_midi_note));
}

const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

function arpeggiator_up(arpeggio, duration_each, instrument) {
    function make_arpeggio_sound(arpeggio, duration_each, instrument, final){
        return is_null(arpeggio)
            ? silence_sound(0)
            : length(final) === 4
                ? list_to_sound(final, duration_each, instrument)
                : make_arpeggio_sound(tail(arpeggio), duration_each, instrument, 
                                    append(final, list(head(arpeggio))));
    }
    
    function generate_sound(arpeggio, duration_each, instrument) {
      return is_null(arpeggio)
        ? silence_sound(0)
        : consecutively(list(make_arpeggio_sound(
                arpeggio, duration_each, instrument, list()),
                generate_sound(tail(arpeggio), duration_each, instrument)));
  }
    
    return length(arpeggio) < 4
        ? silence_sound(0)
        : generate_sound(arpeggio, duration_each, instrument);
}

// Test
play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1, cello));


//Task 4
function simplify_rhythm(rhythm) {
    /* your answer here */
    function repeat_pattern(rhythm, n, counter){
        return counter === n
            ? null
            : append(simplify_rhythm(rhythm), 
                        repeat_pattern(rhythm, n, counter + 1));
    }
    
    function list_accumulate(rhythm){
        return is_number(head(rhythm))
            ? rhythm
            : accumulate((x, y) => append(simplify_rhythm(x), y), 
                                            null, rhythm);
    }
    
    return is_list(rhythm)
            ? list_accumulate(rhythm)
            : repeat_pattern(head(rhythm), tail(rhythm), 0);
}

// Test
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
const my_simple_rhythm = simplify_rhythm(my_rhythm);
display_list(my_simple_rhythm);

const correct_simple_rhythm = list(1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,
        2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3);
equal(my_simple_rhythm, correct_simple_rhythm);


//Task 5
const drum_envelope = adsr(0.05, 0.95, 0, 0);

// paste your snare_drum, mute and simplify_rhythm
// from Questions 1 and 4 here
function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}

function mute(note, duration) {
    return drum_envelope(silence_sound(duration));
}

function simplify_rhythm(rhythm) {
    function repeat_pattern(rhythm, n, counter){
        return counter === n
            ? null
            : append(simplify_rhythm(rhythm), 
                        repeat_pattern(rhythm, n, counter + 1));
    }
    
    function list_accumulate(rhythm){
        return is_number(head(rhythm))
            ? rhythm
            : accumulate((x, y) => append(simplify_rhythm(x), y), null, rhythm);
    }
    
    return is_list(rhythm)
            ? list_accumulate(rhythm)
            : repeat_pattern(head(rhythm), tail(rhythm), 0);
}

function percussions(distance, list_of_sounds, rhythm) {
  /* your answer here */
  const music = map(n => list_ref(list_of_sounds, n), simplify_rhythm(rhythm));
  const duration = length(music);
  
  function player(distance, list_of_sounds, time_now, duration){
      return time_now === duration
        ? silence_sound(0)
        : consecutively(list(
            consecutively(list(silence_sound(distance), head(list_of_sounds))),
            player(distance, tail(list_of_sounds), time_now + 1, duration)));
  }
  
  return player(distance, music, 0, duration);
}

// Test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_cello = cello(50, 0.7);
const my_bell = bell(72, 1);
play(percussions(0.5,
         list(my_mute_sound,
              my_snare_drum,
              my_cello,
              my_bell),
         list(1,2,1,0,3,1,0)));
