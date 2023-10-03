import React from 'react';
import { Button, Card } from 'antd';
import '../App.css';

const LotteryActivity = (props:any) => {
    const {generateRandomNumber, resetGame, pickedNumbers, unPickedNumbers, currentNumber} = props;
  return (
    <div className="lotteryActivity">
        {unPickedNumbers.length > 0 ? <Button type="primary" className='generateBtn' onClick={() => {generateRandomNumber()}}>{pickedNumbers.length === 0 ? 'Start Game' : (unPickedNumbers.length === 0 ? 'Game Over!' : 'Generate Number')}</Button> : 
        <Button type="primary" className='generateBtn' onClick={() => {resetGame()}}>Restart Game</Button>}
        <Card className="currentNumber" style={{ width: 300 }}>
            <p>{currentNumber}</p>
        </Card>
        <Card style={{ width: 300 }}>
            <Card   style={{ width: 150 }}>
                <div>
                    Left <span className="unPickedCount">{unPickedNumbers.length}</span>
                </div>
            </Card>
            <Card  style={{ width: 150 }}>
                <div>
                    Done <span className="pickedCount">{pickedNumbers.length}</span>
                </div>
            </Card>
        </Card>
        <Card className="lastFive" style={{ width: 300, height: 50 }}>
            <p>{pickedNumbers.legnth === 0 ? 'No numbers picked yet!' : pickedNumbers.slice(-5).join(" , ")}</p>
        </Card>
        <Button type="primary" className='resetBtn' onClick={() => {resetGame()}} danger>Reset Game</Button>
    </div>
  );
}

export default LotteryActivity;