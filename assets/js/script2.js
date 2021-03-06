var n_rows = 14;
var n_cols = 14;
var start_table = new Array (n_rows);
for (var row = 0; row < n_rows; row++) {
    start_table[row] = new Array (n_cols);
}
var colours = "blue red green yellow pink purple".split (/\s+/);

/* DOM functions. */

function create_node (type, parent)
{
    var new_node = document.createElement (type);
    parent.appendChild (new_node);
    return new_node;
}

function append_text (parent, text)
{
    var text_node = document.createTextNode (text);
    clear (parent);
    parent.appendChild(text_node);
}

function get_by_id (id)
{
    var element = document.getElementById (id);
    return element;
}

function clear (element)
{
    while (element.lastChild)
        element.removeChild (element.lastChild);
}

/* Flood fill game. */

var moves;
var max_moves = 35;
var finished;

/* Alter one element of the game table to be flooded. */

function flood_element (row, col, colour)
{
    game_table[row][col].colour = colour;
    game_table[row][col].element.className = "piece "+colour;
}

function test_colour_flood (row, col, colour)
{
    if (game_table[row][col].flooded)
        return;
    if (game_table[row][col].colour == colour) {
        game_table[row][col].flooded = true;
        /* Recurse to make sure that we get any connected neighbours. */
        flood_neighbours (row, col, colour);
    }
}

function flood_neighbours (row, col, colour)
{
    if (row < n_rows - 1)
        test_colour_flood (row + 1, col, colour);
    if (row > 0)
        test_colour_flood (row - 1, col, colour);
    if (col < n_cols - 1)
        test_colour_flood (row, col + 1, colour);
    if (col > 0)
        test_colour_flood (row, col - 1, colour);
}

function all_flooded ()
{
    for (var row = 0; row < n_rows; row++) {
        for (var col = 0; col < n_cols; col++) {
            if (! game_table[row][col].flooded) {
                return false;
            }
        }
    }
    return true;
}

function flood (colour, initial)
{
    if (finished)
        return;
    var old_colour = game_table[0][0].colour;
    if (! initial && colour == old_colour)
        return;
    moves++;
    append_text (get_by_id ("moves"), moves);
    /* Change the colour of all the flooded elements. */
    for (var row = 0; row < n_rows; row++) 
        for (var col = 0; col < n_cols; col++) 
            if (game_table[row][col].flooded)
                flood_element (row, col, colour);

    /* Set flooded = true for all the neighbouring boxes with the same
       colour. */
    for (var row = 0; row < n_rows; row++)
        for (var col = 0; col < n_cols; col++)
            if (game_table[row][col].flooded)
                flood_neighbours (row, col, colour);
    if (all_flooded ()) {
        finished = true;
        document.location.href="index3.html"; 

    } else if (moves == max_moves) {
        new_game();
    }
}

function help ()
{
    alert ("Press the square buttons to flood fill the image\n"+
           "with the colour from the top left corner. Fill the\n"+
           "entire image with the same colour in twenty-five or\n"+
           "fewer flood fills.");
}

/* Create a random colour for "create_table". */

function random_colour ()
{
    var colour_no = Math.floor (Math.random () * 6);
    return colours[colour_no];
}

/* The "state of play" is stored in game_table. */

var game_table = new Array (n_rows);
for (var row = 0; row < n_rows; row++) {
    game_table[row] = new Array (n_cols);
    for (var col = 0; col < n_cols; col++) {
        game_table[row][col] = new Object ();
    }
}

/* Create the initial random table. */

function create_table ()
{
    moves = -1;
    finished = false;
    var game_table_element = get_by_id ("game-table-tbody");
    for (var row = 0; row < n_rows; row++) {
        var tr = create_node ("tr", game_table_element);
        for (var col = 0; col < n_cols; col++) {
            var td = create_node ("td", tr);
            var colour = random_colour ();
            td.className = "piece " + colour;
            game_table[row][col].colour = colour;
            start_table[row][col] = colour;
            game_table[row][col].element = td;
            game_table[row][col].flooded = false;
        }
    }
    /* Mark the first element of the table as flooded. */
    game_table[0][0].flooded = true;
    /* Initialize the adjacent elements with the same colour to be flooded
       from the outset. */
    flood (game_table[0][0].colour, true);
    append_text (get_by_id("max-moves"), max_moves);
}

function new_game ()
{
    clear (get_by_id ("game-table-tbody"));
    create_table ();
}