class Beam extends Phaser.GameObjects.Sprite{
  constructor(scene){

    var x = scene.player.x;
    var y = scene.player.y - 16;

    super(scene, x, y, "beam");

    
    scene.add.existing(this);

    this.setScale(2);
    this.play("beam_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.y = -gameSettings.beamSpeed;

    scene.projectiles.add(this);

  }


  update(){
  
    if(this.y < 10 ){
      this.destroy();
    }
  }
}
