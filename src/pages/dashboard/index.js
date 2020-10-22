import React from 'react'
import { Row, Col } from 'antd'
import { BorderBox11 } from '@jiaminghi/data-view-react'
import RandomGraph from './RandomGraph'
import Map from '../map/newMap'
import TopHeader from './components/TopHeader'
import DigitalFlop from './components/DigitalFlop'
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
          <Row style={{ height: 800 }}>
            <Col span={16}>
              <Row>
                <Col span={12}>
                  <DigitalFlop type={1} />
                  <ScrollBoard />
                </Col>
                <Col span={12}>
                  <BorderBox11
                    style={{ height: 400, padding: '60px 20px 0 20px' }}
                    title="最热地区"
                  >
                    <Map type="small" />
                  </BorderBox11>
                </Col>
              </Row>
              <div style={{ margin: 20 }}>
                <Cards />
              </div>
            </Col>
            <Col span={8}>
              <DigitalFlop type={2} />
              <RandomGraph />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default MapPage
