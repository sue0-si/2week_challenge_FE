let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let memoCount = 0;

function renderCalender(year, month) {
    const currentLast = new Date(year, month + 1, 0);  // 이번달의 마지막 날짜
    const currentLastDate = currentLast.getDate();
    const currentLastDay = currentLast.getDay();  // day는 요일을 숫자로 나타냄

    const prevLast = new Date(year, month, 0)
    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisDates = [...Array(currentLastDate + 1).keys()].slice(1)
    const lastDates = [];
    const nextDates = [];

    if (prevLastDay !== 6) {
        for (let i = 0; i < prevLastDay + 1; i++) {
            lastDates.unshift(prevLastDate - i);
        }
    }
    for (let i = 1; i < 7 - currentLastDay; i++) {
        nextDates.push(i);
    }
    const dates = lastDates.concat(thisDates, nextDates);

    document.getElementById('month-year').innerHTML = `${year} ${month + 1}`;

    const firstDayIndex = dates.indexOf(1);
    const lastDayIndex = dates.lastIndexOf(currentLastDate);

    let tableBody = document.getElementById('days');
    tableBody.innerHTML = "";

    let dayCounter = 0;
    for (let i = 0; i < 5; i++) {
        let row = tableBody.insertRow();
        for (let j = 0; j < 7; j++) {
            let cell = row.insertCell();
            if ((i === 0 && j < firstDayIndex) || (i === 4 && lastDayIndex < dayCounter)) {
                cell.style.color = 'gray';
            }
            cell.innerText = dates[dayCounter];
            cell.classList.add('dayClass');
            cell.addEventListener('click', () => {
                document.getElementById('memo').style.display = 'block';
            });
            dayCounter++;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    renderCalender(currentYear, currentMonth);
});

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalender(currentYear, currentMonth);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalender(currentYear, currentMonth)
}

function saveMemo() {
    const memoInput = document.getElementById('memoInput').value;
    if (memoInput.trim() === '') {
        alert('메모를 입력해주세요!!')
    } else {
        memoCount++;
        const memo = document.createElement('div');
        memo.innerHTML = `<p>${memoInput}</p><button onclick="loadMemo(${memoCount})">불러오기</button>`;
        document.getElementById('memoList').appendChild(memo);
        document.getElementById('memoInput').value = '';
    }
}

function closePopup() {
    document.getElementById('memoInput').value = '';
    document.getElementById('memo').style.display = 'none';
}


