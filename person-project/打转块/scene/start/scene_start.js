class SceneStart extends GameScene {
	constructor(game) {
		super(game)
		game.registerAction('k', function(){
			var s = Scene(game, 1)
			game.replaceScene(s)
		})
	}
	draw() {
		this.game.context.fillText('按k开始游戏', 400, 280)
	}
}
