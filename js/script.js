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
