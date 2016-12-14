$(document).ready(function() {
	var board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
	var ai = 1;
	var player = 2;

	centerBoard();
	$(window).resize(function() {
		centerBoard();
	});

	$('.choice-x').click(function() {
		makeChoice('x');
		startGame();
	});

	$('.choice-o').click(function() {
		makeChoice('o');
		startGame();
	});

	function clickCell() {
		if ($(this).hasClass('x') || $(this).hasClass('o')) {
			return;
		}

		$(this).addClass( player == 1 ? 'x' : 'o' );

		board[Math.floor($('.cell').index($(this)) / 3)][$('.cell').index($(this)) % 3] = player;

		if (getNodeValue(board, true)) {
			finishGame('Player wins');
			return;
		} else if (!generateChildNodes(board, true).length) {
			finishGame('Draw');
			return;
		}

		makeAiTurn();

		if (getNodeValue(board, false)) {
			finishGame('AI wins');
			return;
		} else if (!generateChildNodes(board, false).length) {
			finishGame('Draw');
			return;
		}
	}

	function startGame() {
		if (ai == 1) {
			board[Math.floor(Math.random() * 3)][Math.floor(Math.random() * 3)] = ai;
			refreshBoard(board);
		}
	}

	function finishGame(str) {
		$('.message-block').text(str);
		$('.modal-block').fadeIn(300);
		$('.cell').off('click', clickCell)
							.css('cursor', 'default');
		if (str !== 'Draw') {
			highlight(board);
		}
	}

	function makeAiTurn() {
		var possibleTurns = generateChildNodes(board, false);
		var bestTurns = [];
		var turnValues = [];

		possibleTurns.forEach(function(item) {
			turnValues.push( minimax(item, 5, true) );
		});

		var bestValue = Math.min.apply(null, turnValues);

		for (var i = 0; i < possibleTurns.length; i++) {
			if (turnValues[i] == bestValue) {
				bestTurns.push( possibleTurns[i] );
			}
		}

		board = bestTurns[Math.floor(Math.random() * bestTurns.length)];

		refreshBoard(board);
	}

	function minimax(node, depth, maxPlayer) {
		var childNodes = generateChildNodes(node, maxPlayer);
		var nodeValue = getNodeValue(node);

		if (!depth || nodeValue || !childNodes.length) {
			return nodeValue - depth;
		}

		if (maxPlayer) {
			var bestVal = -9000;

			childNodes.forEach(function(item) {
				var nVal = minimax(item, depth - 1, false);
				bestVal = Math.max(bestVal, nVal);
			});

			return bestVal;
		} else {
			var bestVal = 9000;

			childNodes.forEach(function(item) {
				var nVal = minimax(item, depth - 1, true);
				bestVal = Math.min(bestVal, nVal);
			});

			return bestVal;
		}
	}

	// high == true is used to find win combo for highlighting
	function getNodeValue(node, high) {
		//diagonal check
		if (node[0][0] == ai && node[0][0] == node[1][1] && node[0][0] == node[2][2]) {
			return high ? '.d1' : -10;
		} else if (node[0][0] == player && node[0][0] == node[1][1] && node[0][0] == node[2][2]) {
			return high ? '.d1' : 10;
		}

		if (node[0][2] == ai && node[0][2] == node[1][1] && node[0][2] == node[2][0]) {
			return high ? '.d2' : -10;
		} else if (node[0][2] == player && node[0][2] == node[1][1] && node[0][2] == node[2][0]) {
			return high ? '.d2' : 10;
		}
		//horizontal & vertical check
		for (var i = 0; i < node.length; i++) {
			if (node[i][0] == ai && node[i][0] == node[i][1] && node[i][0] == node[i][2]) {
				return high ? '.h' + i : -10;
			} else if (node[i][0] == player && node[i][0] == node[i][1] && node[i][0] == node[i][2]) {
				return high ? '.h' + i : 10;
			}

			if (node[0][i] == ai && node[0][i] == node[1][i] && node[0][i] == node[2][i]) {
				return high ? '.v' + i : -10;
			} else if (node[0][i] == player && node[0][i] == node[1][i] && node[0][i] == node[2][i]) {
				return high ? '.v' + i : 10;
			}
		}

		return 0;
	}

	function generateChildNodes(node, maxPlayer) {
		var childNodes = [];

		for (var i = 0; i < node.length; i++) {
			for (var j = 0; j < node[i].length; j++) {
				if (node[i][j] === 0) {
					node[i][j] = maxPlayer ? player : ai;
					//JSON used to clone nested arrays
					childNodes.push( JSON.parse(JSON.stringify(node)) );
					node[i][j] = 0;
				}
			}
		}

		return childNodes;
	}

	function highlight(node) {
		$(getNodeValue(node, true)).addClass('highlighted');
	}

	function refreshBoard(node) {
		var flatNode = [].concat.apply([], node);

		$('.cell').each(function(index) {
			if (flatNode[index] == 1 && !$(this).hasClass('x')) {
				$(this).addClass('x');
			} else if (flatNode[index] == 2 && !$(this).hasClass('o')) {
				$(this).addClass('o');
			}
		});
	}

	function clearBoard() {
		$('.cell').each(function(index) {
			$(this).removeClass('x o highlighted');
		});
	}

	function makeChoice(choice) {
		board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
		clearBoard();

		if (choice == 'x') {
			player = 1;
			ai = 2;
		} else if (choice == 'o') {
			player = 2;
			ai = 1;
		}

		$('.modal-block').fadeOut(300);
		$('.message-block').text(' ');
		$('.cell').click(clickCell)
							.css('cursor', 'pointer');
	}

	function centerBoard() {
		$('.board').css('marginTop', ($(window).innerHeight() - $('.board').height()) / 8);
	}
});