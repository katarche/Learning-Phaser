// Create new scene
let gameScene = new Phaser.Scene("Game");

//initiate scene parameters
gameScene.init = function(){
    this.playerSpeed = 2;
    this.enemySpeed= 3;
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
}


//Load assets
gameScene.preload = function(){
    //Loading the sprites
    this.load.image("background", "assets/background.png");
    this.load.image("player", "assets/player.png");
    this.load.image("enemy", "assets/dragon.png");
    this.load.image("goal", "assets/treasure.png");
}

//Called once after the preload ends
gameScene.create = function(){
    //Create bg sprite
    let bg = this.add.sprite(0,0, "background");
    //bg.setOrigin(0,0);
    bg.setPosition(config.width / 2, config.height / 2);

    //Create Player
    this.player = this.add.sprite(50, this.sys.game.config.height / 2, "player");
    this.player.setScale(0.5);

    this.enemy1 = this.add.sprite(150, 180, "enemy");
    this.enemy1.setScale(0.7);
    this.enemy1.flipX = true;

    this.goal = this.add.sprite(560, 180, "goal");
    this.goal.setScale(0.5);
    
    
};


//console.log(scale);

gameScene.update = function(){
 
    //Check for active input
    if(this.input.activePointer.isDown){
        this.player.x += this.playerSpeed;
    }

    let playerRect = this.player.getBounds();
    let gaolRect = this.goal.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, gaolRect)){
        console.log("GOD DEYUM");
        this.scene.restart();
        return;
    }

    //Enemny movement

    this.enemy1.y += this.enemySpeed;

   if(this.enemySpeed < 0 && this.enemy1.y <= this.enemyMinY){
        this.enemySpeed *= -1;
   }

   if(this.enemySpeed > 0 && this.enemy1.y >= this.enemyMaxY){
    this.enemySpeed *= -1;
}
    
}

//Set thee configuration of the game 
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

//Create a new game and pass the configuration
let game = new Phaser.Game(config);


//Testing stuff
//console.log('Test');
//console.log(gameScene);