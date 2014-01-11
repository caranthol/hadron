'use strict';

function Animation()
{   
	this.duration = 400;
	
	this.startColumn = 0;
	this.startRow = 0;
	this.endColumn = 0;
	this.endRow = 0;
	this.currentColumn = 0;
	this.currentRow = 0;
	
	this.columns = 1;
	this.rows = 1;
	
	this.loop = 'default';
	this.dir = 1;
	
	this.timeSinceLastframe;

	this.frameSet;
}

Animation.fromJSON = function(json)
{
	var animation = new Animation();
	var jsonObj = JSON.parse(json);
	
	animation.currentColumn = jsonObj.currentColumn;
	animation.currentRow = jsonObj.currentRow;
	animation.duration = jsonObj.duration;
	animation.widthDeformation = jsonObj.widthDeformation;
	animation.heightDeformation = jsonObj.heightDeformation;
	animation.startColumn = jsonObj.startColumn;
	animation.startRow = jsonObj.startRow;
	animation.endColumn = jsonObj.endColumn;
	animation.endRow = jsonObj.endRow;
	animation.loop = jsonObj.loop;
	animation.dir = jsonObj.dir;
	animation.rows = jsonObj.rows;
	animation.columns = jsonObj.columns;
	
	return animation;
};
Animation.prototype.move = function()
{
	if(this.loop == 'default')
	{
		if (this.currentRow < this.endRow)
		{
			if (this.currentColumn < this.columns)
				this.currentColumn = this.currentColumn + 1;
			else
			{
				this.currentColumn = 0;
				this.currentRow +=1;
			}

		}
		else if (this.currentRow == this.endRow)
		{
			if(this.currentColumn < this.endColumn)
				this.currentColumn += 1;
			else{
				this.currentColumn = this.startColumn;
				this.currentRow = this.startRow;
			}
		}
	}
	else if (this.loop == 'reverse')
	{
		if (this.dir == 1){
			if (this.currentRow < this.endRow)
			{
				if (this.currentColumn < this.columns)
					this.currentColumn += 1;
				else{
					this.currentColumn = 0;
					this.currentRow +=1;
				}

			}
			else if (this.currentRow == this.endRow)
			{
				if(this.currentColumn < this.endColumn)
					this.currentColumn += 1;
				else
				{
					if(this.currentColumn > 0)
					{
						this.currentColumn -= 1;
						this.dir = -1;
					}
					else
					{
						this.currentColumn = this.columns;
						this.currentRow -= 1;
						this.dir = -1;
					}
				}
			}
		}
		else if (this.dir == -1)
		{
			if (this.currentRow > this.startRow)
			{
				if (this.currentColumn > 0)
					this.currentColumn -= 1;
				else{
					this.currentColumn = this.columns;
					this.currentRow -=1;
				}

			}
			else if (this.currentRow == this.startRow)
			{
				if(this.currentColumn > this.startColumn)
					this.currentColumn -= 1;
				else{
					if(this.currentColumn < this.columns)
					{
						this.currentColumn += 1;
						this.dir = 1;
					}
					else
					{
						this.currentColumn = 0;
						this.currentRow += 1;
						this.dir = 1;
					}
				}
			}
		}
	}	
};
Animation.prototype.draw = function(image, dt, context, x, y)
{
	var destWidth = this.frameSet.widthDeformation * this.frameSet.frameWidth;
	var destHeight = this.frameSet.heightDeformation * this.frameSet.frameHeight;

	var sourceX = this.frameSet.frameWidth * this.currentColumn;
	var sourceY = this.frameSet.frameHeight * this.currentRow;

	context.drawImage(image, sourceX, sourceY, this.frameSet.frameWidth,
			this.frameSet.frameHeight, x, y, destWidth, destHeight);

	this.timeSinceLastframe -= dt;

	if (this.timeSinceLastframe <= 0)
	{
		this.timeSinceLastframe = this.duration;
		this.move();
	}
};

Animation.prototype.drawImmediate = function(image, context, x, y)
{
	var destWidth = this.frameSet.widthDeformation * this.frameSet.frameWidth;
	var destHeight = this.frameSet.heightDeformation * this.frameSet.frameHeight;

	var sourceX = this.frameSet.frameWidth * this.currentColumn;
	var sourceY = this.frameSet.frameHeight * this.currentRow;

	context.drawImage(image, sourceX, sourceY, this.frameSet.frameWidth,
			this.frameSet.frameHeight, x, y, destWidth, destHeight);

	this.move();
};