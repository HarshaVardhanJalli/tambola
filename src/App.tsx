import React from 'react';
import { Col, Row } from 'antd';
import NumberBoard from './components/NumberBoard';
import LotteryActivity from './components/LotteryActivity';

import './App.css';

function App() {
  return (
    <div className='appContainer'>
      <Row>
        <Col span={24}>
          <NumberBoard />
        </Col>
      </Row>
    </div>
  );
}

export default App;
