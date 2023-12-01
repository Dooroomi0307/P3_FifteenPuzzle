    //set initial variable

    //**Adjust here for different puzzle size**********************************
    var horizontal = 4; //board horizontal length
    var vertical = 4; //board vertical length

    var blank = vertical * horizontal - 1; //index of last tile
    var  BLANK = 0; //variable for storing a position for empty tile
    var  board = []; //array for board
    var  board_el = document.getElementById('board'); 
    var  shuffleBtn = document.getElementById('shuffleBtn'); 
    var hasRun = false;	//used to make sure the random image function only is used on page load

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

    //move to an empty space
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

//generate the function
	function updateBoard(picksize){
		horizontal+= pickbtn;
	vertical+=pickbtn;}

    //inject <script> into html
    function updateBoard() {
        board_el.innerHTML = '';
        var html = '';
        var image_size = 400; // image size
        var tile_size = image_size / horizontal;
	var imageChooser = Math.floor(Math.random() * (6 - 1) + 1);	//selects random number from 1 to 5
	var img = '';
		
	if(imageChooser == 1 && hasRun == false || document.getElementById('default').checked){
		img = '" style="background-image: url(\'https://codd.cs.gsu.edu/~rlim6@student.gsu.edu/WP/PW/3/img/400.png\'); background-position: ';
		document.getElementById('default').checked = true;
		hasRun = true;	//ensures random images are not selected when selecting from menu
	}
		
	else if(imageChooser == 2 && hasRun == false || document.getElementById('rick_morty').checked){
		document.getElementById('rick_morty').checked = true;
		img = '" style="background-image: url(\'https://codd.cs.gsu.edu/~rlim6@student.gsu.edu/WP/PW/3/img/test.png\'); background-position: ';
		hasRun = true;
	}
		
	else if(imageChooser == 3 && hasRun == false || document.getElementById('dog').checked){
		document.getElementById('dog').checked = true;
		img = '" style="background-image: url(\'https://codd.cs.gsu.edu/~rlim6@student.gsu.edu/WP/PW/3/img/dog.png\'); background-position: ';
		hasRun = true;
	}
		
	else if(imageChooser == 4 && hasRun == false || document.getElementById('lebron').checked){
		document.getElementById('lebron').checked = true;
		img = '" style="background-image: url(\'https://codd.cs.gsu.edu/~rlim6@student.gsu.edu/WP/PW/3/img/lebron.png\'); background-position: ';
		hasRun = true;
	}
		
	else if(imageChooser == 5 && hasRun == false || document.getElementById('link').checked){
		document.getElementById('link').checked = true;
		img = '" style="background-image: url(\'https://codd.cs.gsu.edu/~rlim6@student.gsu.edu/WP/PW/3/img/link.png\'); background-position: ';
		hasRun = true;
	}

        for (var y = 0; y < vertical; y++) {
            html += '<tr>';
            for (var x = 0; x < horizontal; x++) {
                if (board[y][x] != BLANK) {
                    //image size
                    var img_x = -((board[y][x] - 1) % horizontal) * tile_size + 'px';
                    var img_y = -Math.floor((board[y][x] - 1) / horizontal) * tile_size + 'px';

                    html += '<td class="tile" data-index="' + (y * horizontal + x) + 
                    img + img_x + ' ' + img_y + 
                    ';"><div class="tile-num">' + board[y][x] + '</div></td>';
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
//check if user completed puzzle, open end of game notification if correct
    function isEnd() {
        for (var y = 0; y < vertical; y++) {
            for (var x = 0; x < horizontal; x++) {
                var expect = y * horizontal + x + 1;
                if (y * horizontal + x < vertical * horizontal - 1) {
                    if (board[y][x] != expect) return;
                    }
                }
            }
        	notification.classList.add("open-notification");
            notification1.classList.add("open-notification1");
            document.getElementById('board').style.setProperty('--end-game', 'tiles');
        }
//shuffle bttn
    shuffleBtn.addEventListener('click', shuffle);
    initPuzzle();
//close end of game notification
	function closeNotification() {
		notification.classList.remove("open-notification");
        notification1.classList.remove("open-notification1");
	}
