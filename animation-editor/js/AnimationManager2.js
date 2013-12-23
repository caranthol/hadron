'use strict';

function Animation()
{   
	this.fps = 30;

	this.startCol = 0;
	this.startRow = 0;
	this.endCol = 0;
	this.endRow = 0;
	this.currentCol = 0;
	this.currentRow = 0;

	this.xDef = 1;
	this.yDef = 1;
}

Animation.prototype.initAnimationFromJSON = function(json)
{
	var jsonObj = JSON.parse(json);
	this.currentCol = jsonObj.currentCol;
	this.currentRow = jsonObj.currentRow;
	this.fps = jsonObj.fps;
	this.xDef = jsonObj.xDef;
	this.yDef = jsonObj.yDef;
	this.startCol = jsonObj.startCol;
	this.startRow = jsonObj.startRow;
	this.endCol = jsonObj.endCol;
	this.endRow = jsonObj.endRow;
	this.loop = jsonObj.loop;
	this.dir = jsonObj.dir;
};

function AnimationManager()
{   
	this.image;
	this.imageName;
	this.frameW;
	this.frameH;
	this.cols = 1;
	this.rows = 1;
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
	this.frameW = jsonObj.frameW;
	this.frameH = jsonObj.frameH;
	this.cols = jsonObj.cols;
	this.rows = jsonObj.rows;
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
	this.timeBetweenframes = 1/this.animations[name].fps;
	this.timeSinceLastframe = this.timeBetweenframes;
	this.currentAnimation = name;
	this.animations[name].currentCol = this.animations[name].startCol;
	this.animations[name].currentRow = this.animations[name].startRow;
};

AnimationManager.prototype.draw = function(dt, context, x, y)
{
	var animation = this.animations[currentAnimation];
	var destW = animation.xDef*this.frameW;
	var destH = animation.yDef*this.frameH;

	var sourceX = this.frameW * animation.currentCol;
	var sourceY = this.frameH * animation.currentRow;

	context.drawImage(this.image, sourceX, sourceY, this.frameW,
			this.frameH, x, y, destW, destH);

	this.timeSinceLastframe -= dt;

	if (this.timeSinceLastframe <= 0)
	{
		this.timeSinceLastframe = this.timeBetweenframes;
		if(animation.currentCol == animation.endCol && animation.currentRow == animation.endRow){
			animation.currentCol = animation.startCol;
			animation.currentRow = animation.startRow;
		}
		else{
			++animation.currentCol;
			if(animation.currentCol%this.cols == 0){
				animation.currentCol %= this.cols;
				++animation.currentRow;
				if(animation.currentRow%this.cols == 0){
					animation.currentRow %= this.rows;
				}
			}
		}
	}
};

AnimationManager.prototype.drawImmediate = function(context, x, y)
{
	var animation = this.animations[this.currentAnimation];
	var destW = animation.xDef*this.frameW;
	var destH = animation.yDef*this.frameH;

	var sourceX = this.frameW * animation.currentCol;
	var sourceY = this.frameH * animation.currentRow;

	context.drawImage(this.image, sourceX, sourceY, this.frameW,
			this.frameH, x, y, destW, destH);

	if(animation.currentCol == animation.endCol && animation.currentRow == animation.endRow){
		animation.currentCol = animation.startCol;
		animation.currentRow = animation.startRow;
	}
	else{
		++animation.currentCol;
		if(animation.currentCol%this.cols == 0){
			animation.currentCol %= this.cols;
			++animation.currentRow;
			if(animation.currentRow%this.cols == 0){
				animation.currentRow %= this.rows;
			}
		}
	}
	/*if(loop == 'default'){
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
	}*/
};