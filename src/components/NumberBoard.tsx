import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import '../App.css';
import LotteryActivity from './LotteryActivity';

const NumberBoard = () => {
  const numbersConst = 90;
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [allNumbers, setAllNumbers] = useState(
    Array.from({ length: numbersConst }, (_, index) => index + 1)
  );
  const [unPickedNumbers, setUnPickedNumbers] = useState<(number | null)[]>(
    Array.from({ length: numbersConst }, (_, index) => index + 1)
  );
  const [pickedNumbers, setPickedNumbers] = useState<(number | null)[] | number | null | any>([]);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const columns = Array.from({ length: 10 }, (_, index) => ({
    title: `Column ${index + 1}`,
    dataIndex: `number${index + 1}`,
    render: (text: number | null) => (
      <p className={`numberBox ${text} ${pickedNumbers.includes(text) ? 'green' : ''}`}>
        {text}
      </p>
    ),
  }));

  const data = Array.from({ length: Math.ceil(allNumbers.length / 10) }, (_, rowIndex) => {
    const rowData: Record<string, number | null> = {};
    for (let i = 0; i < 10; i++) {
      const numberIndex = rowIndex * 10 + i;
      if (numberIndex < allNumbers.length) {
        rowData[`number${i + 1}`] = allNumbers[numberIndex];
      } else {
        rowData[`number${i + 1}`] = null;
      }
    }
    return {
      key: rowIndex,
      ...rowData,
    };
  });

  const removeRandomElementFromArray = () => {
    const randomIndex = Math.floor(Math.random() * unPickedNumbers.length);
    const removedElement = unPickedNumbers.splice(randomIndex, 1)[0];
    return removedElement;
  };

  const speakNumber = (numberToSpeak: any) => {
    const synth = window.speechSynthesis;
    const utterThat = new SpeechSynthesisUtterance(numberToSpeak.toString());
    utterThat.voice = synth.getVoices()[5];
    synth.speak(utterThat);
  };

  const generateRandomNumber = () => {
    if (unPickedNumbers.length === 0) {
      return null;
    }
    const randomNumber = removeRandomElementFromArray();
    setCurrentNumber(randomNumber);
    speakNumber(randomNumber);
    setUnPickedNumbers(unPickedNumbers.filter(num => num !== randomNumber));
    setPickedNumbers([...pickedNumbers, randomNumber]);
  };

  const resetGame = () => {
    setCurrentNumber(null);
    setPickedNumbers([]);
    setUnPickedNumbers(Array.from({ length: numbersConst }, (_, index) => index + 1));
    hideModal();
  };

  return (
    <div className="numberBoardContainer">
        <Row gutter={3}>
                <Col span={18}>
                    <Row gutter={1}>
                    <Table
                       dataSource={data}
                       columns={columns}
                       pagination={false}
                       bordered
                       rowKey="key"
                       style={{ marginBottom: '16px' }}
                       showHeader={false}
                    />
                    <Modal
                        title="Reset Game?"
                        visible={open}
                        onOk={resetGame}
                        onCancel={hideModal}
                        okText="Reset"
                        cancelText="Cancel"
                    >
                        Do you really want to reset the game?
                    </Modal>
                    </Row>
                </Col>
                <Col span={6}>
                <LotteryActivity
                    pickedNumbers={pickedNumbers}
                    unPickedNumbers={unPickedNumbers}
                    currentNumber={currentNumber}
                    generateRandomNumber={generateRandomNumber}
                    resetGame={showModal}
                />
                </Col>
            </Row>
     
      
    </div>
  );
};

export default NumberBoard;
