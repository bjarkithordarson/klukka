(function(){
    var calendarCanvas = document.getElementById('calendar');
    const draw = function() {
        let date = new Date();
        if(calendarCanvas.getContext) {
            var ctx = calendarCanvas.getContext('2d');
            ctx.clearRect(0, 0, calendarCanvas.width, calendarCanvas.height);

            var centerX = calendarCanvas.width / 2;
            var centerY = calendarCanvas.height / 2;
            var width = 440,
                height = 540;

            rotateAndBack(ctx, 4, centerX, centerY, ctx => drawSheet(ctx, centerX, centerY, width, height));
            rotateAndBack(ctx, -3, centerX, centerY, ctx => drawSheet(ctx, centerX, centerY, width, height));
            rotateAndBack(ctx, 6, centerX, centerY, ctx => drawSheet(ctx, centerX, centerY, width, height));
            rotateAndBack(ctx, -7, centerX, centerY, ctx => drawSheet(ctx, centerX, centerY, width, height));
            rotateAndBack(ctx, 5, centerX, centerY, ctx => drawSheet(ctx, centerX, centerY, width, height));
            rotateAndBack(ctx, -10, centerX, centerY, ctx => drawSheet(ctx, centerX, centerY, width, height));
            rotateAndBack(ctx, 1, centerX, centerY, ctx => drawSheet(ctx, centerX, centerY, width, height));
        }
        window.requestAnimationFrame(draw);
    }

    const days = {
        0: 'sunnudagurinn',
        1: 'mánudagurinn',
        2: 'þriðjudagurinn',
        3: 'miðvikudagurinn',
        4: 'fimmtudagurinn',
        5: 'föstudagurinn',
        6: 'laugardagurinn'
    }

    const months = {
        0: 'janúar',
        1: 'febrúar',
        2: 'mars',
        3: 'apríl',
        4: 'maí',
        5: 'júní',
        6: 'júlí',
        7: 'ágúst',
        8: 'september',
        9: 'október',
        10: 'nóvember',
        11: 'desember'
    }

    const drawSheet = function(ctx, centerX, centerY, width, height) {
        let date = new Date();
        ctx.beginPath();
        
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 20;
        ctx.shadowColor='rgba(0,0,0,0.5)'
        ctx.fillStyle = 'rgba(240,240,240,1)';
        ctx.rect(centerX - (width / 2),centerY - (height / 2),width,height);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#495972';
        ctx.rect((centerX - (width / 2)), (centerY - (height / 2)), width, 120);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000000';
        ctx.font = '250px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(date.getDate() + ".", centerX, centerY + 70, width - 60);
        ctx.font = '60px sans-serif';
        ctx.fillText(days[date.getDay()], centerX, centerY - 100, width - 60);
        ctx.font = '60px sans-serif';
        ctx.fillText(months[date.getMonth()] + " " + date.getFullYear(), centerX, centerY + 210, width - 60);
        ctx.font = '70px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText("Í dag er".toUpperCase(), centerX, centerY - 200, width - 60);
        ctx.closePath();
    }

    const rotateAndBack = function(ctx, deg, centerX, centerY, callback) {
        ctx.translate(centerX, centerY);
        ctx.rotate(deg * (Math.PI / 180));
        ctx.translate(-1*centerX, -1*centerY);
        callback(ctx);
        ctx.translate(centerX, centerY);
        ctx.rotate(-1 * deg * (Math.PI / 180));
        ctx.translate(-1*centerX, -1*centerY);
    }

    draw();
})();