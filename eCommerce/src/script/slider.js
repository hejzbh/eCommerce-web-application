let curSlide = 0;

export const btnSlideLeft = document.getElementById('hero-left');
export const btnSlideRight = document.getElementById('hero-right');
const sliderPages = document.querySelectorAll('.hero-slide');

export const moveSlide = function(curSlide = 0){
    sliderPages.forEach((slidePage, i)=>{
        slidePage.style.transform = `translateY(${300*(i-curSlide)}%)`;
    });
}

export function goToNextSlide(){
curSlide = curSlide===sliderPages.length-1 ? 0 : +1;
moveSlide(curSlide);
}

export function goToPerviousSlide(){

curSlide===0 ? curSlide = sliderPages.length-1 : curSlide--;

moveSlide(curSlide);
}