let previousHour = '';
let previousMinute = '';

function starttime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  h = amorpm(h);
  h = checktime(h);
  m = checktime(m);

  const card1Element = document.querySelector('.card1');
  const card2Element = document.querySelector('.card2');

  // Check if the content is changing and add the change-animation class
  if (h !== previousHour) {
    card1Element.classList.add('change-animation');
  }
  if (m !== previousMinute) {
    card2Element.classList.add('change-animation');
  }

  // Update content and remove change-animation class after animation completes
  setTimeout(() => {
    card1Element.classList.remove('change-animation');
    card2Element.classList.remove('change-animation');
    previousHour = h;
    previousMinute = m;
  }, 500); // Wait for the flip animation duration

  card1Element.textContent = h;
  card2Element.textContent = m;

  const year = today.getFullYear();
  const taarik = today.getDate();
  const month = givemonth(today.getMonth());
  document.querySelector('.time-container').setAttribute('data-date', month + ' ' + taarik + ', ' + year);

  const dayOfWeek = dayWeek(today.getDay());
  card2Element.setAttribute('data-day-of-week', dayOfWeek);

  setTimeout(starttime, 1000);
}

// Initial call to starttime to display the time without waiting for the first second
starttime();


function givemonth(i){
  const months=["Jan","feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months[i];
}

function dayWeek(ind){
  const daysofweek=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return daysofweek[ind];
}

function checktime(i){
  if(i<10){
    i="0"+i;
  }
  return i;
}

function amorpm(i){
  let flag="AM";
  if(i>12){
    i=i%12;
    flag="PM";
  }
  const card1meridiant = document.querySelector('.card1');
  card1meridiant.setAttribute('data-meridiant',flag);
  return i;
}

