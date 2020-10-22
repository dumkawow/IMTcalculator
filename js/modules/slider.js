 // slider
function slider({container, slides, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    let slideIndex = 1;
    let offset = 0;

    const slideWrapper = document.querySelector(wrapper),
        slideInner = slideWrapper.querySelector(field),
        slide = slideWrapper.querySelectorAll(slides),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        width = window.getComputedStyle(slideWrapper).width,
        slider = document.querySelector(container);
    
    slide.forEach((slide) => slide.style.width = width);
    const t = 100 * slide.length + '%';
    slideInner.style.cssText = `
        width: ${t};
        display: flex;
        transition: .7s all;
    `;
    slideWrapper.style.overflow = 'hidden';
    slider.style.position = 'relative';

    function setCounter() {
        if (slide.length < 10) {
            total.textContent = `0${slide.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slide.length;
            current.textContent = slideIndex;
        }
    }
    setCounter();
    function toggleActiveIndicator(arr) {
        arr.style.cssText = `
            opacity: 1;
            width: 25px
        `;
    }
    function toggleDots() {
        dots.forEach(item => {
            item.style.opacity = '.5';
            item.style.width = '10px';
        });
        toggleActiveIndicator(dots[slideIndex - 1]);
    }
    function deteleNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function toggleSlide(pos) {
            slideInner.style.transform = `translateX(-${pos}px)`;
    }

    function savePosSlide(pos) {
        localStorage.setItem('position', pos);
        if (localStorage.getItem('position' !== 0)) {
            offset = pos;
        }
    }


    const indicators = document.createElement('ul'),
        dots = [];
        indicators.classList.add('carousel-indicators');
        slider.append(indicators);

    for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dots.push(dot);
        indicators.append(dot);

        if (i == 0) {
            toggleActiveIndicator(dot);
        }
    }

    next.addEventListener('click', () => {
        if (slideIndex == slide.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCounter();

        if (offset == deteleNotDigits(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += deteleNotDigits(width);
        }

        slideInner.style.transform = `translateX(-${offset}px)`;
        toggleDots();
    });

    prev.addEventListener('click', () => {
        if (slideIndex == 1) {
            slideIndex = slide.length;
        } else {
            slideIndex--;
        }

        setCounter();

        if (offset == 0) {
            offset = deteleNotDigits(width) * (slide.length - 1);
        } else {
            offset -= deteleNotDigits(width);
        }

        slideInner.style.transform = `translateX(-${offset}px)`;
        toggleDots();
        savePosSlide(offset);
    });

    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            setCounter();
            offset = deteleNotDigits(width) * (slideTo - 1);

            slideInner.style.transform = `translateX(-${offset}px)`;
            toggleDots();
        });
    });
}

export default slider;