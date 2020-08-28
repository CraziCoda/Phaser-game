class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, sprite) {
        super(scene, x, y, key, sprite);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.health = 100;
        //this.body.setCollideWorldBounds(true);
        this.setScale(0.7, 0.7);

    }
    update(cursor) {
        if (cursor.left.isDown) {
            this.body.setVelocityX(-300);
        } else if (cursor.right.isDown) {
            this.body.setVelocityX(300);
        } else {
            this.body.setVelocityX(0);
        }

        if (cursor.up.isDown) {
            this.body.setVelocityY(-400);
        } else if (cursor.down.isDown) {
            this.body.setVelocityY(400);
        } else {
            this.body.setVelocityY(0);
        }
    }
}