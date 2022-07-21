class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
      }

create(){
  this.gameOverText = this.add.bitmapText(config.width/2-105, config.height/2-120, "pixelFont", "GameOver" , 60);
  this.gameOverText.setDepth(5);

  this.restartButton = this.add.sprite(config.width/2-80, config.height/2+15, "restartbutton");
  this.restartButton.setInteractive();
  this.restartButton.setDepth(5);

  this.homeButton = this.add.sprite(config.width/2+80, config.height/2+15, "homebutton");
  this.homeButton.setInteractive();
  this.homeButton.setDepth(5);
    
  let playGame = this.scene.get('playGame');
  var score = playGame.getScore();
  
//   console.log('done');

  this.gameScore = this.add.bitmapText(config.width/2-105, config.height/2-60, "pixelFont", "Your Score "+": "+ + score , 35);
  this.gameScore.setDepth(5);

  this.bg_gameOver = this.add.graphics(0);
  this.bg_gameOver.setDepth(3);
  this.bg_gameOver.fillStyle('0x302C2E',1);
  this.bg_gameOver.fillRectShape(config.width/2-120,config.height/2-80,200,200); 
  this.bg_gameOver.fillRect(config.width/2-150,config.height/2-140,300,200);


  this.restartButton.on('pointerdown', () => {
    this.scene.stop();
    this.scene.stop('playGame');
    this.scene.start('playGame');
    if(gameSettings.musicSetting){
      let bootGame = this.scene.get('bootGame');
      bootGame.playMusic();}
  });

  this.homeButton.on('pointerdown', () => {
    this.scene.stop();
    this.scene.stop('playGame');
    this.scene.resume('bootGame');
  });
}

zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
}

}