function timer() {
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
}

module.exports = timer;
