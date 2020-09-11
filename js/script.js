let animationEle = document.querySelector(".animation");

setTimeout(() => {
    animationEle.classList.remove("show");
    setTimeout(() => {
        animationEle.style.display = "none";
    }, 500);
}, 6000);

let scrollFunc = () => {

}

let lastOffset;
let navbar = document.querySelector("nav.navbar");
let navbarHide;

let sections = Array.from(document.querySelectorAll(".animated-section"));
let footer = document.querySelector(".footer");
let navbarLinks = Array.from(document.querySelectorAll(`nav.navbar .nav li`));
let headerLinks = Array.from(document.querySelectorAll(`header .navbar .nav li`));
let pricingLinks = Array.from(document.querySelectorAll(".pricing .links .link"));
let pricingPlans = Array.from(document.querySelectorAll(".pricing .plans .plan"));
let messages = Array.from(document.querySelectorAll(".testimonial .blocks .block"));
let currentMsg = 3;

let seeCoursesBtn = document.querySelector(".header .home .courses")
let backArrow = document.querySelector(".testimonial .arrows .back");
let nextArrow = document.querySelector(".testimonial .arrows .next");

document.onscroll = (e) => {
    if(lastOffset > window.scrollY) {
        if(window.scrollY > 100) {
            clearTimeout(navbarHide);

            navbar.classList.add("show");
            navbarHide = setTimeout(() => {
                if(navbar.classList.contains("show")) {
                    navbar.classList.remove("show")
                }
            }, 2500);
        } else {
            if(navbar.classList.contains("show")) {
                navbar.classList.remove("show")
            }
            navbarLinks.forEach(oldLink => {
                if(oldLink.classList.contains("active")) {
                    oldLink.classList.remove("active");
                }
            });
            navbarLinks[0].classList.add("active");
            headerLinks.forEach(oldLink => {
                if(oldLink.classList.contains("active")) {
                    oldLink.classList.remove("active");
                }
            });
            headerLinks[0].classList.add("active");
        }
    } else {
        if(navbar.classList.contains("show")) {
            navbar.classList.remove("show")
        }
    }
    lastOffset = window.scrollY;

    sections.forEach((section) => {
        if(section.scrollHeight < window.innerHeight) {
            if(window.scrollY < section.offsetTop &&
                window.scrollY + window.innerHeight > section.offsetTop + section.scrollHeight) {
                section.classList.add("show");

                navbarLinks.forEach(link => {
                    if(link.getAttribute("data-link") == section.getAttribute("data-link")) {
                        if(!link.classList.contains("active")) {
                            navbarLinks.forEach(oldLink => {
                                if(oldLink.classList.contains("active")) {
                                    oldLink.classList.remove("active");
                                }
                            });
                            link.classList.add("active");
                        }
                    }
                });
                headerLinks.forEach(link => {
                    if(link.getAttribute("data-link") == section.getAttribute("data-link")) {
                        if(!link.classList.contains("active")) {
                            headerLinks.forEach(oldLink => {
                                if(oldLink.classList.contains("active")) {
                                    oldLink.classList.remove("active");
                                }
                            });
                            link.classList.add("active");
                        }
                    }
                });

            }
        } else {
            if(window.scrollY >= section.offsetTop &&
                window.scrollY < (window.innerHeight - section.scrollHeight) / 2 + section.offsetTop) {
                section.classList.add("show");
            }
        }
    });

    if(window.scrollY + window.innerHeight == footer.offsetTop + footer.scrollHeight) {
        footer.classList.add("show");
    }
}

navbarLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        let section = document.querySelector(`.${event.target.getAttribute("data-link")}`);
        console.log(section);
        window.scroll({
            top: (section.offsetTop - 100),
            behavior: "smooth"
        });
    });
});

headerLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        let section = document.querySelector(`.${event.target.getAttribute("data-link")}`);
        console.log(section);
        window.scroll({
            top: (section.offsetTop - 100),
            behavior: "smooth"
        });
    });
});

seeCoursesBtn.onclick = () => {
    window.scroll({
        top: (document.querySelector(".pricing").offsetTop - 100),
        behavior: "smooth"
    });
}

pricingLinks.forEach(link => {
    link.addEventListener("click", () => {
        if(!link.classList.contains("active")) {
            pricingLinks.forEach(oldLink => {
                if(oldLink.classList.contains("active")) {
                    oldLink.classList.remove("active");
                }
            });
            pricingPlans.forEach(oldPlan => {
                if(oldPlan.classList.contains("active")) {
                    oldPlan.classList.remove("active");
                }
            });

            link.classList.add("active");
            pricingPlans[link.getAttribute("data-index")].classList.add("active");
        }
    });
});

let refreshMsgs = () => {
    messages.forEach(message => {
        message.classList.remove("super-left");
        message.classList.remove("left");
        message.classList.remove("middle");
        message.classList.remove("right");
        message.classList.remove("super-right");
    });

    if(currentMsg == 1) {
        messages[messages.length - 1].classList.add("super-left");
    } else if(currentMsg == 0) {
        messages[messages.length - 2].classList.add("super-left");
    } else{
        messages[currentMsg - 2].classList.add("super-left");
    }

    if(currentMsg == 0) {
        messages[messages.length - 1].classList.add("left");
    } else {
        messages[currentMsg - 1].classList.add("left");
    }

    messages[currentMsg].classList.add("middle");

    if(currentMsg == messages.length - 1) {
        messages[0].classList.add("right");
    } else {
        messages[currentMsg + 1].classList.add("right");
    }
    
    if(currentMsg == messages.length - 1) {
        messages[1].classList.add("super-right");
    } else if(currentMsg == messages.length - 2) {
        messages[0].classList.add("super-right");
    } else{
        messages[currentMsg + 2].classList.add("super-right");
    }
}
let moveInterval;
let changeMsgs = () => {
    moveInterval = setInterval(() => {
        if(currentMsg == messages.length - 1) {
            currentMsg = 0;
        } else {
            currentMsg++;
        }
        refreshMsgs();
    }, 2000);
}
changeMsgs();

document.querySelector(".testimonial").addEventListener("mouseover", () => {
    clearInterval(moveInterval);
});
document.querySelector(".testimonial").addEventListener("mouseout", () => {
    moveInterval = setInterval(() => {
        if(currentMsg == messages.length - 1) {
            currentMsg = 0;
        } else {
            currentMsg++;
        }
        refreshMsgs();
    }, 2000);
});

backArrow.onclick = () => {
    if(currentMsg == 0) {
        currentMsg = messages.length - 1;
    } else {
        currentMsg--;
    }
    refreshMsgs();
}
nextArrow.onclick = () => {
    if(currentMsg == messages.length - 1) {
        currentMsg = 0;
    } else {
        currentMsg++;
    }
    refreshMsgs();
}