// Video background______________________
var video = document.getElementById("myVideo");

function play() {
    video.play();
}

function pause() {
    video.pause();
}

// Scroll up menu________________________
var prevScrollpos = window.pageYOffset;

function inactiveNavbar(){
    setTimeout(function(){             
        var currentScrollPos = window.pageYOffset;
            if (prevScrollpos = currentScrollPos && currentScrollPos>10){
                document.getElementById("navbar").style.top = "-120px";
            }            
            else {
                document.getElementById("navbar").style.top = "0";
            }
    }, 7000);
}
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    // console.log(currentScrollPos);
    let navbar = document.getElementById("navbar");    
    if (currentScrollPos<10){
        navbar.style.top = "0";
        navbar.style.paddingTop = "30px";
        navbar.style.backgroundColor ="rgb(252, 252, 252, 0)";
        navbar.style.filter ="none";
    } else if (prevScrollpos > currentScrollPos && currentScrollPos>10) {
        navbar.style.top = "0"; 
        navbar.style.paddingTop = "0";   
        navbar.style.backgroundColor ="#D6E7E4";
        navbar.style.filter ="drop-shadow(3px 3px 2px #8b9690)";
        inactiveNavbar();
    } else {
        navbar.style.top = "-120px";            
    }    
    prevScrollpos = currentScrollPos;    
}


// Smooth scroll navbar_____________________
const links = document.querySelectorAll("#home .links a, #home .logo a, .overlay-content a,.overlay a, #hamburger-menu, #footer-navbar a, #forecast-button-wrapper button");
    for (const link of links) {
    link.addEventListener("click", clickHandler);
    }

    function clickHandler(e) {
    if(this.id==='hamburger-menu' || this.className==='closebtn' ) {
        e.preventDefault();
    }
    else {
        e.preventDefault();
        const href = this.getAttribute("href");
        // console.log(this.className);
        // console.log(this.id);
        let offsetTop;

        if (this.className==='forecast-button' && href==='#contatti' && screen.width < 700){
            offsetTop = document.querySelector(href).offsetTop + 100;
            // console.log(this.className);
            // console.log(offsetTop);
        }
        else if (this.className!=='forecast-button' && href==='#contatti' && screen.width < 700) {
            offsetTop = document.querySelector(href).offsetTop-10;
        }
        else {
            offsetTop = document.querySelector(href).offsetTop-10;
        }

        scroll({
            top: offsetTop,
            behavior: "smooth"
        });

    }

    }

// Full screen menu_________________________

/* Open */
function openNav() {
    document.getElementById("myNav").style.height = "100vh";
}
/* Close */
function closeNav() {
    document.getElementById("myNav").style.height = "0%";
} 

// Slider about-section___________________________________       

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}   


// Image tab - Sezione Coltivazione____________________________

// Smooth scroll per coltivazione
const tabs = document.querySelectorAll("#outside-tab-row .image-tab");
for (const tab of tabs) {
    tab.addEventListener("click", clickTabHandler);
}

function clickTabHandler(e) {
    e.preventDefault();
    let href = this.children[0].getAttribute("href");
    let offsetTop;
    if (window.innerWidth  > 950) {
    offsetTop = document.querySelector(href).offsetTop+180;
    } else if (window.innerWidth  <= 950 && window.innerWidth > 500 ) {
    offsetTop = document.querySelector(href).offsetTop+130;
    } else {
    offsetTop = document.querySelector(href).offsetTop+100;
    }    
    scroll({
    top: offsetTop,
    behavior: "smooth"
    });   
}
       
// get the tabs from the outside tab row  and transform the HTML Collection to Array
let outsideTabs = document.getElementById("outside-tab-row").children;
let outsideTabsArray = Array.prototype.slice.call(outsideTabs);

// Set Bolean used to underline the corresponding inside tab clicked on the outside
let firstOpen=true;

