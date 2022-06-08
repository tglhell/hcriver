$(function(){
	var ctx = document.querySelector('.my-canvas-01').getContext('2d');
	// ctx.fillStyle = "rgb(200,0,0)";
	// ctx.fillRect (10, 10, 50, 50);

	// ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
	// ctx.fillRect (30, 30, 50, 50);

	// ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	// ctx.fillRect (80, 80, 50, 50);

	// ctx.fillStyle = "rgba(0, 94, 0, 0.5)";
	// ctx.fillRect (50, 50, 50, 50);

	ctx.beginPath();
	ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
	ctx.moveTo(110, 75);
	ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
	ctx.moveTo(65, 65);
	ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
	ctx.moveTo(95, 65);
	ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
	ctx.stroke();

	$('.btn-draw').click(function(){
		var ctx = document.querySelector('.my-canvas-02').getContext('2d');
		var end = Math.PI * 2;
		for (var i = 0; i < 100; i++) {
			draw(i);
		}

		function draw(delay) {
			setTimeout(function() {
				ctx.clearRect(0, 0, 200, 200);
				ctx.beginPath();
				ctx.arc(100, 100, 90, 0, end / 99 * delay, false);
				ctx.stroke();
			}, delay * 20);
		}
	});
});