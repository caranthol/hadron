'use strict';

function AnimationManager()
{   
	this.image;
	this.imageName;

	this.animations = [];
	this.currentAnimation;
}

AnimationManager.fromJSON = function(json)
{
	var am = new AnimationManager();
	var jsonObj = JSON.parse(json);
	
	am.image = jsonObj.image;
	am.imageName = jsonObj.imageName;
	am.frameWidth = jsonObj.frameWidth;
	am.frameHeight = jsonObj.frameHeight;
	am.timeBetweenframes = jsonObj.timeBetweenframes;
	am.timeSinceLastframe = jsonObj.timeSinceLastframe;
	am.currentAnimation = jsonObj.currentAnimation;
	
	return am;
};

AnimationManager.prototype.addAnimation = function(name, animation)
{
	this.animations[name] = animation;
};

AnimationManager.prototype.setAnimation = function(name)
{
	this.timeBetweenframes = this.animations[name].duration;
	this.timeSinceLastframe = this.timeBetweenframes;
	this.currentAnimation = name;
	this.animations[name].currentColumn = this.animations[name].startColumn;
	this.animations[name].currentRow = this.animations[name].startRow;
};
AnimationManager.prototype.draw = function(dt, context, x, y)
{
	this.animations[this.currentAnimation].draw(this.image, dt, context, x, y);
};

AnimationManager.prototype.drawImmediate = function(context, x, y)
{
	this.animations[this.currentAnimation].drawImmediate(this.image, context, x, y);
};