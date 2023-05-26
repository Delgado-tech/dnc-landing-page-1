var depoimentos = document.querySelector('#depoimentos');
var carrossel = document.querySelector('#carrossel');
var leftArrow = document.querySelector('#left-arrow>img');
var rightArrow = document.querySelector('#right-arrow>img');
var disabledButton = {"left":true, "right":false}
var mouseDown = false;
var mouseStart = 0;
var scrollEnd = 0;

carrossel.addEventListener('mousedown', (e) => {
    mouseDown = true;
    mouseStart = e.clientX;
    carrossel.setAttribute('style', 'cursor: grabbing');
    depoimentos.setAttribute('style', 'cursor: grabbing');
});

document.onmousemove = (e) => {
    if(mouseDown) { 
        
        UpdateDisabledButton();

        carrossel.scrollTo(scrollEnd + mouseStart - e.clientX, 0);
        return;
    }

    scrollEnd = carrossel.scrollLeft;
    carrossel.setAttribute('style', 'cursor: grab');
    depoimentos.setAttribute('style', 'cursor: normal');
};

rightArrow.addEventListener("click", () => {

    if (disabledButton.right == true) return;

    let width = getCarrosselCardWidth();

    carrossel.scrollTo({
        left: scrollEnd + width + 110,
        behavior: "smooth"
    });

    setTimeout(() => {
        UpdateDisabledButton();    
    }, 500); 

});

leftArrow.addEventListener("click", async () => {
    if (disabledButton.left == true) return;

    let width = getCarrosselCardWidth();

    carrossel.scrollTo({
        left: scrollEnd - width - 110,
        behavior: "smooth"
    });
    
    setTimeout(() => {
        UpdateDisabledButton();    
    }, 500); 

});

function UpdateDisabledButton() {
    if((carrossel.scrollLeft + carrossel.clientWidth) <= carrossel.clientWidth + 10){
        leftArrow.setAttribute("style", "opacity: 50%; cursor: default;");
        disabledButton.left = true;
    }else if(carrossel.scrollLeft + carrossel.clientWidth >= carrossel.scrollWidth - 10) {
        rightArrow.setAttribute("style", "opacity: 50%; cursor: default;");
        disabledButton.right = true;
    }else {
        leftArrow.setAttribute("style", "opacity: 100%; cursor: pointer;");
        rightArrow.setAttribute("style", "opacity: 100%; cursor: pointer;");
        disabledButton.left = false;
        disabledButton.right = false;
    }
}

function getCarrosselCardWidth() {
    let width = window.getComputedStyle(document.querySelector(".carrossel-card")).getPropertyValue("width").replace(/[^0-9\.]/g,"");
    return parseInt(width);
}

depoimentos.addEventListener('mouseleave', () => { mouseDown = false });
document.onmouseup = () => { mouseDown = false };

