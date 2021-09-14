'use-strict';
const { body } = document;
const $table = document.createElement('table');
const $result = document.createElement('div');
const rows = [];
let turn = 'O';

const checkWinner = (target) => {
  // 클릭한 칸의 인덱스 확인
  let rowIndex = target.parentNode.rowIndex;
  let cellIndex = target.cellIndex;

  let hasWinner = false;

  // 가로 줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로 줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
};

const checkHasWinnerAndDraw = (target) => {
  const hasWinner = checkWinner(target);

  // 승자가 있는가?
  if (hasWinner) {
    $result.textContent = `${turn} 님이 승리!`;
    $table.removeEventListener('click', callback);
    return;
  }

  // 무승부 인가?
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = '무승부!';
    $table.removeEventListener('click', callback);
    return;
  }

  // 승자가 없고 무승부도 아니면 차례를 넘김
  turn = turn === 'O' ? 'X' : 'O';
};

const callback = (event) => {
  if (event.target.textContent !== '') {
    $result.textContent = '빈 칸이 아닙니다!';
    return;
  }
  // 빈 칸일 경우
  event.target.textContent = turn;
  checkHasWinnerAndDraw(event.target);

  // X(컴퓨터) 차례 인가?
  if (turn === 'X') {
    //무작위로 빈칸 하나를 골라 X를 넣는다.
    const emptyCells = rows.flat().filter((value) => !value.textContent);
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'X';

    checkHasWinnerAndDraw(randomCell);
  }
};

// 3x3 게임판 그리기
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let k = 0; k < 3; k++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.appendChild($td);
  }
  rows.push(cells);
  $table.appendChild($tr);
  $table.addEventListener('click', callback);
}

body.appendChild($table);
body.appendChild($result);
