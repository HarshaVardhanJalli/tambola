import React, { useState } from 'react';
import { Col, Row } from 'antd';
import '../App.css';
import LotteryActivity from './LotteryActivity';

const NumberBoard = () => {

    const numbersConst = 90;
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [allNumbers, setAllNumbers] = useState(Array.from({ length: numbersConst }, (_, index) => index + 1));
    const [unPickedNumbers, setUnPickedNumbers] = useState<(number| null)[]>(Array.from({ length: numbersConst }, (_, index) => index + 1));
    const [pickedNumbers, setPickedNumbers] = useState<(number | null)[] | number | null | any>([]);
    
    const getAllNumbersGrid = () => {
        if(allNumbers && allNumbers.length){
            return (allNumbers.map((number, index) => {
                return <Col className='numberBoxCol' span={2}><p className={`numberBox ${number} ${pickedNumbers.includes(number) ? 'green' : ''}`}>{number}</p></Col>
            }));
        }
    };

    const removeRandomElementFromArray = () => {
        const randomIndex = Math.floor(Math.random() * unPickedNumbers.length);
        const removedElement = unPickedNumbers.splice(randomIndex, 1)[0];
        return removedElement;
    }

    const generateRandomNumber = () => {
        if (unPickedNumbers.length === 0) {
            return null; // Return null if the array is empty
        }
        const randomNumber = removeRandomElementFromArray();
        setCurrentNumber(randomNumber);
        setUnPickedNumbers(unPickedNumbers.filter(num => num !== randomNumber));
        setPickedNumbers([...pickedNumbers, randomNumber]);
    }

    const resetGame = () => {
        setCurrentNumber(0);
        setPickedNumbers([]);
        setUnPickedNumbers(Array.from({ length: numbersConst }, (_, index) => index + 1));
    } 

    return (
        <div className="numberBoardContainer">
            <Row gutter={3}>
                <Col span={18}>
                    <Row gutter={1}>
                        {getAllNumbersGrid()}
                    </Row>
                </Col>
                <Col span={6}>
                    <LotteryActivity 
                    pickedNumbers={pickedNumbers}
                    unPickedNumbers={unPickedNumbers}
                    currentNumber={currentNumber}
                    generateRandomNumber={generateRandomNumber}
                    resetGame={resetGame}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default NumberBoard;