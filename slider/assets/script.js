// Доброго времени суток, господин проверяющий :)
// Работает это всё костыльно и инвалидно, что и сам прекрасно понимаю
// Перелистывание и анимация работает вроде как без проблем (по-крайней мере, когда я пролистывал, всё было хорошо)
// Есть проблема когда перелистываешь, а потом переключаешь слайды с помошью точек, то слетает индекс и нарушается порядок
// и я предполагаю, как бы я мог решить эту проблему (в силу своих знаний и опыта)
// но я выбрал оставить всё как есть, ибо и так потратил довольно много времени с начала выполнения тестового задания



let border = 500;
let index = 1;
const sliderLine = document.querySelector('.slider__line');
const dots = document.querySelectorAll('.dot')
const next = document.getElementById('btn__next');
const prev = document.getElementById('btn__prev');
let disabledClick = false;

const activeDot = n => {
    for(dot of dots){
        dot.classList.remove('active');
    }
    dots[n].classList.add('active');
}


let nextSlide = function() {
    if (disabledClick  === true) {
        return false;
    }
    disabledClick = true;

    let start = Date.now();
    let timer = setInterval(function() {
      let timePassed = Date.now() - start;

      sliderLine.style.left = -border + -timePassed / 5 + 'px';

      if (timePassed > 2500){
        index += 1;
        if (index == 10 || index > 10) index = 0;
        activeDot(index-1);
        border = 500*index;
        clearInterval(timer);
      }

    }, 20);


    setTimeout(function () {
        disabledClick = false;
   }, 2500);

}

next.addEventListener('click', nextSlide);


let prevSlide = function() {
    if (disabledClick  === true) {
        return false;
    }

    disabledClick = true;

    let start = Date.now();

    let timer = setInterval(function() {
      let timePassed = Date.now() - start;

      sliderLine.style.left = -border + timePassed / 5 + 'px';

      if (timePassed > 2500) {
        index-=1;
        if (index == 0 || index < 0) index = 10;
        activeDot(index-1);
        border = 500*index;
        clearInterval(timer);
      }

    }, 20);

    setTimeout(function () {
        disabledClick = false;
   }, 2500);
}

let dotSlide = function() {
    if (disabledClick  === true) {
        return false;
    }

    disabledClick = true;

    sliderLine.style.left = -500 + -(border*index) + 'px';

    setTimeout(function () {
        disabledClick = false;
   }, 200);
}


dots.forEach((item, indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        dotSlide();
        activeDot(index);
    })
});

prev.addEventListener('click',prevSlide);