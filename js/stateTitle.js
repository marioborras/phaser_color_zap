var StateTitle={    
    //load images into library
    preload:function()
     {
         //first parameter is library key, second para is the path to image
        game.load.image("logo","images/title/gameLogo.png");
        game.load.spritesheet('buttons', 'images/ui/buttons.png', 264, 74,);
        //locks the orientation, takes two parameters , first is landscape, second is portrait
        game.scale.forceOrientation(false, true);
     },
     //sets up objects, variables, where all the parts come together.
     //sounds, texts,
     //good guys, bad guys, explosions.
     create:function()
     {
        this.logo=game.add.sprite(game.world.centerX,180,"logo");
        this.logo.anchor.set(0.5,0.5);
        //START button
        this.btnStart = game.add.button(game.world.centerX,game.world.height-150,"buttons",this.startGame,this,7,6,7);
        this.btnStart.anchor.set(0.5,0.5);

        this.setListeners();
  
     },
     startGame: function() {
        game.state.start("StateMain");
     },
     //constant running loop. use this to check collisions, movements, ect.
     update:function()
     {       
    
     }    
     
 }