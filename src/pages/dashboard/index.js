import React from 'react'
import { Row, Col } from 'antd'
import { BorderBox11 } from '@jiaminghi/data-view-react'
import Map from '../map/newMap'
import TopHeader from './components/TopHeader'
import DigitalFlop from './components/DigitalFlop'
import RightChart2 from './components/RightChart2'
import RankingBoard from './components/RankingBoard'
import RoseChart from './components/RoseChart'
import WaterLevelChart from './components/WaterLevelChart'
import ScrollBoard from './components/ScrollBoard'
import Cards from './components/Cards'

import bg from './components/img/bg.png'

class MapPage extends React.Component {
  render() {
    return (
      <div
        id="data-view"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#030409',
          color: '#fff',
          minHeight: 800,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: '100% 100%',
            boxShadow: '0 0 3px blue',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <TopHeader />
          <Row style={{ height: 400 }}>
            <Col span={8}>
              <DigitalFlop type={1} />
              <ScrollBoard />
            </Col>
            <Col span={8}>
              <BorderBox11
                style={{ height: 400, padding: '60px 20px 0 20px' }}
                title="最热地区"
              >
                <Map type="small" />
              </BorderBox11>
            </Col>
            <Col span={8}>
              <DigitalFlop type={2} />
              <RightChart2 />
            </Col>
          </Row>
          <div style={{ margin: '20px 0' }}>
            <Cards />
          </div>
        </div>
      </div>
    )
  }
}

export default MapPage
