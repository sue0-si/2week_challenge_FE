let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let memos = [];
let cellDates = [];

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
            cell.setAttribute('data-number', dayCounter.toString())
            
            let cellDate = new Date(year, month, 1 + j + i * 7);
            cell.setAttribute('data-number', cellDate.getTime()); // 숫자로 날짜 저장
            cellDates.push(cellDate.getTime()); // cellDates 배열에 추가
            
            cell.addEventListener('click', () => {
                showMemoForCell(cell);
            });
            dayCounter++;
        }
    }
}

function showMemoForCell(cell) {
    let cellIdentifier = cell.dataset.number;
    let existingMemo = memos[cellIdentifier];

    if (existingMemo) {
        document.getElementById('existingMemoContent').innerText = existingMemo;
        document.getElementById('existingMemo').style.display = 'block';
        document.getElementById('memo').style.display = 'none';
    } else {
        document.getElementById('existingMemo').style.display = 'none';
        document.getElementById('memo').style.display = 'block';
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

function addMemo() {
    const memoInput = document.getElementById('memoInput').value;

    if (memoInput.trim() === '') {
        alert('메모를 입력해주세요!!')
        return;
    }
    memos.push(memoInput);
    updateMemo();
}

function updateMemo() {
    const memosContainer = document.getElementById('memos');
    const existingMemoContent = document.getElementById('existingMemoContent');
    
    memosContainer.innerHTML = '';
    memos.push(document.getElementById('memoInput').value);

    memos.forEach((memo, index) => {
        const memoContainer = document.createElement('div');
        memoContainer.classList.add('memo-container');
        memoContainer.innerHTML = `<p>${memo}</p>
                                        <button onclick="editMemo(${index})">수정</button>
                                        <button onclick="deleteMemo(${index})">삭제</button>`;
        memosContainer.appendChild(memoContainer);

        const existingMemoItem = document.createElement('li');
        existingMemoItem.innerText = memo;
        existingMemoContent.appendChild(existingMemoItem);
    });

    document.getElementById('memo').style.display = 'none';
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
    memos[index] = '';
    updateMemo();
    const memoContainers = document.querySelectorAll('.memo-container');
    if (memoContainers.length > index) {
        const deletedMemoContainer = memoContainers[index];
        deletedMemoContainer.parentNode.removeChild(deletedMemoContainer);
    }
}
function closePopup() {
    document.getElementById('memoInput').value = '';
    document.getElementById('memo').style.display = 'none';
}