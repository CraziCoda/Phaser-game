class Bullets extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, bullet, frame, damage) {
        /*         let x = scene.player.x;
                let y = scene.player.y; */
        super(scene, x, y, bullet, frame, damage);
        // scene.physics.world.enable(this);
        scene.add.existing(this);
        this.damage = damage;
    }

}