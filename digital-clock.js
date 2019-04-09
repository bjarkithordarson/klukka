(function() {
    let digitalClock = document.getElementById('digitalContainer');
    let date = new Date();
    const padLeft = function(str, len, padding) {
        output = str.toString();
        while(output.length < len) {
            output = padding + output;
        }
        return output;
    }
    const updateDigitalClock = function() {
        date = new Date();
        digitalClock.innerHTML = padLeft(date.getHours(), 2, '0') + ":" + padLeft(date.getMinutes(), 2, '0');
        window.requestAnimationFrame(updateDigitalClock);
    }
    updateDigitalClock();
})();