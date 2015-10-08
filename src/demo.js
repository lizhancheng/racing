var data = new createjs.SpriteSheet({
  "images": ["res/images/car.png"],
  "frames": {"regX": 0, "height": 96, "count": 10, "regY": 0, "width": 75},
  "animations": {"walk": [0, 9]}
});
character = new createjs.Sprite(data, "walk");
character.play();

var canvas = document.getElementById("cas");
var stage = new createjs.Stage(canvas);
var circle = new createjs.Shape();
circle.graphics.beginFill('red').drawRect(0, 0, 100, 100);
stage.addChild(character);
stage.update();