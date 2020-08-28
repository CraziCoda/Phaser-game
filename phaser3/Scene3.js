class Scene3 extends Phaser.Scene {
    constructor() {
        super('Level1');
    }
    create() {
        this.bg = this.add.tileSprite(0, 0, config.width * 2, config.height * 2, 'level1bg');
        this.player = new Player(this, config.width / 2, config.height, 'player', 0);
        this.enemies = this.physics.add.group({ collideWorldBounds: true });
        this.Player = this.physics.add.group({ collideWorldBounds: true });
        this.Player.add(this.player);
        this.bullets = this.physics.add.group();
        this.eBullets = this.physics.add.group();
        this.cursor = this.input.keyboard.createCursorKeys();
        this.healthT = new TextButton(this,
            config.width / 2 - 50, 0, 'Health: ', { fill: "#fff", font: "25px Mv boli" });
        this.lev = new TextButton(this,
            config.width / 2 + 50, 0, '100', { fill: "#fff", font: "25px Mv boli" });


        this.add.existing(this.healthT);
        this.add.existing(this.lev);

        let maxEnemies = 10;
        for (let x = 0; x < maxEnemies; x++) {
            this.drone = new Enemy(this, 10, 10, 'drone', 0, 100);
            this.enemies.add(this.drone);
            this.drone.setRandomPosition(0, 0, game.config.width, 200);

        }

        this.physics.add.collider(this.enemies, this.Player, this.reduceHealth, null, this);
        this.physics.add.collider(this.enemies, this.bullets, this.hurtEnemy, null, this);
        this.physics.add.collider(this.eBullets, this.Player, this.hitted, null, this);
    }


    shoot(cursor, that) {
        if (cursor.space.isDown) {
            that.bullet = new Bullets(that, that.player.x, that.player.y, 'bullet', 0, 20);
            that.bullets.add(that.bullet);
            that.bullets.setVelocityY(-500);
        }

    }
    enemyShoot(enemy, that) {
        let rand = Math.random();
        if (rand < 0.15) {
            that.ebullet = new Bullets(that, enemy.x, enemy.y, 'ebullet', 0, 10);
            that.eBullets.add(that.ebullet);
            that.ebullet.setVelocity(that.player.x - 255, that.player.y - 300);
        }
    }

    reduceHealth(enemy, player) {
        enemy.destroy();
        player.health -= 40;
        if (player.health <= 0) {
            this.gameOver()
        }

    }
    hurtEnemy(enemy, bullet) {
        enemy.health -= bullet.damage;

        bullet.destroy();
        if (enemy.health < 0) {
            enemy.destroy();
        }
    }

    hitted(bullet, player) {
        player.health -= bullet.damage;
        bullet.destroy();
        if (player.health <= 0) {
            this.gameOver()
        }
    }

    move(enemies) {
        let rand = Math.random();
        if (rand < 0.1) {
            this.moveEnemies(enemies);
        }
    }

    moveEnemies(enemies) {
        let that = this;
        enemies.getChildren().forEach((enemy) => {
            let randNumber = Math.floor((Math.random() * 4) + 1);
            switch (randNumber) {
                case 1:
                    enemy.body.setVelocityX(100);
                    break;
                case 2:
                    enemy.body.setVelocityX(-100);
                    break;
                case 3:
                    enemy.body.setVelocityY(100);
                    break;
                case 4:
                    enemy.body.setVelocityY(-100);
                    break;
                default:
                    enemy.body.setVelocityX(100);
            }
            that.enemyShoot(enemy, that);
        });
    }

    removeBullet(bullets, ebullets) {
        bullets.getChildren().forEach((bullet) => {
            if (bullet.y < 0) {
                bullet.destroy();
            }


        });
        ebullets.getChildren().forEach((ebullet) => {
            if (ebullet.y < 0 || ebullet.y > config.height || ebullet.x < 0 || ebullet.x > config.width) {
                ebullet.destroy();
            }


        });
    }
    gameOver() {
        this.scene.start('gameOver');
    }

    update() {
        this.bg.tilePositionY -= 2;
        this.player.update(this.cursor);
        this.shoot(this.cursor, this);
        this.move(this.enemies);
        this.removeBullet(this.bullets, this.eBullets);
        this.lev.text = this.player.health
    }
}