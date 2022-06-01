// Tab (preview)
const tabsParent = document.querySelector(".tabheader__items");
const tabs = document.querySelectorAll(".tabheader__item");
const tabsContent = document.querySelectorAll(".tabcontent");

function hideTabContent() {
  tabsContent.forEach((tab) => {
    //tab.style.display = "none";   or:
    tab.classList.add("hide");
    tab.classList.remove("show", "fade");
  });

  tabs.forEach((tab) => {
    tab.classList.remove("tabheader__item_active");
  });
}

function showTabContent(i = 1) {
  tabsContent[i].classList.add("show", "fade");
  tabsContent[i].classList.remove("hide");
  tabs[i].classList.add("tabheader__item_active");
}

tabsParent.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("tabheader__item")) {
    tabs.forEach((tab, i) => {
      if (e.target === tab) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }
});

hideTabContent();
showTabContent();

// Timer
let deadline = "2022-05-01";

function getRemainingTime(deadline) {
  let days, hours, minutes, seconds;

  let remainingTime = Date.parse(deadline) - new Date();

  if (remainingTime <= 0) {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
  } else {
    days = Math.floor((remainingTime / (1000 * 60 * 60 * 24)) % 24);
    hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 60);
    minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    seconds = Math.floor((remainingTime / 1000) % 60);
  }

  return {
    remainingTime,
    days,
    hours,
    minutes,
    seconds,
  };
}

function addZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setClock(selector, deadline) {
  document.querySelector(selector, deadline);
  const day = document.querySelector("#days");
  const hour = document.querySelector("#hours");
  const min = document.querySelector("#minutes");
  const sec = document.querySelector("#seconds");

  const timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    let total = getRemainingTime(deadline);

    day.innerHTML = addZero(total.days);
    hour.innerHTML = addZero(total.hours);
    min.innerHTML = addZero(total.minutes);
    sec.innerHTML = addZero(total.seconds);

    if (total.remainingTime <= 0) {
      clearInterval(timeInterval);
    }
  }
}
setClock(".timer", deadline);

// Modal

const modalTrigger = document.querySelectorAll("[data-modal]");
const modal = document.querySelector(".modal");

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden"; // no scroll
  clearInterval(modalTimer);
}

modalTrigger.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

function closeModal() {
  modal.classList.remove("show");
  modal.classList.add("hide");
  document.body.style.overflow = "";
}

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.getAttribute("data-close") === "") {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    closeModal();
  }
});

const modalTimer = setTimeout(openModal, 50000);

function showModalByScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal();
    window.removeEventListener("scroll", showModalByScroll);
  }
}
window.addEventListener("scroll", showModalByScroll);

// create Card (menu) with Classes

class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parentSelector);
    this.classes = classes;
    this.course = 30; //$
  }

  changeToUAH() {
    this.price = +this.price * this.course;
  }

  render() {
    const element = document.createElement("div");

    if (this.classes.length === 0) {
      element.classList.add("menu__item");
    } else {
      this.classes.forEach((className) => element.classList.add(className));
    }
    element.innerHTML = `
      <img src=${this.src} alt=${this.alt} />
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/ день</div>
      </div>  
    `;

    this.parent.append(element);
  }
}

const getResult = async (url, data) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};

//render cards dynamically on page from server:
// getResult("http://localhost:3000/menu")
//   .then((data) => {
//     data.forEach(({ img, altimg, title, descr, price }) => {
//       new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
//   });
// });

axios.get("http://localhost:3000/menu").then((data) => {
  data.data.forEach(({ img, altimg, title, descr, price }) => {
    new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  });
});

//fetch("http://localhost:3000/menu")
// .then((res) => res.json())
// .then((data) => console.log(data));

// create cards without Classes and reproduce them on page:

// getResource('http://localhost:3000/menu')
//     .then(data => createCard(data));

// function createCard(data) {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');

//         element.classList.add("menu__item");

//         element.innerHTML = `
//             <img src=${img} alt=${altimg}>
//             <h3 class="menu__item-subtitle">${title}</h3>
//             <div class="menu__item-descr">${descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>
//         `;
//         document.querySelector(".menu .container").append(element);
//     });
// }

// Forms, POST request

const forms = document.querySelectorAll("form");

const message = {
  loading: "img/form/spinner.svg",
  success: "Thanks, we will contact you soon.",
  failure: "Oops, something get wrong...",
};

forms.forEach((item) => {
  bindPostData(item);
});

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: data,
  });

  return await res.json();
};

function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //spinner:
    const statusMessage = document.createElement("img");
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.insertAdjacentElement("afterend", statusMessage);

    const formData = new FormData(form);
    //formData->arr of arr->obj->JSON:
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    postData("http://localhost:3000/requests", json)
      .then((data) => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove(); //spinner
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });
  });
}

// thanks message modal

