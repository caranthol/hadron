function Animation()
{   
    this.frameW = 0;
    this.frameH = 0;
    this.frameY = 0;
    this.cols = 0;
    this.rows = 0;
    this.fps = 0;
    this.xDef = 1;
    this.yDef = 1;
}

Animation.prototype.initAnimation = function(frameW, frameH, frameY, cols, rows, fps)
{
    this.frameW = frameW;
    this.frameH = frameH;
    this.frameY = frameY;
    this.cols = cols;
    this.rows = rows;
    this.fps = fps;
};

Animation.prototype.initAnimationFromJSON = function(json)
{
	var jsonObj = JSON.parse(json);
    this.frameW = jsonObj.frameW;
    this.frameH = jsonObj.frameH;
    this.frameY = jsonObj.frameY;
    this.cols = jsonObj.cols;
    this.rows =jsonObj. rows;
    this.fps = jsonObj.fps;
    this.destX = jsonObj.destX;
    this.destY = jsonObj.destY;
    this.xDef = jsonObj.xDef;
    this.yDef = jsonObj.yDef;
};

function AnimationManager()
{   
    this.image = null;
    this.imageName = null;
    this.currentframe = 0;
    this.timeBetweenframes = 0;
    this.timeSinceLastframe = 0;
    this.animations = [];
    this.currentAnimation = null;
}

AnimationManager.prototype.initAnimationManager = function(image)
{
    this.image = image;
    this.imageName = image.name;
};

AnimationManager.prototype.initAnimationManagerFromJSON = function(json)
{
	var jsonObj = JSON.parse(json);
    this.image = jsonObj.image;
    this.imageName = jsonObj.imageName;
    this.currentframe = jsonObj.currentframe;
    this.timeBetweenframes = jsonObj.timeBetweenframes;
    this.timeSinceLastframe = jsonObj.timeSinceLastframe;
    this.currentAnimation = jsonObj.currentAnimation;
};

AnimationManager.prototype.addAnimation = function(name, animation)
{
    this.animations[name] = animation;
};

AnimationManager.prototype.setAnimation = function(name)
{
    this.currentframe = 0;
    this.timeBetweenframes = 1/this.animations[name].fps;
    this.timeSinceLastframe = this.timeBetweenframes;
    this.currentAnimation = name;
};

AnimationManager.prototype.draw = function(dt, context, x, y)
{
    var sourceX = this.frameW * this.currentframe;
    var animation = this.animations[currentAnimation];
	var destW = animation.xDef*animation.frameW;
	var destH = animation.yDef*animation.frameH;
    context.drawImage(this.image, sourceX, animation.frameY, animation.frameW, animation.frameH, x, y, destW, destH);

    this.timeSinceLastframe -= dt;

    if (this.timeSinceLastframe <= 0)
    {
       this.timeSinceLastframe = this.timeBetweenframes;
       ++this.currentframe;
       this.currentframe %= animation.cols;
    }
};

AnimationManager.prototype.drawImmediate = function(context, x, y)
{
    var sourceX = this.frameW * this.currentframe;
    var animation = this.animations[currentAnimation];
	var destW = animation.xDef*animation.frameW;
	var destH = animation.yDef*animation.frameH;
    context.drawImage(this.image, sourceX, animation.frameY, animation.frameW, animation.frameH, x, y, destW, destH);
    ++this.currentframe;
    this.currentframe %= animation.cols;
};


