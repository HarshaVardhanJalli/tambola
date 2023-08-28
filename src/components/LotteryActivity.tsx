import React from 'react';
import { Button, Card } from 'antd';
import '../App.css';

const LotteryActivity = (props:any) => {
    const {generateRandomNumber, resetGame, pickedNumbers, unPickedNumbers, currentNumber} = props;
  return (
    <div className="lotteryActivity">
        {unPickedNumbers.length > 0 ? <Button type="primary" className='generateBtn' onClick={() => {generateRandomNumber()}}>{pickedNumbers.length === 0 ? 'Start Game' : (unPickedNumbers.length === 0 ? 'Game Over!' : 'Generate Number')}</Button> : 
        <Button type="primary" className='generateBtn' onClick={() => {resetGame()}}>Reset Game</Button>}
        <Card className="currentNumber" style={{ width: 300 }}>
            <p>{currentNumber}</p>
        </Card>
        <Card style={{ width: 300 }}>
            <Card className="unPickedCount"  style={{ width: 150 }}>
                Left {unPickedNumbers.length}
            </Card>
            <Card className="pickedCount" style={{ width: 150 }}>
                Done {pickedNumbers.length}
            </Card>
        </Card>
        <Card className="lastFive" style={{ width: 300 }}>
            <p>{pickedNumbers.slice(-5).join(" , ")}</p>
        </Card>
    </div>
  );
}

export default LotteryActivity;