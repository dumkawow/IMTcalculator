 // CardMenu
import {getResource} from '../services/services';
 function cardMenu() {

    class CardMenu {
        constructor(src, alt, title, descr, price, parentSelector, ...clasess) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.clasess = clasess;
        }
    
        render() {
            const element = document.createElement('div');
    
            if(this.clasess.length === 0) {
                this.clasess = 'menu__item';
                element.classList.add(this.clasess);
            } else {
                this.clasess.forEach(className => element.classList.add(className));
            }
    
            element.innerHTML = 
            `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parentSelector.append(element);
        }
    
    }
    
    const bd = async (url) =>  {
        const res = await fetch(url);
    
        return await res.json();
    };
    
    bd('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
    
            const element = document.createElement('div');
            element.classList.add('menu__item');
    
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `;
            document.querySelector('.menu .container').append(element);
        });
    });

   
 }
 export default cardMenu;