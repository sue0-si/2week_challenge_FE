let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let memos = [];
let selectedDate;
const memoData = [];
let currentDay;

document.addEventListener('DOMContentLoaded', function () {
    renderCalender(currentYear, currentMonth);
});

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

    document.getElementById('month-year').innerHTML = `${year}. ${month + 1}`;

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
            cell.setAttribute('data-date', `${currentMonth + 1}월 ${cell.innerText}일`)
            cell.setAttribute('data-number', dayCounter.toString())

            cell.addEventListener('click', () => {
                document.getElementById('memoList').style.display = 'none';
                openPopup(cell.dataset.date);
                selectedDate = cell.dataset.number;
                const memosForDate = memoData[selectedDate] || [];
                console.log(`Memos for ${selectedDate}:`, memosForDate);

                // const memosContainer = document.getElementById('memos');
                // memosContainer.innerHTML = '';

                // memosForDate.forEach((memo, index) => {
                //     console.log(memo)
                //     const storedMemo = document.createElement('div');
                //     storedMemo.classList.add('stored-memo');
                //     storedMemo.innerHTML = `<p>${memo}</p>
                //         <button onclick="editMemo(${index})">수정</button>
                //         <button onclick="deleteMemo(${index})">삭제</button>`;
                //     memosContainer.appendChild(storedMemo);
                // });
            });
            dayCounter++;
        }
    }
}

function openPopup(date) {
    document.getElementById('selectedDate').innerText = date;
    document.getElementById('memo').style.display = 'block';
    currentDay = date;
}

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

function addMemo() {
    const memoInput = document.getElementById('memoInput').value;

    if (memoInput.trim() === '') {
        alert('메모를 입력해주세요!!')
        return;
    }
    memos.push(memoInput);
    memoData[selectedDate] = memoData[selectedDate] || [];

    memoData[selectedDate].push(memoInput);
    updateMemo();
}

function updateMemo() {
    // const memosContainer = document.getElementById('memos');
    // memosContainer.innerHTML = '';

    const storedMemo = document.getElementById('memoList');
    storedMemo.innerHTML = '';

    const memosForSelectedDate = memoData[selectedDate] || [];
    console.log(memosForSelectedDate);

    // memos.forEach((memo, index) => {
    //     const memoContainer = document.createElement('div');
    //     memoContainer.classList.add('memo-container');
    //     memoContainer.innerHTML = `<p>${memo}</p>
    //                                     <button onclick="editMemo(${index})">수정</button>
    //                                     <button onclick="deleteMemo(${index})">삭제</button>`;
    //     memosContainer.appendChild(memoContainer);
    // });

    const h2Element = document.createElement('h2');
    h2Element.textContent = `Memos for ${currentDay}`;
    storedMemo.appendChild(h2Element);

    memosForSelectedDate.forEach((memo, index) => {
        const memoContainer = document.createElement('div');
        memoContainer.classList.add('memo-container');
        memoContainer.innerHTML = `
            <p>${memo}</p>
            <button onclick="editMemo(${index})">수정</button>
            <button onclick="deleteMemo(${index})">삭제</button>
        `;
        storedMemo.appendChild(memoContainer);
    });

    document.getElementById('memo').style.display = 'none';
    document.getElementById('memoList').style.display = 'block';
    document.getElementById('memoInput').value = '';
}

function editMemo(index) {
    const memo = memos[index];
    const newMemo = prompt("수정할 내용을 입력하세요:", memo);
    if (newMemo !== null) {
        memos[index] = newMemo;
        updateMemo();
    }
}

function deleteMemo(index) {
    const memosForSelectedDate = memoData[selectedDate] || [];
    memosForSelectedDate.splice(index, 1);
    updateMemo();
}

function closePopup() {
    document.getElementById('memoInput').value = '';
    document.getElementById('memo').style.display = 'none';
}