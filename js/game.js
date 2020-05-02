//Create a new scene
let gameScene = new Phaser.Scene("Game");

//Initiate scene parameters
gameScene.init = function(){
    this.playerSpeed = 10;
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 5;

    this.enemyMinY = 80;
    this.enemyMaxY = 280;
}

//Load assets
gameScene.preload = function(){
    this.load.image("background", "assets/background.png");
    this.load.image("player", "assets/player.png");
    this.load.image("dragon", "assets/dragon.png");
    this.load.image("goal", "assets/treasure.png");
}

//After the preload ends
gameScene.create = function(){

    this.bg = this.add.sprite(0, 0, "background");
    this.bg.setOrigin(0,0);

    this.goal = this.add.sprite(560, 180, "goal");
    this.goal.setScale(0.5);

    this.player = this.add.sprite(50, 180, "player");
    this.player.setScale(0.5);
    
    this.enemy = this.add.sprite(180, 180, "dragon");
    this.enemy.setScale(0.8)
    this.enemy.flipX = true;

    //Set enemy direction speed
    let dir = Math.random() < 0.5 ? 1 : -1; //Strange way to make an if statement
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    this.enemy.speed = dir * speed;

}

//Called up to 60 times a second
gameScene.update = function(){
    //Movement
    if(this.input.activePointer.isDown){
        this.player.x += this.playerSpeed;
    }
    
    let playerBounds = this.player.getBounds();
    let goalBounds = this.goal.getBounds();

    if(this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY){
        this.enemy.speed *= -1;
    }

    if(this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY){
        this.enemy.speed *= -1;
    }

    this.enemy.y += this.enemy.speed;

    //Restart the game on goal reach
    if(Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, goalBounds)){
        this.scene.restart();
        return;
    }
    //console.log(Math.random());
}

//Set the configuration of the game
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

//Create a new game, pass the configuration
let game = new Phaser.Game(config);

console.log(gameScene);
