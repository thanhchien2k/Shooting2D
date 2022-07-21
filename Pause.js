class Pause extends Phaser.Scene {
    constructor() {
        super("pauseGame");
      }

create(){
  this.pauseText = this.add.bitmapText(config.width/2-60, config.height/2-110, "pixelFont", "Pause" , 60);
  this.pauseText.setDepth(5);

  this.playButton = this.add.sprite(config.width/2, config.height/2, "playbutton");
  this.playButton.setInteractive();
  this.playButton.setDepth(5);

  this.restartButton = this.add.sprite(config.width/2-80, config.height/2, "restartbutton");
  this.restartButton.setInteractive();
  this.restartButton.setDepth(5);

  this.homeButton = this.add.sprite(config.width/2+80, config.height/2, "homebutton");
  this.homeButton.setInteractive();
  this.homeButton.setDepth(5);

  this.bg_Pause = this.add.graphics(0);
  this.bg_Pause.setDepth(3);
  this.bg_Pause.fillStyle('0x302C2E',1);
  this.bg_Pause.fillRectShape(config.width/2-120,config.height/2-80,200,200); 
  this.bg_Pause.fillRect(config.width/2-150,config.height/2-140,300,200);

  this.playButton.on('pointerdown', () => {
    this.scene.stop();
    this.scene.resume('playGame');
    if(gameSettings.musicSetting){
    let bootGame = this.scene.get('bootGame');
    bootGame.resumeMusic();}
    
  });

  this.restartButton.on('pointerdown', () => {
    this.scene.stop();
    this.scene.stop('playGame');
    this.scene.start('playGame');
    if(gameSettings.musicSetting){
      let bootGame = this.scene.get('bootGame');
      bootGame.playMusic();}

      let playGame = this.scene.get('playGame');
      playGame.resetHeart();
  });

  this.homeButton.on('pointerdown', () => {
    this.scene.stop();
    this.scene.stop('playGame');
    this.scene.resume('bootGame');
    let playGame = this.scene.get('playGame');
    playGame.resetHeart();
  });
}

}