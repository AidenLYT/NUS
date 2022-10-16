// Task 1
function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1;
    return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
    /* your answer here */
    return make_sound(get_wave(sound), duration);
}

// Play test sound.
play(cut_sound(noise_sound(2), 1));


// Task 2
function sine_sound(freq, duration) {
    /* your answer here */
    const sound = t => math_sin(2 * math_PI * freq * t);
    
    return make_sound(sound, duration);
}

// Play test sound.
play(sine_sound(500, 1));


//Task 3
// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const sound = t => math_sin(2 * math_PI * freq * t);
    
    return make_sound(sound, duration);
}

function two_consecutively(s1, s2) {
    /* your answer here */
    const total_time = get_duration(s1) + get_duration(s2);
    
    const combine_sound =
        t => t < get_duration(s1)
             ? get_wave(s1)(t)
             : get_wave(s2)(t - get_duration(s1));
    
    return make_sound(combine_sound, total_time);
}

const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(750, 2);

// Play test sound.
play(two_consecutively(my_sine_1, my_sine_2));


//Task 4
// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const sound = t => math_sin(2 * math_PI * freq * t);
    
    return make_sound(sound, duration);
}

// Copy your own two_consecutively function from the previous question here.
function two_consecutively(s1, s2) {
    const total_time = get_duration(s1) + get_duration(s2);
    
    const combine_sound =
        t => t < get_duration(s1)
             ? get_wave(s1)(t)
             : get_wave(s2)(t - get_duration(s1));
    
    return make_sound(combine_sound, total_time);
}

function consecutively(list_of_sounds) {
    /* your answer here */
    function total_duration(list_of_sounds) {
        return is_null(list_of_sounds)
            ? 0 
            : get_duration(head(list_of_sounds)) + 
                    total_duration(tail(list_of_sounds));
    }
    
    function total_sound(list_of_sounds, duration) {
        
        function total_sound_calc(list_of_sounds, t, duration) {
            return is_null(list_of_sounds)
                ? 0
                : t < duration + get_duration(head(list_of_sounds))
                ? get_wave(head(list_of_sounds))(t - duration)
                : total_sound_calc(tail(list_of_sounds), t, 
                            duration + get_duration(head(list_of_sounds)));
            }
            
        return t => total_sound_calc(list_of_sounds, t, duration);
    }
    
    return make_sound(total_sound(list_of_sounds, 0), 
                        total_duration(list_of_sounds));
}

const my_sine_1 = sine_sound(500, 0.5);
const my_sine_2 = sine_sound(750, 1);
const my_sine_3 = sine_sound(625, 0.5);

// Play test sound.
play(consecutively(list(my_sine_1, my_sine_2, my_sine_3)));


// Task 5
// Copy your own sine_sound function from the previous question here.
function sine_sound(freq, duration) {
    const sound = t => math_sin(2 * math_PI * freq * t);
    
    return make_sound(sound, duration);
}

// Copy your own two_consecutively function from the previous question here.
function two_consecutively(s1, s2) {
    const total_time = get_duration(s1) + get_duration(s2);
    
    const combine_sound =
        t => t < get_duration(s1)
             ? get_wave(s1)(t)
             : get_wave(s2)(t - get_duration(s1));
    
    return make_sound(combine_sound, total_time);
}

// Copy your own consecutively function from the previous question here.
function consecutively(list_of_sounds) {
    
    function total_duration(list_of_sounds) {
        return is_null(list_of_sounds)
            ? 0 
            : get_duration(head(list_of_sounds)) + 
                    total_duration(tail(list_of_sounds));
    }
    
    function total_sound(list_of_sounds, duration) {
        
        function total_sound_calc(list_of_sounds, t, duration) {
            return is_null(list_of_sounds)
                ? 0
                : t < duration + get_duration(head(list_of_sounds))
                ? get_wave(head(list_of_sounds))(t - duration)
                : total_sound_calc(tail(list_of_sounds), t, 
                            duration + get_duration(head(list_of_sounds)));
            }
            
        return t => total_sound_calc(list_of_sounds, t, duration);
    }
    
    return make_sound(total_sound(list_of_sounds, 0), 
                        total_duration(list_of_sounds));
}

const dot_duration = 0.125;
const dash_duration = 3 * dot_duration;

// Create dot, dash and pause sounds first.
const dot_sound = sine_sound(800, 0.125);
const dash_sound = sine_sound(800, 0.125 * 3);
const dot_pause = silence_sound(0.125);
const dash_pause = silence_sound(0.125 * 3);

// Create sounds for each letter.
const S_sound = consecutively(list(dot_sound, dot_pause, 
                                    dot_sound, dot_pause, dot_sound));
const O_sound = consecutively(list(dash_sound, dash_pause, 
                                    dash_sound, dash_pause, dash_sound));

// Build the signal out of letter sounds and pauses.
const distress_signal = consecutively(list(S_sound, dash_pause, 
                                            O_sound, dash_pause, S_sound));

// Play distress signal.
play(distress_signal);
