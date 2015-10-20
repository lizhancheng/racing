var canvas = document.getElementById("cas");
var stage = new createjs.Stage(canvas);
// stage.canvas.height = "600";
// stage.canvas.width = "1000";

var spriteSheet = new createjs.SpriteSheet({
			framerate: 5,
			"images": ["res/images/bird.jpg"],
			"frames": {"regX": 20, "height": 85, "count": 8, "regY": 0, "width": 141},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 7, "run", 1],
				"jump": [26, 63, "run"]
			}
		});
	var grant = new createjs.Sprite(spriteSheet, "run");
	grant.x = 50;
	// grant.y = 22;
	// Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
	// stage.addChild(grant);
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", stage);

// var layer1 = new createjs.Shape();
// var layer2 = new createjs.Shape();
// var layer3 = new createjs.Shape();

// layer1.graphics.beginFill('red').drawRect(0, 0, 100, 100);
// layer2.graphics.beginFill('blue').drawRect(30, 30, 100, 100);
// layer3.graphics.beginFill('green').drawRect(60, 60, 100, 100);

// // stage.addChildAt(layer1, 1);
// // stage.addChildAt(layer2, 1);
// // stage.addChildAt(layer3, 2);
// stage.addChildAt(layer1, 1);
// stage.addChildAt(layer2, 1);
// stage.addChild(layer3);

// stage.update();
// 

// var circle = new createjs.Shape();
// circle.graphics.beginFill('rgba(200, 0, 0, 0.5)').arc(0, 0, 30, 0, Math.PI * 2);
// circle.x = circle.y = 100;
// var text = new createjs.Text('开始', '18px Arial', 'black');
// text.x = 82.5, text.y = 90;

// stage.addChild(circle);
// stage.addChild(text);
// stage.update();