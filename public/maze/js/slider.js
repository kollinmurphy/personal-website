
	class Slider {
		redraw() {
			this.ctx.clearRect(0,0,128,64);
			roundRect(this.ctx,0,0,128,64,32,'rgb(' + Math.round(80 - this.offset / 4) + ',' + Math.round(80 + this.offset / 4) + ',' + Math.round(80 - this.offset / 4) + ')');
			roundRect(this.ctx,this.outline,this.outline,128 - (this.outline * 2),64 - (this.outline * 2),32,'rgb(' + Math.round(190 - this.offset * 1.8) + ',' + Math.round(191 - this.offset / 2) + ',' + Math.round(190 - this.offset * 2) + ')');
			this.ctx.drawImage(document.querySelector("#slider"),4 + this.offset,4);
			this.ctx.beginPath();
			this.ctx.fillStyle = "rgba(0,255,0," + (0.2 * (this.offset / 64)) + ")";
			this.ctx.arc(4 + this.offset + this.ballRadius,4 + this.ballRadius,this.ballRadius,0,2 * Math.PI);
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = "rgba(23,73,15," + (0.7 * (this.offset / 64)) + ")";
			this.ctx.arc(4 + this.offset + this.ballRadius,4 + this.ballRadius,this.ballRadius - this.outline / 2,0,2 * Math.PI);
			this.ctx.stroke();
		}
		constructor(cvs,on,bound) {
			this.cvs = cvs;
			this.ctx = this.cvs.getContext('2d');
			var sl = this;
			this.on = on;
			this.outline = 4;
			this.ballRadius = (64 - (this.outline * 2))/2;
			this.clock = 0;
			this.clock0 = 0;
			this.offset = (on) ? 128 - (this.outline * 2) - this.ballRadius * 2 : 0;
			var opp;
			this.redraw();
			
			console.log(cvs.id);

			bound.addEventListener("touchend",function() {
				sl.switch(true);
			});
		}
		setOpp(opposite) {
			this.opp = opposite;
		}
		switch(bidi) {
			var sl = this;
			if (this.on) {	
				if (this.clock0 != 0)
					clearInterval(this.clock0);
				this.on = false;
				this.clock = setInterval(function() {
					sl.offset -= 4;
					if (sl.offset === 0) {
						clearInterval(sl.clock);
					}
					sl.redraw();
				},10);
				if (bidi) {
					this.opp.switch(false);
				}
			} else {
				if (this.clock != 0)
					clearInterval(this.clock);
				this.on = true;
				this.clock0 = setInterval(function() {
					sl.offset += 4;
					if (sl.offset === 128 - (sl.outline * 2) - sl.ballRadius * 2) {
						clearInterval(sl.clock0);
					}
					sl.redraw();
				},10);
				if (bidi) {
					this.opp.switch(false);
				}
			}
			if (this.cvs.id === "sliderTilt") {
				Android.setTilt(this.on);
			}
		}
	}

function roundRect(ctx, x, y, width, height, radius, fillColor, strokeColor) {
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();

}
