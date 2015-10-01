
	var manifest, preload, background, start, C_W, C_H;

	var cas = document.getElementById('cas');

	var stage = new createjs.Stage(cas);
	C_W = stage.canvas.width;
	C_H = stage.canvas.height;
	stage.autoClear = true;

	function init() {

		loadStatics();
	}

	function loadStatics() {

		var basePath = 'res/';
		manifest = [
			{
				id: 'bg', 
				src: 'images/bg.png'
			}, 
			{
				id: 'start_btn', 
				src: 'images/start_btn_01.png'
			}
		];

		preload = new createjs.LoadQueue(true, basePath);
		preload.addEventListener('progress', loading);
		preload.addEventListener('complete', handleComplete);
		preload.loadManifest(manifest);

	}

	function loading() {

		console.log(`${preload.progress * 100 | 0}%`);
		stage.update();
	}

	function handleComplete() {

		var bg = preload.getResult('bg'), 
			startBtn = preload.getResult('start_btn');

		background = new createjs.Shape();
		background.graphics.beginBitmapFill(bg).drawRect(0, 0, C_W, C_H);

		start = new createjs.Shape();
		start.x = 44.5;
		start.y = 500;
		start.graphics.beginBitmapFill(startBtn).drawRect(0, 0, 231, 79);

		stage.addChild(background);
		stage.addChild(start);
		stage.update();
	}

	init();