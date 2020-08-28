class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, frame, health) {
        super(scene, x, y, key, frame, health);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.setScale(0.5, 0.5);
        this.health = health;
    }

}