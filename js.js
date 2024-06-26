let horizontScroll = document.querySelector('.four_grid');
let slide = document.querySelector('.four_grid_container');
let container;
let leftBtn = document.getElementById('leftBtn');
let rightBtn = document.getElementById('rightBtn');

rightBtn.addEventListener('click', ()=> {
    horizontScroll.scrollLeft += slide.clientWidth + 40;
    console.log(slide.clientWidth)
});

leftBtn.addEventListener('click', ()=> {
    horizontScroll.scrollLeft -= slide.clientWidth + 40;
    console.log(slide.clientWidth)
});

document.addEventListener("DOMContentLoaded", function () {
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');

    function updateControls(index) {
        indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === index);
        });
        leftBtn.disabled = index === 0; 
        rightBtn.disabled = index === indicators.length - 1;
    }

    rightBtn.addEventListener('click', () => {
        if (currentIndex < indicators.length - 1) {
            currentIndex++;
            updateControls(currentIndex);
        }
    });

    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateControls(currentIndex);
        }
    });

    updateControls(currentIndex);
});

document.addEventListener("DOMContentLoaded", function() {
    const cards2 = document.querySelectorAll('.card2');
    const cardsContainer2 = document.querySelector('.cards2');
    const leftBtn2 = document.getElementById('left-btn2');
    const rightBtn2 = document.getElementById('right-btn2');
    const counter2 = document.querySelector('.counter2');
    let currentIndex2 = 0;
    let interval2;


    function updateCards2() {
        const currentSpan = document.querySelector('.counter2 .current');
        const totalSpan = document.querySelector('.counter2 .total');
        const visibleCards = window.innerWidth > 768 ? 3 : 1;
        const cardWidth = cards2[0].offsetWidth; 
        const gap = 30; 
        const offset2 = (currentIndex2 * -(cardWidth * visibleCards + (visibleCards - 1) * gap));
        
        cardsContainer2.style.transform = `translateX(${offset2}px)`;
        
        if (visibleCards === 3) {
            currentSpan.textContent = Math.min(currentIndex2 * 3 + 3, 6);
            totalSpan.textContent = 6;
        } else {
            currentSpan.textContent = `${currentIndex2 * visibleCards + visibleCards}`;
            totalSpan.textContent = `${cards2.length}`;
        }

        const totalGroups = Math.ceil(cards2.length / visibleCards);
        rightBtn2.disabled = currentIndex2 === totalGroups - 1;
        leftBtn2.disabled = currentIndex2 === 0; 
    }

    function shiftCards2(direction) {
        const totalSets = Math.ceil(cards2.length / (window.innerWidth > 768 ? 3 : 1));
        if (direction === 'right') {
            currentIndex2 = (currentIndex2 + 1) % totalSets;
        } else {
            currentIndex2 = (currentIndex2 - 1 + totalSets) % totalSets;
        }
        updateCards2();
        
    }
    
    function resetAndStartInterval2() {
        clearInterval(interval2);
        interval2 = setInterval(() => {
            shiftCards2('right');
        }, 4000);
    }
    
    leftBtn2.addEventListener('click', () => {
        shiftCards2('left');
        resetAndStartInterval2();
    });
    rightBtn2.addEventListener('click', () => {
        shiftCards2('right');
        resetAndStartInterval2();
    });

    resetAndStartInterval2();
    updateCards2(); 

    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.0 
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetAndStartInterval2(); 
                observer.unobserve(entry.target); 
            }
        });
    }, options);

    observer.observe(document.querySelector('.card2'));
});

document.querySelectorAll('.button__black, .button__transparent, .slide_btn').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.classList.add('hover-effect'); 
    });

    element.addEventListener('touchend', function() {
        this.classList.remove('hover-effect');
    });
});