function showThanksModal(message) {
  const prevModalDialog = document.querySelector(".modal__dialog");
  prevModalDialog.classList.add("hide");
  openModal();

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__dialog");
  thanksModal.innerHTML = `
    <div class = 'modal__content'>
      <div class = 'modal__close>&times;</div>
      <div class = 'modal__title'>${message}</div>
    </div>
  `;

  document.querySelector(".modal").append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add("show");
    prevModalDialog.classList.remove("hide");
    closeModal();
  }, 4000);
}

// SLIDER:
const slides = document.querySelectorAll(".offer__slide");
const slider = document.querySelector(".offer__slider");
const prev = document.querySelector(".offer__slider-prev");
const next = document.querySelector(".offer__slider-next");
const total = document.querySelector("#total");
const current = document.querySelector("#current");
const slidesWrapper = document.querySelector(".offer__slider-wrapper");
const slidesField = document.querySelector(".offer__slider-inner");

const width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
  total.textContent = `0${slides.length}`;
  current.textContent = `0${slideIndex}`;
} else {
  total.textContent = slides.length;
  current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + "%";
slidesField.style.display = "flex";
slidesField.style.transition = "0.5s all";

slidesWrapper.style.overflow = "hidden";

slides.forEach((slide) => {
  slide.style.width = width;
});

slider.style.position = "relative";

const dots = document.createElement("ol");
const dotsArr = [];

dots.classList.add("carousel-dots");
dots.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;
`;
slider.append(dots);

for (let i = 0; i < slides.length; i++) {
  let dot = document.createElement("li");
  dot.setAttribute("data-slide-to", i + 1);
  dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity .6s ease;
  `;
  if (i === 0) {
    dot.style.opacity = 1;
  }
  dots.append(dot);
  dotsArr.push(dot);
}

function deleteNotDigits(str) {
  return +str.replace(/\D/g, "");
}

function makeActiveDot(arr) {
  arr.forEach((dot) => (dot.style.opacity = "0.5"));
  arr[slideIndex - 1].style.opacity = 1;
}

function addZeroToCurrSlide(arr) {
  if (arr.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }
}

next.addEventListener("click", () => {
  // width = '400px' so we need cut 'px'
  if (offset === deleteNotDigits(width) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += deleteNotDigits(width);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex === slides.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  }

  addZeroToCurrSlide(slides);

  makeActiveDot(dotsArr);
});

prev.addEventListener("click", () => {
  // width = '400px' so we need cut 'px'
  if (offset === 0) {
    offset = deleteNotDigits(width) * (slides.length - 1);
  } else {
    offset -= deleteNotDigits(width);
  }

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == 1) {
    slideIndex = slides.length;
  } else {
    slideIndex--;
  }

  addZeroToCurrSlide(slides);

  makeActiveDot(dotsArr);
});

dotsArr.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    let slideTo = e.target.getAttribute("data-slide-to");

    slideIndex = slideTo;
    offset = deleteNotDigits(width) * (slideTo - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;

    addZeroToCurrSlide(slides);

    makeActiveDot(dotsArr);
  });
});

// Calculator

const result = document.querySelector(".calculating__result span");

let sex, height, weight, age, ratio;

if (localStorage.getItem("sex")) {
  sex = localStorage.getItem("sex");
} else {
  sex = "female";
  localStorage.setItem("sex", "female");
}

if (localStorage.getItem("ratio")) {
  ratio = localStorage.getItem("ratio");
} else {
  ratio = 1.375;
  localStorage.setItem("ratio", 1.375);
}

function initLocalSettings(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem) => {
    elem.classList.remove(activeClass);
    if (elem.getAttribute("id") === localStorage.getItem("sex")) {
      elem.classList.add(activeClass);
    }
    if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
      elem.classList.add(activeClass);
    }
  });
}
initLocalSettings("#gender div", "calculating__choose-item_active");
initLocalSettings(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);

function calcTotal() {
  if (!sex || !height || !weight || !age || !ratio) {
    result.textContent = "____";
    return;
  }
  if (sex === "female") {
    result.textContent = Math.round(
      (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
    );
  } else {
    result.textContent = Math.round(
      (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
    );
  }
}
calcTotal();

function getStaticInfo(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-ratio")) {
        ratio = +e.target.getAttribute("data-ratio");
        localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
      } else {
        sex = e.target.getAttribute("id");
        localStorage.setItem("sex", e.target.getAttribute("id"));
      }
      //console.log(ratio, sex);

      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });

      e.target.classList.add(activeClass);

      calcTotal();
    });
  });
}

getStaticInfo("#gender div", "calculating__choose-item_active");
getStaticInfo(
  ".calculating__choose_big div",
  "calculating__choose-item_active"
);

function getDynamicInfo(selector) {
  const input = document.querySelector(selector);

  input.addEventListener("input", () => {
    if (input.value.match(/\D/g)) {
      input.style.border = "1px solid red";
    } else {
      input.style.border = "none";
    }

    switch (input.getAttribute("id")) {
      case "height":
        height = +input.value;
        break;
      case "weight":
        weight = +input.value;
        break;
      case "age":
        age = +input.value;
        break;
    }

    calcTotal();
  });
}

getDynamicInfo("#height");
getDynamicInfo("#weight");
getDynamicInfo("#age");
