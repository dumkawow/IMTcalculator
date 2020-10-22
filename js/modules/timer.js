// timer

function timer(id, deadline) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            day = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t/ (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'day': day,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            day = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            setTime = setInterval(updateClock, 1000);

        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            day.innerHTML = getZero(t.day);
            hours.innerHTML = t.hours;
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(setTime);
            }
        }
    }
    setClock(id, deadline);

}

export default timer;