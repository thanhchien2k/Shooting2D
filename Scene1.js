
var musicConfig = {
  mute: false,
  volume: 1,
  rate: 1,
  detune: 0,
  seek: 0,
  loop: true,
  delay: 0
};
class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
  
  init(){
    this.cursors = this.input.keyboard.createCursorKeys()
  }
  preload(){
    this.load.image("background", "assets/images/background.png");


    //
    this.load.spritesheet("ship", "assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "assets/spritesheets/player.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    this.load.image('glass-panel', 'assets/glassPanel.png')
		this.load.image('cursor-hand', 'assets/cursor_hand.png')

    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_explosion2", ["assets/sounds/explosion2.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["assets/sounds/space-asteroids.ogg", "assets/sounds/space-asteroids.mp3"]);

    this.load.image('buttonBG', 'assets/images/button-bg.png');
    this.load.image('buttonText', 'assets/images/button-text.png');

    this.load.image("pause","assets/images/pause.png")
    this.load.image("homebutton","assets/images/homebutton.png")
    this.load.image("restartbutton","assets/images/restartbutton.png")
    this.load.image("playbutton","assets/images/playbutton.png")
    this.load.image("on_setting", "assets/images/on_setting.png")
    this.load.image("off_setting", "assets/images/off_setting.png")
  
    this.load.image("on_music","assets/images/on_music.png")
    this.load.image("off_music","assets/images/off_music.png")
    this.load.image("on_effect","assets/images/on_effect.png")
    this.load.image("off_effect","assets/images/off_effect.png")

    this.load.image("heart","assets/images/heart.png")
    this.load.image("no_heart","assets/images/no_heart.png")
  }

  create() {
    this.music = this.sound.add("music");

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);
    this.background.setScale(2);

    var bg = this.add.image(0, 0, 'buttonBG');
    var text = this.add.image(0, 0, 'buttonText');
    const playButton = this.add.container(config.width/2,config.height/2-80,[bg,text]);

    bg.setInteractive();
    bg.on('pointerdown', () => { 
      if(gameSettings.musicSetting){
        this.playMusic();
      }
      else{
        this.stopMusic();
      }
      this.scene.sendToBack('bootGame')
      this.scene.pause();
      this.scene.launch('playGame'); });

    this.off_setting = this.add.sprite(config.width/2+200, config.height/2+90, "off_setting");
    this.off_setting.setInteractive();

    
    this.on_setting = this.add.sprite(config.width/2+200, config.height/2+90, "on_setting");
    this.on_setting.setInteractive();
    this.on_setting.setActive(false);
    this.on_setting.setVisible(false);

    this.on_music = this.add.sprite(config.width/2+130, config.height/2+90, "on_music");
    this.on_music.setInteractive();
    this.on_music.setActive(false);
    this.on_music.setVisible(false);

    this.off_music = this.add.sprite(config.width/2+130, config.height/2+90, "off_music");
    this.off_music.setInteractive();
    this.off_music.setActive(false);
    this.off_music.setVisible(false);

    this.on_effect = this.add.sprite(config.width/2+60, config.height/2+90, "on_effect");
    this.on_effect.setInteractive();
    this.on_effect.setActive(false);
    this.on_effect.setVisible(false);
    
    this.off_effect = this.add.sprite(config.width/2+60, config.height/2+90, "off_effect");
    this.off_effect.setInteractive();
    this.off_effect.setActive(false);
    this.off_effect.setVisible(false);


    this.off_setting.on('pointerdown', () => { 
      this.off_setting.setActive(false);
      this.off_setting.setVisible(false);

      this.on_setting.setActive(true);
      this.on_setting.setVisible(true);

      if(gameSettings.musicSetting){
        this.on_music.setActive(true);
        this.on_music.setVisible(true);
      }
      else{
      this.off_music.setActive(true);
      this.off_music.setVisible(true);
      }

      if(gameSettings.effectSetting){
        this.on_effect.setActive(true);
        this.on_effect.setVisible(true);
      }
      else{
      this.off_effect.setActive(true);
      this.off_effect.setVisible(true);
    }


    });

    
    this.on_setting.on('pointerdown', () => { 
      this.off_setting.setActive(true);
      this.off_setting.setVisible(true);

      this.on_setting.setActive(false);
      this.on_setting.setVisible(false);

      this.on_music.setActive(false);
      this.on_music.setVisible(false);

      this.on_effect.setActive(false);
      this.on_effect.setVisible(false);
  
      this.off_music.setActive(false);
      this.off_music.setVisible(false);

      this.off_effect.setActive(false);
      this.off_effect.setVisible(false);
  

    });

    this.on_music.on('pointerdown', () => { 

      this.on_music.setActive(false);
      this.on_music.setVisible(false);

      this.off_music.setActive(true);
      this.off_music.setVisible(true);

      gameSettings.musicSetting = false;
  

    });
    
    this.off_music.on('pointerdown', () => { 

      this.on_music.setActive(true);
      this.on_music.setVisible(true);

      this.off_music.setActive(false);
      this.off_music.setVisible(false);

      gameSettings.musicSetting = true;
  
    });

    this.on_effect.on('pointerdown', () => { 

      this.on_effect.setActive(false);
      this.on_effect.setVisible(false);

      this.off_effect.setActive(true);
      this.off_effect.setVisible(true);

      gameSettings.effectSetting = false;

    });

    this.off_effect.on('pointerdown', () => { 

      this.on_effect.setActive(true);
      this.on_effect.setVisible(true);

      this.off_effect.setActive(false);
      this.off_effect.setVisible(false);
      gameSettings.effectSetting = true;

    });


    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });

  }

  resumeMusic(){

    this.music.resume();
  }

  playMusic(){

    this.music.play(musicConfig);
  }

  stopMusic(){

    this.music.stop();
  }

  pauseMusic(){

    this.music.pause();
  }

}