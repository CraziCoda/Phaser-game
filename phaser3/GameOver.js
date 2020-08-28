class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }
    create() {
        this.bg = this.add.tileSprite(0, 0, config.width * 2, config.height * 2, 'level1bg');

        this.gameOver = new TextButton(this,
            config.width / 2 - 50, config.height / 2, 'GameOver', { fill: "#fff", font: "25px Mv boli" });
        this.add.existing(this.gameOver);
    }
}