function expandTab(tabs) {
    // get the index of the clicked tab
    let indexOfClicked = outsideTabsArray.indexOf(tabs);       
    // get the tabs from the outside tab row    
    const outsideTabs = document.getElementById("outside-tab-row").children;        
    // Get the tabs from the  inside-tabs-row 
    const insideTabs = document.getElementById("inside-tab-row").children;
    // Get the h4 of active tab(clicked tab- can be inside outside)
    let activeTab = tabs.getElementsByTagName("H4")[0];
    // remove active class from all the inside tabs
    for (i = 0; i < insideTabs.length; i++) {
        let title = insideTabs[i].getElementsByClassName("underline")[0];              
        title.className = title.className.replace(" underline-active", "");                
    };
    // control if the expanded container is opened for the first time and add the active class to the tab clicked on the outside,then change the bolean to false(expanded container is already opened)
    if (firstOpen){
        outsideClick=insideTabs[indexOfClicked].getElementsByClassName("underline")[0];
        outsideClick.className += " underline-active";
        firstOpen=false;
    } else {
        // add active class to the clicked tab  
        let underline= tabs.getElementsByClassName("underline")[0];   
        underline.className += " underline-active";
    }        
    // Get the outside-tabs and remove active class
        // for (i = 0; i < outsideTabs.length; i++) {
        //     let outsideTitle = outsideTabs[i].getElementsByTagName("H4")[0];
        //     // console.log(outsideTitle);                
        //     outsideTitle.className = outsideTitle.className.replace(" inside-tab-active", "");                
        // };

    // Get the outside-tab-row and hide it
    document.getElementById("outside-tab-row").style.display="none";
    // Get the image element in the expanded container
    var expandImg = document.getElementById("expandedImg");
    // Get the title element in the expanded container
    var imgText = document.getElementById("imgtext");
    // Get the description element in the expanded container
    var imgDesc = document.getElementById("imgdesc");
   
    //Get the tab-tip element from the outside container
    let tabTip = document.getElementById("tab-tip");
    tabTip.style.display="none";
    
    // Get the child p element of the clicked tab either from the inside or the outside container
    var descElement = tabs.getElementsByTagName("P")[0].innerHTML;
    // Get the child image element of the clicked tab either from the inside or the outside container
    var imgElement = tabs.getElementsByTagName("IMG")[0];
    // Use the same src in the expanded image as the image being clicked in the tabs
    expandImg.src = imgElement.src;
    // Use the value of the alt attribute of the image in the clicked tab as title inside the expanded image
    imgText.innerHTML = imgElement.alt;
    // Use the value of the clicked tab p element for expanded image description
    imgDesc.innerHTML = descElement;        
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "flex";
    setTimeout(function(){ 
        expandImg.classList +=" scale";
        // imgText.classList +=" title";
        setTimeout(function(){ 
            expandImg.className = expandImg.className.replace(" scale", "");
            // imgText.className = expandImg.className.replace(" title", ""); 
        },1000);
    },100);        
}  
    
function closeExpanded() {
    // Get the outside-tab-row and show it
    document.getElementById("outside-tab-row").style.display="flex";           
    // Get the expanded container and hide it
    let expandedImg = document.getElementById("expandedImg");
    let expandedImgContainer = expandedImg.parentElement;
    expandedImgContainer.style.display='none';             
    // show the tab tip
    let tabTip = document.getElementById('tab-tip');
    tabTip.style.display='block';
    // change back the bolean for the opening of the expanded div(used to underline the inside tab clicked on the outside row)
    firstOpen=true;
        // get the tabs from the outside tab row  and remove the active class   
    let outsideTabs = document.getElementById("outside-tab-row").children;
    for (i = 0; i < outsideTabs.length; i++) {
        let outsideTitle = outsideTabs[i].getElementsByTagName("H4")[0];
        // console.log(outsideTitle);                
        outsideTitle.className = outsideTitle.className.replace(" inside-tab-active", "");                
    };
    let closeBtn = document.getElementById("expanded-close-button");

    // code to smooth scroll to the parent container when closeBtn is clicked
    this.addEventListener("click", closeHandler);

    function closeHandler(e) {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop-50;

    scroll({
        top: offsetTop,
        behavior: "smooth"
    });

    this.removeEventListener("click", closeHandler);

    }
}

