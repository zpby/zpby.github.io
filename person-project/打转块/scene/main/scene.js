var Scene = function(game, num) {
	var s = {
		game: game,
	}

	var paddle = Paddle(game)
	var ball = Ball(game)
	var score = 0
	var count = 0
	var blocks = loadLevel(game, num)

	var paused = false
	game.registerAction('a', function(){
		paddle.moveLeft()
	})
	game.registerAction('d', function(){
		paddle.moveRight()
	})
	game.registerAction('f', function(){
		ball.fire()
	})

	s.draw = function() {
		// draw
		game.context.fillStyle = 'grey'
		game.context.fillRect(0, 0, 800, 600)
		game.drawImage(paddle)
		game.drawImage(ball)
		// draw blocks
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.alive) {
				game.drawImage(block)
			}
		}
		// draw labels
		game.context.fillText('分数: ' + score, 720, 30)
	}

	s.update = function() {
		if (window.paused) {
			return
		}
		ball.move()

		if (ball.y > paddle.y) {
			var end = SceneEnd.new(game)
			game.replaceScene(end)
		}

		// 判断相撞
		if (paddle.collide(ball)) {
			// 这里应该调用一个 ball.bounce() 来实现
			ball.bounce()
		}

		// 判断 ball 和 blocks 相撞
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.collide(ball)) {
				// log('block 相撞')
				block.kill()
				ball.bounce()
				// 更新分数
				score += 100
				count ++
				// log(count)
			}
		}

		if (count == blocks.length) {
		 	num ++
			if(num === 4) {
		 		var success = Success.new(game)
		 		game.replaceScene(success)
				return
			}
			var scene = Scene(game, num)
			game.replaceScene(scene)
		}

		if (num > 3) {
			var s = SceneStart.new(g)
			g.runWithScene(s)
		}
	}


	var enableDrag = false
	game.canvas.addEventListener('mousedown', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		// log(x, y, event)
		if(ball.hasPoint(x, y)) {
			enableDrag = true
		}
	})
	game.canvas.addEventListener('mousemove', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		// log(x, y, 'move')
		if (enableDrag) {
			ball.x = x
			ball.y = y
		}
	})
	game.canvas.addEventListener('mouseup', function(event) {
		var x = event.offsetX
		var y = event.offsetY
		// log(x, y, 'up')
		enableDrag = false
	})
	return s
}
