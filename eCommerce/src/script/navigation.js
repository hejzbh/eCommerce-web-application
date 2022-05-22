const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav__links');
const shopButtons = document.querySelectorAll('.start__shop');
const home = document.querySelector('.hero-section');
const allNavLinks = document.querySelectorAll('.nav__link');
const submenuTarget = document.querySelector('.submenu__link');
const closeNavBTN = document.querySelector('.close__nav');
const openNavBTN = document.querySelector('.mobile__burger');
export default (()=>{
    [closeNavBTN, openNavBTN].forEach(btn=>btn.addEventListener('click', function(){
        navLinks.classList.toggle('activeNav');
    }));

    function navLinksClick(){

        nav.addEventListener('click', function(e){
            const navLink = e.target.closest('.nav__link')
            if(!navLink || navLink.classList.contains('submenu__link')) return;

    
            const href = navLink.getAttribute('href').splice(0, 1);
            
    
            document.getElementById(href).scrollIntoView({
                behavior:'smooth'
            });
            
        }); 
    
    
    };


    function navLinksHover(opacityValue){
        nav.addEventListener('mouseover', function(e){
            const navLink = e.target.closest('.nav__link');
            if(!navLink) return;

            allNavLinks.forEach(link=>{
                link!==navLink ? link.style.opacity=opacityValue : '';
            });

            navLink.style.opacity=1;

              // CLOSE SUBMENU
              const submenu = document.querySelector('.submenu__categories');
              const styleProp = getComputedStyle(submenu).display;
          
              if(!navLink.parentElement.classList.contains('submenu__link')){
               styleProp === 'block' ? submenu.style.display='none' : '';
              }

              
        });
    }

    function navLinksOut(opacityValue){
        nav.addEventListener('mouseout', function(e){
            const navLink = e.target.closest('.nav__link');
            if(!navLink) return;

            allNavLinks.forEach(link=>{
                link!==navLink ? link.style.opacity=opacityValue : '';
            });

            navLink.style.opacity=1;

        });
    }
    
     function shopButtonsNavigation(){
        shopButtons.forEach(btn=>btn.addEventListener('click', function(e){
            const btn = e.target;
            const href = btn.dataset.href;
            console.log(href);
    
            document.querySelector(`.${href}`).scrollIntoView({
                behavior:'smooth'
            });
    
        }));
    };

    /////////////////////
    // SUBMENU 
    /////////////////////

    function submenu(displayStyle = 'none', e){
        console.log(e);
        const li = e.target.closest('.submenu__link');
        const submenu = li.children[1];

        submenu.style.display = displayStyle;
    }
  
    // FOR MORE EVENTS IN FUTURE...
    const style = ['block'];
    
    ['mouseover'].forEach((event, i)=>submenuTarget.addEventListener(event, submenu.bind(this, style[i])));

    document.querySelector('.submenu__categories').addEventListener('mouseleave', function(e){
        this.style.display='none';
    });
    ///////////////////////////////////////////////



    const heroSection = document.querySelector('.first__slide');
const heroSectionTwo = document.querySelector('.second__slide');
[heroSection, heroSectionTwo].forEach(section=>section.addEventListener('mousemove', function(e){
    const text = this.querySelector('.hero__text');

    if(e.clientY>500){
        this.style.backgroundPosition = 'bottom left';
    }
    if(e.clientY<500){
        this.style.backgroundPosition = 'top right';
    }

   text.style.marginRight = `-${e.clientX/40}px`;

}));




    navLinksHover(0.5);
    navLinksOut(1);
    navLinksClick();
    shopButtonsNavigation();
})();




const navSticky = function(entries){
const [entry] = entries;

if(entry.isIntersecting){
    nav.classList.remove('sticky');
    home.style.minHeight=`${60}vh`;
} else {
    nav.classList.add('sticky');
    home.style.minHeight=`${70}vh`;
}
}


new IntersectionObserver(navSticky, {
    root:null,
    threshold:1,
    rootMargin : `${nav.getBoundingClientRect().height}px`
}).observe(home);