var StateMain={    
    //load images into library
    preload:function()
     {
        game.load.image("red","images/main/blocks/red.png");
        game.load.image("blue","images/main/blocks/blue.png");
        game.load.image("green","images/main/blocks/green.png");
        game.load.image("yellow","images/main/blocks/yellow.png");
        game.load.spritesheet("rings","images/main/rings.png",60,65,5);
        game.load.spritesheet("balls","images/main/balls.png",35,35,5);
        game.load.audio("points", 'sounds/points.mp3');
        game.load.audio("gameOver", 'sounds/gameOver.mp3');
        game.load.spritesheet("soundButtons","images/ui/soundButtons.png",32,32,2)
     },
     //sets up objects, variables, where all the parts come together.
     //sounds, texts,
     //good guys, bad guys, explosions.
     create:function(){

      this.speed = 200;
      this.incSpeed = 20;
      this.maxSpeed = 450;
      score = 0;

      game.physics.startSystem(Phaser.Physics.Arcade);

      this.pointSound = game.add.audio("points");
      this.gameOverSound = game.add.audio("gameOver");

      //blocks  
      let red = game.add.image(0,0,"red");
      let blue = game.add.image(0,100,"blue");
      let green = game.add.image(100,0,"green");
      let yellow = game.add.image(100,100,"yellow");

      red.inputEnabled=true;
      red.name ="red";

      blue.inputEnabled=true;
      blue.name ="blue";

      green.inputEnabled=true;
      green.name ="green";

      yellow.inputEnabled=true;
      yellow.name ="yellow";

      red.events.onInputDown.add(this.changeColor,this);
      blue.events.onInputDown.add(this.changeColor,this);
      green.events.onInputDown.add(this.changeColor,this);
      yellow.events.onInputDown.add(this.changeColor,this);

      

      this.blockGroup = game.add.group();
      this.blockGroup.add(red);
      this.blockGroup.add(blue);
      this.blockGroup.add(green);
      this.blockGroup.add(yellow);
        //rings
      this.blockGroup.x = game.world.centerX-this.blockGroup.width/2;
      this.blockGroup.y = game.world.height-250;

      this.ring = game.add.image(game.world.centerX,this.blockGroup.y-100,"rings");
      this.ring.anchor.set(0.5,0.5);
    //ball
    //why a sprite? Physics can only be enabled to sprites. not images. Always use sprite for physics
      this.ball = game.add.sprite(0,0,"balls");
      this.ball.anchor.set(0.5,0.5);
      game.physics.arcade.enable(this.ball);

    //Score Text
    this.scoreText = game.add.text(game.world.centerX,150,"0");
    this.scoreText.fill ="#ffffff";
    this.scoreText.fontSize = 64;
    this.scoreText.anchor.set(0.5,0.5);

    this.scoreLabel = game.add.text(game.world.centerX,100,"score");
    this.scoreLabel.fill ="#ffffff";
    this.scoreLabel.fontSize = 32;
    this.scoreLabel.anchor.set(0.5,0.5);
    //sound buttons
    this.soundButton = game.add.image(20,20,"soundButtons")
    this.soundButton.inputEnabled = true;
    
    if (soundOn == true) {
        this.soundButton.frame = 0;

    } else {
        this.soundButton.frame = 1;
    }
    this.setListeners();

    this.resetBall();
      

     },
     setListeners: function() {
        game.input.onUp.add(this.resetRing, this);
        this.soundButton.events.onInputDown.add(this.toggleSound,this);
     },
     toggleSound:function() {
         soundOn = !soundOn;
         if (soundOn == true) {
             this.soundButton.frame = 0;

         } else {
             this.soundButton.frame = 1;
         }

     },
     resetBall: function (){
         let color = game.rnd.integerInRange(0, 5);
         let xx = game.rnd.integerInRange(0, game.world.width);
         let yy =game.rnd.integerInRange(0, 100);
        this.ball.frame = color;
        this.ball.x = xx;
        this.ball.y = yy;
        this.ball.body.velocity.setTo(0,100);
       let rot = game.physics.arcade.moveToXY(this.ball,this.ring.x,this.ring.y,this.speed)
       this.ball.rotation = rot;

       this.speed += this.incSpeed;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
            
        }
     },
     changeColor:function(target) {
         console.log(target.name);
         //0= white, 1=blue 2=green 3=red 4=yellow
         switch(target.name){
         case "red":
         this.ring.frame = 3;
         break;
     case "blue":
         this.ring.frame = 1;
         break;
     case "green":
         this.ring.frame = 2;
         break;
     case "yellow":
         this.ring.frame = 4;
         break;
      } 
     },
     resetRing (){
         this.ring.frame = 0;
     },
     //constant running loop. use this to check collisions, movements, ect.
     update:function()
     {       //use Math abs to get to absolute value. ignore if a number is negative so -5 =5 
      let diffx = Math.abs(this.ring.x-this.ball.x);
      let diffy = Math.abs(this.ring.y-this.ball.y);

      if (diffx <10 && diffy <10) {
          this.ball.body.velocity.setTo(0,0);

          if(this.ball.frame == this.ring.frame) {
              this.resetBall();
              score++;
              this.scoreText.text =score;
              if (soundOn == true)
              this.pointSound.play();
          } else {
              if (soundOn == true){
                this.gameOverSound.play();
              }
              game.state.start("StateOver");
          }
      }
     }
 }