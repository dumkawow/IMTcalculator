    // Calculator

    function calculator() {
      const result = document.querySelector('.calculating__result span');
    let gender, height, weight, age, ratio;

    function calcResult() {
        if (!gender || !height || !weight || !age) {
            result.textContent = ``;
            return;
        }

        if (gender === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); 
        }
    }
    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    calcResult();

    function setLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }
            if (localStorage.getItem('ratio') === elem.getAttribute('data-ratio') ) {
                elem.classList.add(activeClass);
            }
        });
        calcResult();
    }
    setLocalSettings('#gender div', 'calculating__choose-item_active');
    setLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', e.target.getAttribute('data-ratio'));
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcResult();
            });
        });
    }

    function getDinamycInfo(selector)  {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcResult();
        });
    }
    getDinamycInfo('#height');
    getDinamycInfo('#weight');
    getDinamycInfo('#age');
    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    }
    
    export default calculator;