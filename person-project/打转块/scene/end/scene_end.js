class SceneEnd extends GameScene {
	constructor(game) {
		super(game)
		game.registerAction('r', function(){
			var s = SceneStart.new(game)
			// var s = Scene(game)
			game.replaceScene(s)
		})
	}
	draw() {
		this.game.context.fillText('game over', 400, 280)
		this.game.context.fillText('按r重新游戏', 400, 320)
	}
}
