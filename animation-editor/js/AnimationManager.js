'use strict';
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


function Animation()
{   
	this.frameW;
	this.frameH;

	this.cols = 1;
	this.rows = 1;

	this.fps = 30;

	this.startX = 1;
	this.startY = 1;
	this.endX = 1;
	this.endY = 1;
	this.currentX = 1;
	this.currentY = 1;

	this.xDef = 1;
	this.yDef = 1;

	this.loop = 'default';
	this.dir = 1;
}

Animation.prototype.initAnimationFromJSON = function(json)
{
	var jsonObj = JSON.parse(json);
	this.frameW = jsonObj.frameW;
	this.frameH = jsonObj.frameH;
	this.currentX = jsonObj.currentX;
	this.currentY = jsonObj.currentY;
	this.cols = jsonObj.cols;
	this.rows =jsonObj. rows;
	this.fps = jsonObj.fps;
	this.xDef = jsonObj.xDef;
	this.yDef = jsonObj.yDef;
	this.startX = jsonObj.startX;
	this.startY = jsonObj.startY;
	this.endX = jsonObj.endX;
	this.endY = jsonObj.endY;
	this.loop = jsonObj.loop;
	this.dir = jsonObj.dir;
};

function AnimationManager()
{   
	this.image;
	this.imageName;
	this.currentframe = 0;
	this.timeBetweenframes;
	this.timeSinceLastframe;
	this.animations = [];
	this.currentAnimation;
}

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

var imageObj = new Image();

AnimationManager.prototype.drawImmediate = function(context, x, y)
{
	imageObj.onload = function() {
		var animation = this.animations[currentAnimation];
		var destW = animation.xDef*animation.frameW;
		var destH = animation.yDef*animation.frameH;

		var sourceX = this.frameW * this.currentX;
		var sourceY = this.frameH * this.currentY;

		context.drawImage(this.image, sourceX, sourceY, animation.frameW,
				animation.frameH, x, y, destW, destH);

		if(loop == 'default'){
			if (currentY < destY){
				if (currentX <= cols)
					currentX += 1;
				else{
					currentX = 1;
					currentY +=1;
				}

			}
			else if (currentY == destY){
				if(currentX < destX)
					currentX += 1;
				else{
					currentX = startX;
					currentY = startY;
				}
			}
		}
		else if (loop == 'reverse'){
			if (dir == 1){
				if (currentY < destY){
					if (currentX <= cols)
						currentX += 1;
					else{
						currentX = 1;
						currentY +=1;
					}

				}
				else if (currentY == destY){
					if(currentX < destX)
						currentX += 1;
					else{
						if(currentX > 1){
							currentX -= 1;
							dir == -1;
						}
						else{
							currentX = cols;
							currentY -= 1;
							dir == -1;
						}
					}
				}
			}
			else{
				if (currentY > startY){
					if (currentX > 1)
						currentX -= 1;
					else{
						currentX = cols;
						currentY -=1;
					}

				}
				else if (currentY == startY){
					if(currentX > startX)
						currentX -= 1;
					else{
						if(currentX < cols){
							currentX += 1;
							dir = 1;
						}
						else{
							currentX = 1;
							currentY += 1;
							dir == 1;
						}
					}
				}
			}
		}
	};
	imageObj.src = AnimationManager.image;
};