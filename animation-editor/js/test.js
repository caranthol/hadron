var image = new Image();
var animationManager = new AnimationManager();
var ani1 = new Animation();
var ani2 = new Animation();
var ms = 100;
var xSprites = 5;
var ySprites = 1;

image = 'imgs/anim.png';

image.onload = function(){
	var w, h, y;
	w = this.width/xSprites;
	h = this.heighyxSprites;
	ani1.initAnimation(frameW, frameH, frameY, xSprites, ySprites, ms);
};
