var execute = function () {
	var stuffArr = [], // 人物数组
		stuffLen = 1, // 人物列表长度
		myCar, // 汽车对象变量
		mapLayer, // 地图对象变量
		dataWatch = true, // 全局监听开车和刹车变量
		pause = false, // 全局暂停变量
		manifest, // 图片应用缓存
		preload, // 预加载对象
		CANVAS_WIDTH, // canvas容器宽度
		CANVAS_HEIGHT, // canvas容器高度
		a = 1, // 加速度
		t = 0; // 时间

	var cas = document.getElementById('cas');

	var stage = new createjs.Stage(cas);
	// 设置canvas的高、宽与屏幕的高、宽一样
	CANVAS_WIDTH = stage.canvas.width = +document.body.clientWidth;
	CANVAS_HEIGHT = stage.canvas.height = +document.body.clientHeight;

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
				id: 'cover', 
				src: 'cover.png'
			},
			{
				id: 'challenge', 
				src: 'challenge.png'
			},
			{
				id: 'rule', 
				src: 'rule.png'
			},
			{
				id: 'start', 
				src: 'start.png'
			},
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

	function adjustViewport(obj, o_width, o_height, f_width, f_height) {

		// 得到长宽比例
		var scaleX = f_width / o_width;
		var scaleY = f_height / o_height;

		obj.scaleX = scaleX;
		obj.scaleY = scaleY;
	}


	function loading() {

		var mask = new createjs.Shape();
		mask.graphics.beginFill('rgba(0, 0, 0, 0.7)').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		var loading = (preload.progress * 100 | 0) + '%';
		var text = new createjs.Text(loading, '20px Arial', 'white');
		text.x = CANVAS_WIDTH / 2 - 15;
		text.y = CANVAS_HEIGHT / 2;
		text.textBaseline = "alphabetic";

		stage.removeAllChildren();
		stage.addChild(mask);
		stage.addChild(text);
		
		stage.update();
	}

	function handleComplete() {
		
		drawCover();

	}

	function drawCover() {

		var cover = preload.getResult('cover');
		var cover_width = cover.width, cover_height = cover.height;
		var challenge = preload.getResult('challenge');
		var cha_width = challenge.width, cha_height = challenge.height;

		var coverShape = new createjs.Shape();
		coverShape.graphics.beginBitmapFill(cover, 'no-repeat').drawRect(0, 0, cover_width, cover_height);

		var chaShape = new createjs.Shape();
		chaShape.graphics.beginBitmapFill(challenge, 'no-repeat').drawRect(0, 0, cha_width, cha_height);
		chaShape.x = CANVAS_WIDTH / 4;
		chaShape.y = CANVAS_HEIGHT - 98;
		chaShape.addEventListener('click', drawRule, false);

		adjustViewport(coverShape, cover_width, cover_height, CANVAS_WIDTH, CANVAS_HEIGHT);
		adjustViewport(chaShape, cha_width, cha_height, (CANVAS_WIDTH * 0.5), 50);

		stage.removeAllChildren();
		stage.addChild(coverShape);
		stage.addChild(chaShape);
		stage.update();
	}

	function drawRule() {

		var rule = preload.getResult('rule');
		var rule_width = rule.width, rule_height = rule.height;
		var start = preload.getResult('start');
		var start_width = start.width, start_height = start.height;

		var ruleShape = new createjs.Shape();
		ruleShape.graphics.beginBitmapFill(rule, 'no-repeat').drawRect(0, 0, rule_width, rule_height);

		var startShape = new createjs.Shape();
		startShape.graphics.beginBitmapFill(start, 'no-repeat').drawRect(0, 0, start_width, start_height);
		startShape.x = CANVAS_WIDTH / 4;
		startShape.y = CANVAS_HEIGHT - 135;
		startShape.addEventListener('click', function() {

			stage.removeAllChildren();
			drawStart();
		}, false);

		adjustViewport(ruleShape, rule_width, rule_height, CANVAS_WIDTH, CANVAS_HEIGHT);
		adjustViewport(startShape, start_width, start_height, (CANVAS_WIDTH * 0.55), 70);

		stage.removeAllChildren();
		stage.addChild(ruleShape);
		stage.addChild(startShape);
		stage.update();
	}

	// 倒计时函数
	function countDown(num) {

		var number = new createjs.Text(num, '42px Arial', 'yellow');
		number.x = CANVAS_WIDTH / 2 - 21;
		number.y = CANVAS_HEIGHT / 2;

		stage.addChild(number);
		stage.update();
		stage.removeChild(number);

		if(+number.text === 1) {
			console.log('start');
			return false;
		}

		setTimeout(function() {

			countDown(+number.text - 1);
		}, 1000);		
	}

	function drawTop() {

		var mask = new createjs.Shape();
		mask.graphics.beginFill('rgba(255, 255, 255, 0.8)').drawRect(0, 0, CANVAS_WIDTH, 70);

		stage.addChild(mask);
	}

	function drawBottom() {

		var	btn = preload.getResult('start_btn'), 
			btn_width = btn.width, btn_height = btn.height,
			btnShape = new createjs.Shape(), 
			maskShape = new createjs.Shape();

		btnShape.graphics.beginBitmapFill(btn, 'no-repeat').drawRect(0, 0, btn_width, btn_height);
		maskShape.graphics.beginFill('rgba(255, 255, 255, 0.8)').drawRect(0, CANVAS_HEIGHT - 90, CANVAS_WIDTH, 90);
		adjustViewport(btnShape, btn_width, btn_height, 50, 50);
		btnShape.x = (CANVAS_WIDTH - 50) / 2;
		btnShape.y = CANVAS_HEIGHT - 70;

		stage.addChild(maskShape);
		stage.addChild(btnShape);

		btnShape.addEventListener('click', function() {

			createjs.Ticker.paused = !createjs.Ticker.paused;
				// decelarate();
		});

	}

	function drawStart() {

		drawTop();
		drawBottom();
		countDown(4);

		mapLayer = new Map();
		myCar = new CreateCar(false);
		stuffArr[0] = new CreateStuff(true);
		setTimeout(function() {

			myCar.update();
			// 物品处理还需优化
			stuffArr[0].update(createjs.Ticker);
			createjs.Ticker.addEventListener('tick', function(event) {

				mapLayer.update(event);
				dataCompare(event);
				stage.update();
			});
		}, 4000);

		stage.update();
		
	}

	function decelarate() {

		if(t === 0) {
			return false;
		}
		t -= 1 / 60;

		requestAnimationFrame(decelarate);
	}

	// 地图
	function Map() {

		this.casDoubleH = CANVAS_HEIGHT * 2;
		this.road = preload.getResult('bg');
		this.width = this.road.width;
		this.height = this.road.height;
		this.map = new Array(3);
		this.container = new createjs.Container();

		stage.clear();
		// 设置三张地图轮换
		var self = this;
		self.init();

	}
	Map.prototype = {

		constructor: Map, 

		init: function() {

			var self = this;
			self.draw();
		}, 

		draw: function() {

			var self = this;
			var len = self.map.length;
			var road = self.road;
			var width = self.width, height = self.height;

			for(var i = 0;i < len;i ++) {
				self.map[i] = new createjs.Shape();
				self.map[i].graphics.beginBitmapFill(road).drawRect(0, 0, self.width, self.height);
				self.map[i].y = - CANVAS_HEIGHT * i;
				adjustViewport(self.map[i], width, height, CANVAS_WIDTH, CANVAS_HEIGHT);
				self.container.addChild(self.map[i]);
			}

			// stage.addChild(self.container);
			stage.addChildAt(self.container, 0);
		}, 

		update: function(event) {

			var self = this;
			var len = self.map.length;

			if(!event.paused) {

				var s = (a * Math.pow(t, 2)) / 2 * 5;

				for(var i = 0;i < len;i ++){
					if(self.map[i].y > CANVAS_HEIGHT) {

						self.map[i].y = i === 0 ? self.map[len - 1].y - CANVAS_HEIGHT : self.map[i - 1].y - CANVAS_HEIGHT;
					}
				}

				for(i = 0;i < len;i ++) {
					self.map[i].y += s;
				}
			}

		}
	};


	// 汽车
	function CreateCar(auto) {

		this.speed = 10;
		this.car = new createjs.Shape();
		this.carId = preload.getResult('car');
		this.coordinateY = 0;
		this.height = this.carId.height;
		this.auto = auto;

		var self = this;
		self.init();
		self.auto && self.update();
	}
	CreateCar.prototype = {

		constructor: CreateCar, 

		init: function() {

			var self = this;
			self.draw();
			// self.update();
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

			// stage.addChild(car);
			stage.addChildAt(car, 1);
			stage.update();
		}, 
		center: function() {

			var self = this;
			var carId = self.carId;
			var width = carId.width, height = carId.height;
			var centerX = (+CANVAS_WIDTH - +width) / 2;
			var bottomY = +CANVAS_HEIGHT - +height - 120;

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
	function CreateStuff(auto) {

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
		auto && createjs.Ticker.addEventListener('tick', self.update.bind(self));
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
			// stage.addChild(self.container);
			stage.addChildAt(self.container, 1);
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

				stuffArr[stuffArr.length] = new CreateStuff(true);
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

	function dataCompare(event, callBack) {

		if(event.paused && dataWatch) {
			var len = stuffArr.length;
			var stuff;
			var range = [];

			for(var i = 0;i < len;i ++) {

				stuff = stuffArr[i];
				if(stuff.left || stuff.right) {

					range[0] = stuff.coordinateY + stuff.startY + 10;	// 貌似是因为coordinateY没有及时更新导致值偏小一点，所以要加10px
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
			// console.log('watching...');
		}
	}

	// 匹配美女效果
	function addBeauty(range) {

		console.log('success');
	}

	init();

};

window.addEventListener('load', function() {

	execute();
}, false);