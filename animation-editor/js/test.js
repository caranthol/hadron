var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var animationManager = new AnimationManager();
var image = new Image();
var ani1 = new Animation();
var ani2 = new Animation();
var ani3 = new Animation();
var fs1 = new FrameSet();
var xSprites = 31;
var ySprites = 21;
var imgLoaded = false;
var inter;

image.src = 'imgs/anim2.png';

image.onload = function()
{
	var w, h;
	w = this.width/xSprites;
	h = this.height/ySprites;

	ani1.startColumn = 0;
	ani1.startRow = 0;
	ani1.endColumn = 4;
	ani1.endRow = 0;
	//ani1.duration = duration;

	ani2.startColumn = 0;
	ani2.startRow = 0;
	ani2.endColumn = 15;
	ani2.endRow = 5;
	//ani2.duration = duration;

	ani3.frameSet = fs1;
	ani3.startColumn = 0;
	ani3.startRow = 0;
	ani3.endColumn = 30;
	ani3.endRow = 20;
	ani3.duration = 100;
	ani3.columns = xSprites - 1;
	ani3.rows = ySprites - 1;
	//ani3.loop='reverse';

	animationManager.image = this;
	animationManager.imageName = this.name;
	animationManager.addAnimation("1", ani1);
	animationManager.addAnimation("2", ani2);
	animationManager.addAnimation("3", ani3);
	animationManager.setAnimation("3");
	animationManager.animations[animationManager.currentAnimation].frameSet.frameHeight = h;
	animationManager.animations[animationManager.currentAnimation].frameSet.frameWidth = w;
	inter = ani3.duration;

	imgLoaded = true;
};

/*while(imgLoaded == false)
{

}*/
draw = function(){
	if(imgLoaded == true)
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
		animationManager.drawImmediate(context,0,0);
	}
};
var simulation = setInterval(draw, 100);
//animationManager.drawImmediate(context,0,0);