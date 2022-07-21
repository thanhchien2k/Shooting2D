var gameSettings = {
  playerSpeed: 239,
  beamSpeed:  250,
  maxPowerups: 2,
  powerUpVel: 70,
  effectSetting: true,
  musicSetting:true
}
var config = {
  width: 512,
  height: 542,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2, Pause, GameOver],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: false,
        debugShowVelocity: false

    }
  }
}


var game = new Phaser.Game(config);
