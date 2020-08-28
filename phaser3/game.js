let config = {
    width: 500,
    height: 600,
    scene: [Scene1, Scene2, Scene3, GameOver],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }

    }
}
let game = new Phaser.Game(config);