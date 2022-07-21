//var effectSetting = true;
//gameSettings.playerSpeed=239;
var numHeart = 3 ;
var addNum = true;
class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }


  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);
    this.background.setScale(2);

    this.ship1 = this.add.sprite(config.width / 2 - 150, config.height , "ship");
    this.ship2 = this.add.sprite(config.width / 2, config.height , "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 150, config.height, "ship3");
    this.ship3.setScale(2);
    this.ship2.setScale(2);
    this.ship1.setScale(2);
    
    this.heart1 = this.add.sprite(config.width-80,10,"heart");
    this.heart1.setDepth(5);

    this.heart2 = this.add.sprite(config.width-110,10,"heart");
    this.heart2.setDepth(5);

    this.heart3 = this.add.sprite(config.width-140,10,"heart");
    this.heart3.setDepth(5);


    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();


    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    this.addPower();

    // add player ship
    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "player");
    this.player.setScale(2);
    this.player.play("thrust");

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
      projectile.destroy();
    });
    //overlap between player and power
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

    //overlap between player and enemies
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

    //enemies and beam
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 22);
    graphics.lineTo(0, 22);
    graphics.lineTo(0, 0);
    //
    graphics.closePath();
    graphics.fillPath();
    
    this.score = 0;
    //this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "Score :  " + scoreFormated  , 20);

    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.explosionSound2 = this.sound.add("audio_explosion2");
    this.pickupSound = this.sound.add("audio_pickup");

  

  this.pause = this.add.sprite(config.width-10,10,"pause");
  this.pause.setInteractive();
  
  this.pause.on('pointerdown', () => {
    if(gameSettings.musicSetting){
    let bootGame = this.scene.get('bootGame');
    bootGame.pauseMusic();
    }
    this.scene.sendToBack('playGame');
    this.scene.pause();
    this.scene.sendToBack('bootGame');
    this.scene.launch('pauseGame'); 
  });


  }


  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.score+=50;
    gameSettings.playerSpeed+=15;
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    if(gameSettings.effectSetting){
    this.pickupSound.play();}
  }

  hurtPlayer(player, enemy) {
    if(this.player.alpha < 1){
      return;
  }
    if(numHeart>0){
    numHeart = numHeart -1;}
    if(numHeart==2){
      this.heart1.setVisible(false);
    }
    else if(numHeart==1){
      this.heart2.setVisible(false);
    }
    else{
      if(gameSettings.musicSetting){
        let bootGame = this.scene.get('bootGame');
        bootGame.pauseMusic();
        }
      this.heart3.setVisible(false);
      this.scene.sendToBack('playGame');
      this.scene.pause();
      this.scene.sendToBack('bootGame');
      this.scene.launch('gameOver'); 
      numHeart = 3;
    }


    this.resetShipPos(enemy);
    var explosion = new Explosion(this, player.x, player.y);
    this.player.disableBody(true, true);
    if(gameSettings.effectSetting){
    this.explosionSound.play();}
   // this.player.active= false;
   this.time.addEvent({
    delay: 1000,
    callback: this.resetPlayer,
    callbackScope: this,
    loop: false
  });
  
  }

  resetHeart(){
    numHeart =3 ;
  }

  getScore(){
    var gameScore = this.score;
    return gameScore;
  }

  hitEnemy(projectile, enemy) {
    var explosion = new Explosion(this, enemy.x, enemy.y);
    this.score += 15;
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    projectile.destroy();
    this.resetShipPos(enemy);
    // thêm tiếng cho vụ nổ
    if( gameSettings.effectSetting){
    this.explosionSound.play();}
  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
}


resetPlayer(){
  var x = config.width / 2 - 8;
  var y = config.height + 64;
  this.player.enableBody(true, x, y, true, true);

  this.player.alpha = 0.5;
  var tween = this.tweens.add({
    targets: this.player,
    y: config.height - 64,
    ease: 'Power1',
    duration: 1500,
    repeat:0,
    onComplete: function(){
      this.player.alpha = 1;
    },
    callbackScope: this
  });
}

raise1Ship(){
    this.moveShip(this.ship1, 2);
    this.moveShip(this.ship2, 2.5);
    this.moveShip(this.ship3, 3);
}

raise2Ship(){
  this.moveShip(this.ship1, 3);
  this.moveShip(this.ship2, 3.5);
  this.moveShip(this.ship3, 4);
}

  update() {


    //if(gamePause==true) this.scene.pause();

    this.time.addEvent({
      delay: 10000,
      callback: this.raise1Ship,
      callbackScope: this,
      loop: false
    });

    this.time.addEvent({
      delay: 30000,
      callback: this.raise2Ship,
      callbackScope: this,
      loop: false
    });

    if(addNum){
      addNum = false
     this.time.addEvent({
       delay: 10000,
      callback: this.addPower,
       callbackScope: this,
       loop: false
     });
    }

    this.moveShip(this.ship1, 1.5);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 2.5);
    // this.ship1.alpha = 0;
    // this.ship2.alpha = 0;
    // this.ship3.alpha = 0;

    this.background.tilePositionY -= 0.5;

  

    this.movePlayerManager();


    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      if(this.player.active){
      this.shootBeam();
      }
  }

  for(var i = 0; i < this.projectiles.getChildren().length; i++){
    var beam = this.projectiles.getChildren()[i];
    beam.update();
  }
  

  }

  shootBeam() {
    var beam = new Beam(this);
    if( gameSettings.effectSetting){
    this.beamSound.play();}
  }
  
  movePlayerManager(){

    this.player.setVelocity(0);

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }



  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  destroyShip(pointer, gameObject) {
    
    gameObject.play("explode");
    this.explode.setScale(2);
  }

  addPower(){
    for (var i = 0; i < gameSettings.maxPowerups; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      powerUp.setScale(1.3);
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }


  }

  reAddNum(){
    if(!addNum) addNum=true;
  }
}
