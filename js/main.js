var game;
var score;
var soundOn = true;
var useLandscape=false;

window.onload = function () {

var isMobile=navigator.userAgent.indexOf("Mobile");
if (isMobile>-1)
     {
        isMobile=true;
     }
     else
     {
        isMobile=false;
     }

    if (isMobile==false) {
        //desktop laptop
        if (useLandscape == true) {
            game = new Phaser.Game(640, 480, Phaser.AUTO, "ph_game");
        } else {

            game = new Phaser.Game(480, 640, Phaser.AUTO, "ph_game");
        }

    } else {
        //mobile device
        game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
    }
    //a game state is just a screen.
    game.state.add("StateMain",StateMain);
    game.state.add("StateOver",StateOver);
    game.state.add("StateTitle",StateTitle);
    game.state.start("StateTitle");
}