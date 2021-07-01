const bodyParser = require('body-parser')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: '',
    color: '#888888',
    head: 'default',
    tail: 'default'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request, response) {
  var { game, turn, board, you} = request.body

  var possibleMoves = ['up', 'down', 'left', 'right']
  var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

  if(canMoveLeft(you, board)) {
    move = 'left';
  } else if(canMoveUp(you, board)) {
    move = 'up';
  } else if (canMoveRight(you, board)) {
    move = 'right'
  } else if (canMoveDown(you, board)) {
    move = 'down';
  } else {
    console.log(`Cannot move!!! x-${you.head.x} y-${you.head.y})`);
  }

  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function canMoveLeft(you, board) {
  return you.head.x > 0;
}

function canMoveDown(you, board) {
  return you.head.y > 0;
}

function canMoveUp( you, board) {
  return you.head.y < (board.height - 1);
}

function canMoveRight(you, board) {
  return you.head.x < (board.width - 1);
}

function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
