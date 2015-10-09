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

var layer1 = new createjs.Shape();
var layer2 = new createjs.Shape();
var layer3 = new createjs.Shape();

layer1.graphics.beginFill('red').drawRect(0, 0, 100, 100);
layer2.graphics.beginFill('blue').drawRect(30, 30, 100, 100);
layer3.graphics.beginFill('green').drawRect(60, 60, 100, 100);

// stage.addChildAt(layer1, 1);
// stage.addChildAt(layer2, 1);
// stage.addChildAt(layer3, 2);
stage.addChildAt(layer1, 1);
stage.addChildAt(layer2, 1);
stage.addChild(layer3);

stage.update();