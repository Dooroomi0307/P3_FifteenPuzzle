    //set initial variable

    //**Adjust here for different puzzle size**********************************
    var horizontal = 4; //board horizontal length
    var vertical = 4; //board vertical length

    var blank = vertical * horizontal - 1; //index of last tile
    var  BLANK = 0; //variable for storing a position for empty tile
    var  board = []; //array for board
    var  board_el = document.getElementById('board'); 
    var  shuffleBtn = document.getElementById('shuffleBtn'); 

    //init array for puzzle board
    function initPuzzle() {
        board = [];
        var counter = 1;
        for (var y = 0; y < vertical; y++) {
            //set array size
            board[y] = [];
            for (var x = 0; x < horizontal; x++) {
                if (counter <= blank){ //counts until it reaches last index
                    board[y][x] = counter++;
                }else{
                    board[y][x] = BLANK; //set last index as empty tile
                } 
            }
        }
        updateBoard();
    }

    //shuffle tiles
    function shuffle() {
        var moves = ['r', 'l', 'd', 'u']; //movement direction right/left/down/up
        for (var z = 0; z < 100; z++) { //shuffles for 100 times
            move(moves[Math.floor(Math.random() * 4)], false);
        } 
        updateBoard();
    }

    //define movements: right, left, down, up
    function move(d, action) {
        switch (d) {
            case 'r':
                if (blank % horizontal > 0) moveTo(blank - 1);
                        break;
                    case 'l':
                        if (blank % horizontal < horizontal - 1) moveTo(blank + 1);
                        break;
                    case 'd':
                        if (Math.floor(blank / vertical) > 0) moveTo(blank - horizontal);
                        break;
                    case 'u':
                        if (Math.floor(blank / vertical) < vertical - 1) moveTo(blank + horizontal);
                        break;
                }
                if (action) isEnd();
            }

    //move an empty tile 
    function moveTo(to) {
        board[Math.floor(blank / vertical)][blank % horizontal] = board[Math.floor(to / vertical)][to % horizontal];
        board[Math.floor(to / vertical)][to % horizontal] = BLANK;
        blank = to;
        updateBoard();
    }        

    //set click event for each tile
    //check surrounding tiles to see which way an empty tile can move
    function tileClick() {
        //check for current position
        var index = parseInt(this.getAttribute('data-index'));
        var x = index % vertical
        var y = parseInt(index / horizontal);

        //check for surrounding tiles
        if (y > 0 && board[y-1][x] == BLANK) {
            move('u', true);
        } else if (y < vertical - 1 && board[y+1][x] == BLANK) {
            move('d', true);
        } else if (x > 0 && board[y][x-1] == BLANK) {
            move('l', true);
        } else if (x < horizontal - 1 && board[y][x+1] == BLANK) {
            move('r', true);
        }
    }

    //inject <script> into html
    function updateBoard() {
        board_el.innerHTML = '';
        var html = '';
        var image_size = 400; // image size
        var tile_size = image_size / horizontal;

        for (var y = 0; y < vertical; y++) {
            html += '<tr>';
            for (var x = 0; x < horizontal; x++) {
                if (board[y][x] != BLANK) {
                    //image size
                    var img_x = -(board[y][x] % horizontal) * tile_size + 'px';
                    var img_y = -Math.floor(board[y][x] / vertical) * tile_size + 'px';
                    //**Adjust here for different background image**********************************
                    html += '<td class="tile" data-index="' + (y * horizontal + x) + '" style="background-image: url(\'./img/400.png\'); background-position: ' + img_x + ' ' + img_y + ';"><div class="tile-num">' + board[y][x] + '</div></td>';
                } else {
                    html += '<td class="blank">&nbsp;</td>';
                }
            }
            html += '</tr>';
        }
        board_el.innerHTML = html;

        var tileElements = document.querySelectorAll('#board td.tile');
        for (var i = 0; i < tileElements.length; i++) {
            tileElements[i].addEventListener('click', tileClick);
        }
    }

    //**Adjust here for 'End-of-game notificaiton**********************************
    function isEnd() {
        for (var y = 0; y < vertical; y++) {
            for (var x = 0; x < horizontal; x++) {
                var expect = y * horizontal + x + 1;
                if (y * horizontal + x < vertical * horizontal - 1) {
                    if (board[y][x] != expect) return;
                    }
                }
            }
                alert('Cleared!');
        }

    shuffleBtn.addEventListener('click', shuffle);
    initPuzzle();