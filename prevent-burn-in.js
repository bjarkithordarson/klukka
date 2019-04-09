(function() {
    let container = document.getElementById('main');
    const preventBurnIn = function() {
        let x = Math.floor(Math.random() * (50-(-50)+1) + (-50)),
            y = Math.floor(Math.random() * (50-(-50)+1) + (-50)),
            scale = Math.random() * (1-0.95) + 0.95;
        container.style.transform = "translate(" + x + "px, " + y + "px) scale("+scale+")";

        setTimeout(preventBurnIn, Math.random() * ((1000*60*10)-(1000*60*5)+1)+(1000*60*5));
    }

    preventBurnIn();
})();