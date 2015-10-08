(function () {
	var stuffArr = [], 
		stuffLen = 1, 
		myCar, 
		dataWatch = true, 
		manifest, 
		preload, 
		background, 
		start, 
		CANVAS_WIDTH, 
		CANVAS_HEIGHT, 
		a = 0.5, 
		t = 0;

	var cas = document.getElementById('cas');

	var stage = new createjs.Stage(cas);
	// 设置canvas的高和宽
	CANVAS_WIDTH = stage.canvas.width = window.screen.width;
	CANVAS_HEIGHT = stage.canvas.height = window.screen.height;

	function init() {

		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		// createjs.Ticker.setFPS(60);
		loadStatics();
		// createjs.Ticker.addEventListener('tick', addImg);
		// var image = new createjs.Bitmap('res/images/bg.png');
		// stage.addChild(image);
		// function addImg(event) {
		// 	stage.update();
		// }

	}

	function loadStatics() {

		var basePath = 'res/images/';
		manifest = [
			{
				id: 'bg', 
				src: 'road.png'
			}, 
			{
				id: 'start_btn', 
				src: 'start_btn_01.png'
			}, 
			{
				id: 'car', 
				src: 'car.png'
			}, 
			{
				id: 'beauty1', 
				src: 'beauty1.png'
			},
			{
				id: 'beauty2', 
				src: 'beauty2.png'
			},
			{
				id: 'null', 
				src: 'null.png'
			},
		];

		preload = new createjs.LoadQueue(true, basePath);
		preload.addEventListener('progress', loading);
		preload.addEventListener('complete', handleComplete);
		preload.loadManifest(manifest);

	}

	function loading() {

		console.log((preload.progress * 100 | 0) + '%');
		stage.update();
	}

	function handleComplete() {

		var bg = preload.getResult('bg'), 
			startBtn = preload.getResult('start_btn');

		background = new createjs.Shape();
		background.graphics.beginBitmapFill(bg).drawRect(0, 0, bg.width, bg.height);
		// background.graphics.beginBitmapFill(startBtn, 'no-repeat').drawRect(20, 0, 231, 79);
		// 背景全图，缩放比例
		background.scaleX = CANVAS_WIDTH / bg.width;
		background.scaleY = CANVAS_HEIGHT / bg.height;
		// background.graphics.beginBitmapFill(startBtn).drawRect(0, 0, 231, 79);

		var button = new createjs.Shape();
		button.graphics.beginFill('yellow').arc(100, 100, 20, 0, Math.PI*2);

		stage.addChild(background);
		stage.addChild(button);
		stage.update();

		button.addEventListener('click', function() {
			background.graphics.clear();
			Container(Map());
			// pageStart();

		});

	}

	function adjustViewport(obj, o_width, o_height, f_width, f_height) {

		// 得到长宽比例
		var scaleX = f_width / o_width;
		var scaleY = f_height / o_height;

		obj.scaleX = scaleX;
		obj.scaleY = scaleY;
	}

	function pageStart() {

		var bg = preload.getResult('bg'), 
			bg_width = bg.width, bg_height = bg.height,
			btn = preload.getResult('start_btn'), 
			btn_width = btn.width, btn_height = btn.height,
			bgShape = new createjs.Shape(), 
			btnShape = new createjs.Shape();

		bgShape.graphics.beginBitmapFill(bg, 'no-repeat').drawRect(0, 0, bg_width, bg_height);
		adjustViewport(bgShape, bg_width, bg_height, CANVAS_WIDTH, CANVAS_HEIGHT);

		btnShape.graphics.beginBitmapFill(btn, 'no-repeat').drawRect(0, 0, btn_width, btn_height);
		adjustViewport(btnShape, btn_width, btn_height, 50, 50);
		// btnShape.x = (CANVAS_WIDTH - 50) / 2;
		// btnShape.y = CANVAS_HEIGHT - 50;
		// btn.addEventListener('click', function() {

		// 	Container(Map());
		// 	console.log(123);
		// });

		stage.addChild(bgShape);
		stage.addChild(btnShape);
		stage.update();

	}

	// 地图
	function Map() {

		var casDoubleH = CANVAS_HEIGHT * 2;
		var roadBg = preload.getResult('bg');
		var bg_width = roadBg.width, bg_height = roadBg.height;

		stage.clear();
		// 设置三张地图轮换
		var mapOne = new createjs.Shape();

		var mapTwo = new createjs.Shape();
		mapTwo.y = - CANVAS_HEIGHT;

		var mapThree = mapTwo.clone();
		mapThree.y = - CANVAS_HEIGHT * 2;

		setMap([mapOne, mapTwo, mapThree]);

		function setMap(objArr) {

			for(var i = 0;i < objArr.length;i ++){
				objArr[i].graphics.beginBitmapFill(roadBg).drawRect(0, 0, bg_width, bg_height);
				// 背景适应屏幕大小
				adjustViewport(objArr[i], bg_width, bg_height, CANVAS_WIDTH, CANVAS_HEIGHT);
			}
		}

		return [mapOne, mapTwo, mapThree];

	}

	// 汽车
	function CreateCar() {

		this.speed = 10;
		this.car = new createjs.Shape();
		this.carId = preload.getResult('car');
		this.coordinateY = 0;
		this.height = this.carId.height;

		var self = this;
		self.init();
	}
	CreateCar.prototype = {

		constructor: CreateCar, 

		init: function() {

			var self = this;
			self.draw();
			self.update();
		}, 

		draw: function() {

			var self = this;
			var car = self.car;
			var carId = self.carId;
			var coordinate = self.center();
			var x0 = coordinate[0], 
				y0 = coordinate[1], 
				x1 = coordinate[2], 
				y1 = coordinate[3];

			car.graphics.beginBitmapFill(carId, "no-repeat").drawRect(0, 0, x1, y1);
			car.x = x0;
			car.y = y0;

			stage.addChild(car);
			stage.update();
		}, 
		center: function() {

			var self = this;
			var carId = self.carId;
			var width = carId.width, height = carId.height;
			var centerX = (+CANVAS_WIDTH - +width) / 2;
			var bottomY = +CANVAS_HEIGHT - +height;

			return [centerX, bottomY, width, height];
		}, 
		update: function() {

			var self = this;
			var car = self.car;
			var s = (a * Math.pow(t, 2)) / 2;

			car.y -= s;

			t += (1 / 60);

			stage.update();

			self.coordinateY = car.y;

			if(car.y <= (CANVAS_HEIGHT - self.height) / 2) {

				return false;
			}

			requestAnimationFrame(self.update.bind(self));
		}
	};

	// 奖品
	function CreateStuff() {

		this.width = 100;
		this.height = 100;
		this.distanceX = 20;
		this.distanceY = 70;
		this.startY = -120;
		this.coordinateY = 0;
		this.index = stuffArr.length;
		this.status = true;
		// this.stuffL = new createjs.Shape();
		// this.stuffR = new createjs.Shape();
		// this.container = new createjs.Container();

		this.init();

		var self = this;
		createjs.Ticker.addEventListener('tick', self.update.bind(self));
	}
	CreateStuff.prototype = {

		constructor: CreateStuff, 

		_updateDis: 150, 
		_speed: 10,

		init: function() {

			this.left = Math.floor(Math.random() * 2);
			this.right = this.left === 1 ? 0 : Math.floor(Math.random() * 2);
			// this.status = true;
			this.stuffL = new createjs.Shape();
			this.stuffR = new createjs.Shape();
			this.container = new createjs.Container();

			this.draw();
		},

		draw: function() {

			var self = this;
			var disXL = self.distanceX;
			var disXR = CANVAS_WIDTH - self.distanceX - this.width;
			
			this.isPrize(self.left, disXL, 'left');
			this.isPrize(self.right, disXR, 'right');

			self.container.addChild(self.stuffL);
			self.container.addChild(self.stuffR);
			stage.addChild(self.container);
			stage.update();
		}, 
		isPrize: function(prize, disX, pos) {

			var _random = Math.floor(1 + Math.random() * 2);
			var beauty = preload.getResult('beauty' + _random);
			var _null = preload.getResult('null');
			var b_width = beauty.width, b_height = beauty.height;
			var _null_width = _null.width, _null_height = _null.height;
			var width = this.width, height = this.height;
			var startY = this.startY;

			var stuff = pos === 'left' ? this.stuffL : this.stuffR;
			if(prize > 0) {

				stuff.graphics.beginBitmapFill(beauty).drawRect(0, 0, b_width, b_height);
				adjustViewport(stuff, b_width, b_height, width, height);
			}else {

				stuff.graphics.beginBitmapFill(_null).drawRect(0, 0, _null_width, _null_height);
				adjustViewport(stuff, _null_width, _null_height, width, height);
			}
			stuff.x = disX;
			stuff.y = startY;

		}, 
		restart: function() {

			var self = this;
			var index = self.index;
			var last = parseInt(CANVAS_HEIGHT / self.height);

			if(index === 0) {

				if(stuffArr[last - 1]) {

					if(stuffArr[last - 1].container.y > self._updateDis && stuffArr[last - 1].container.y < (CANVAS_HEIGHT + self.height)) {

						self.init();
					}
				}
			}else {
				// debugger;
				if(stuffArr[index - 1].container.y > self._updateDis && stuffArr[index - 1].container.y < (CANVAS_HEIGHT + self.height)) {

					self.init();
				} 
			}
		},

		update: function(event) {

			var self = this;
			var last = parseInt(CANVAS_HEIGHT / self.height);
			var stuff = this.container;

			if(stuff.y > (CANVAS_HEIGHT + (-self.startY))) {

				// self.stuffL.graphics.clear();
				// self.stuffR.graphics.clear();
				// self.container.removeAllChildren();
				self.restart();
				return false;
			}

			if(stuff.y > self._updateDis && self.status && stuffArr.length < last) {

				stuffArr[stuffArr.length] = new CreateStuff();
				self.status = false;
			} 

			var s = (a * Math.pow(t, 2)) / 2 * 5;
			
			// 下落速度随车速变化而变化（同步）
			self._speed = parseInt(s);
			if(!event.paused){
				self.coordinateY = stuff.y;
				stuff.y += self._speed;
				// stage.update();
			}
		}
	};

	function Container(mapArr) {

		var bgContainer = new createjs.Container();
		bgContainer.addChild(mapArr[0], mapArr[1], mapArr[2]);

		stage.addChild(bgContainer);
		stage.update();

		function Move(event) {

			var s = (a * Math.pow(t, 2)) / 2 * 5;
			// 通过得到车位移，让地图也要经过相同位移

			if(mapArr[0].y >= CANVAS_HEIGHT) {	// 当超过屏幕时重新定义到末尾图

				mapArr[0].y = mapArr[2].y - CANVAS_HEIGHT;
			}

			if(mapArr[1].y >= CANVAS_HEIGHT) {
				
				mapArr[1].y = mapArr[0].y - CANVAS_HEIGHT;
			}

			if(mapArr[2].y >= CANVAS_HEIGHT) {

				mapArr[2].y = mapArr[1].y - CANVAS_HEIGHT;
			}

			if(!event.paused) {
				mapArr[0].y += s;
				mapArr[1].y += s;
				mapArr[2].y += s;

				stage.update();
			}

		}

		stuffArr[0] = new CreateStuff();
		myCar = new CreateCar();
		createjs.Ticker.addEventListener('tick', Move);
		createjs.Ticker.addEventListener('tick', dataCompare);
	}

	function dataCompare(event, callBack) {

		if(event.paused && dataWatch) {
			var len = stuffArr.length;
			var stuff;
			var range = [];

			for(var i = 0;i < len;i ++) {

				stuff = stuffArr[i];
				if(stuff.left || stuff.right) {

					range[0] = stuff.coordinateY + stuff.startY;
					range[1] = range[0] + stuff.height;
					range[2] = myCar.coordinateY;
					range[3] = range[2] + myCar.height;

					if(range[0] >= range[2] && range[1] <= range[3]) {	// 匹配范围

						addBeauty(range);
						dataWatch = false;
						break;
					}else {

						console.log('fail...');
						dataWatch = false;
					}
				} 
			}
		}else if(!event.paused) {

			dataWatch = true;
			console.log('watching...');
		}
	}

	// 匹配美女效果
	function addBeauty(range) {

		console.log('success');
	}

	init();

})();