// Product slider - Sezione Prodotti_____________________________________

    let productIndex = 0;
    // GET THE PRODUCT DOTS
    const productDots = document.getElementsByClassName("productDot");
    showProducts();
    let dotisClicked = false;
    let playing;
    let timeout;

    function playInterval() {
        playing = setInterval(showProducts, 5000);
    }

    // Thumbnail image controls
    function currentProduct(n) {
        clearTimeout(timeout);
        clearInterval(playing);
        var productDots = document.getElementsByClassName("productDot");
        showProducts(productIndex = n);
        for (j = 0; j < productDots.length; j++) {
                productDots[j].className = productDots[j].className.replace(" active-dot", "");
            }
        productDots[n].className += " active-dot";
        dotisClicked = true;
        timeout = setTimeout(function(){
            dotisClicked=false;
            playInterval();
        }, 10000);
    }
    // 
    if(!dotisClicked){
    playInterval(); // Change image every 5 seconds
    }
    
    function showProducts() {
    var i;
    var j;
    var slides = document.getElementsByClassName("myProducts");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    productIndex++;
    if (productIndex > slides.length) {productIndex = 1}
    for (j = 0; j < productDots.length; j++) {
        productDots[j].className = productDots[j].className.replace(" active-dot", "");
    }
    productDots[productIndex-1].className += " active-dot";
    slides[productIndex-1].style.display = "flex";
    
    }

// Show forecast_______________________________

    let weatherButton;
    function displayWeather() {
        let weatherContainer = document.getElementById("forecast-container");
        let weatherButtonContainer = document.getElementById("forecast-button-wrapper");
        // weatherContainer.style.display="flex"; 
        weatherContainer.style.opacity="1"; 
        weatherContainer.style.transform="scale(1)"; 
        // weatherContainer.style.padding="5% 0"; 
        weatherButtonContainer.style.opacity="0"; 
        weatherButtonContainer.style.display="none";  
    }
    function hideWeather() {
        let weatherContainer = document.getElementById("forecast-container");
        // weatherContainer.style.display="none";
        weatherContainer.style.opacity="0"; 
        weatherContainer.style.transform="scale(0)"; 
        weatherContainer.style.padding="0 0"; 
        weatherContainer.style.margin="0 0"; 
        weatherContainer.innerHTML=""; 
    }

    function showWeatherButton() {
        let weatherButtonContainer = document.getElementById("forecast-button-wrapper");
        weatherButtonContainer.style.display="flex";  
        setTimeout(()=>{weatherButtonContainer.style.opacity="1"},20)
          
    }


    function getWeather() {
        getForecast().then(forecast => renderForecast(forecast));            
        displayWeather();             
    }

    function closeWeather(){
        // let weatherButton=document.getElementById("forecast-close-button");
        // console.log(weatherButton);

        this.addEventListener("click", scrollHandler);      

            function scrollHandler(e) {
            e.preventDefault();
            const closeHref = e.target.getAttribute("href");
           
            let offsetTopClose;

            if (e.target.id ==='forecast-close-button' && closeHref==='#contatti' && screen.width < 700){
                offsetTopClose = document.querySelector(closeHref).offsetTop + 100;
            }
            else {
                offsetTopClose = document.querySelector(closeHref).offsetTop-10;
            }

            scroll({
                top: offsetTopClose,
                behavior: "smooth"
            });

            }
        hideWeather();  
        setTimeout(showWeatherButton, 500);              
    }


// Onload scroll position_______________________________

    // to use recorded scroll position
        // document.addEventListener("DOMContentLoaded", function(event) { 
        //     var scrollpos = localStorage.getItem('scrollpos');
        //     if (scrollpos) {window.scrollTo(0, scrollpos)};
        // });

// to go to top
document.addEventListener("DOMContentLoaded", function(event) { 
    window.scrollTo(0, 0);
});

// set scroll position before exiting the page
window.onbeforeunload = function(e) {
    localStorage.setItem('scrollpos', window.scrollY);
    if (localStorage.scrollpos<250){
        localStorage.setItem('scrollpos', 0);
    }
};

// Animate-css script___________________

function addAnimation(element){
    element.classList.add('animate__animated', 'animate__zoomIn');        
};
