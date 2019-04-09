(function() {
    var clockCanvas = document.getElementById('clock');
    const draw = function() {
        let date = new Date();
        if(clockCanvas.getContext) {
            var ctx = clockCanvas.getContext('2d');


            /*clockCanvas.style.width = window.getComputedStyle(clockCanvas.parentNode).width;
            clockCanvas.style.height = window.getComputedStyle(clockCanvas.parentNode).height;
            console.log(clock.style.height, window.getComputedStyle(clockCanvas.parentNode).height);*/
            
            
            var stroke = 7;
            var centerX = clockCanvas.width / 2;
            var centerY = clockCanvas.height / 2;
            var radius = (clockCanvas.width / 2) - (stroke / 2);
            ctx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
            
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 0;
            ctx.shadowColor='rgba(0,0,0,0.3)'
            drawFrame(ctx, centerX, centerY, radius, stroke);
            ctx.shadowBlur = 10;

            let secSinceMidnight = (date.getHours() * 60 * 60) + (date.getMinutes() * 60) + (date.getSeconds());
            let hourHandPosition =  (secSinceMidnight % (60*60*12)) / (60*60*12)*360 * (Math.PI / 180);
            let minuteHandPosition =  (secSinceMidnight % (60*60))/(60*60)*360 * (Math.PI / 180);
            let secondHandPosition =  ((secSinceMidnight % 60) / 60) * 360 * (Math.PI / 180);

            drawFace(ctx, centerX, centerY, radius, stroke);
            //drawHand(ctx, secondHandPosition, 1, 5, centerX, centerY, radius, );
            drawHand(ctx, minuteHandPosition, 1, 10, centerX, centerY, radius);
            drawHand(ctx, hourHandPosition, 0.8, 15, centerX, centerY, radius);
            
            //console.log(secondHandPosition);
            //console.log(24*60*60)
        }
        window.requestAnimationFrame(draw);
    }

    const drawFrame = function(ctx, centerX, centerY, radius, stroke) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
        ctx.lineWidth = stroke;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fill();
        ctx.stroke();
    }
    const drawHand = function(ctx, rad, length, width, centerX, centerY, radius) {
        let x1 = centerX + ((radius * length - 100) * Math.cos(rad)),
            y1 = centerY + ((radius * length - 100) * Math.sin(rad)),
            x2 = centerX + ((radius-centerX-30) * Math.cos(rad)),
            y2 = centerY + ((radius-centerY-30) * Math.sin(rad));

        ctx.lineWidth = width;
        ctx.translate(centerX, centerY);
        ctx.rotate(-90 * (Math.PI / 180));
        ctx.translate(-1*centerX, -1*centerY);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.translate(centerX, centerY);
        ctx.rotate(90 * (Math.PI / 180));
        ctx.translate(-1*centerX, -1*centerY);
    }

    const drawFace = function(ctx, centerX, centerY, radius, frameWidth) {
        ctx.fillStyle = '#000000';
        ctx.font = '100px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let hour = 3;

        for (let i = 0; i < 360; i += (360/60)) {
            let rad = i * (Math.PI / 180);
            let length = 30; //(i%10) ? 15 : 30;
            let x1 = centerX + ((radius-frameWidth/2) * Math.cos(rad)),
                y1 = centerY + ((radius-frameWidth/2) * Math.sin(rad)),
                x2 = centerX + ((radius-(frameWidth/2)-length) * Math.cos(rad)),
                y2 = centerY + ((radius-(frameWidth/2)-length) * Math.sin(rad)),
                x3 = centerX + ((radius-(frameWidth/2)-length-70) * Math.cos(rad)),
                y3 = 10 + centerY + ((radius-(frameWidth/2)-length-70) * Math.sin(rad));

            if(i%10 === 0) {
                ctx.fillText((hour), x3, y3);
                hour = (hour >= 12) ? 1 : hour + 1;
            }

            ctx.lineWidth = 0;//(i%10) ? 5 : 30;
            ctx.beginPath();
            /*ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);*/
            ctx.arc(x2, y2, (i%10) ? 2 : 10, 0, 2*Math.PI, false);
            ctx.fill();
            ctx.stroke();
        }
    }



    draw();
})();