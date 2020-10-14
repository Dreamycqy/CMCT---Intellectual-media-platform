import React from 'react'
import { DigitalFlop } from '@jiaminghi/data-view-react'
import Styles from './DigitalFlop.less'

const data1 = [
  {
    title: '录入实体',
    number: {
      number: [randomExtend(40000, 50000)],
      content: '{nt}',
      textAlign: 'right',
      style: {
        fill: '#4d99fc',
        fontWeight: 'bold',
      },
    },
    unit: '个',
  },
  {
    title: '三元组',
    number: {
      number: [randomExtend(100000, 120000)],
      content: '{nt}',
      textAlign: 'right',
      style: {
        fill: '#f46827',
        fontWeight: 'bold',
      },
    },
    unit: '组',
  },
  {
    title: '视频资源',
    number: {
      number: [randomExtend(200, 300)],
      content: '{nt}',
      textAlign: 'right',
      style: {
        fill: '#40faee',
        fontWeight: 'bold',
      },
    },
    unit: '个',
  },
]

const data2 = [
  {
    title: '用户数',
    number: {
      number: [randomExtend(400, 500)],
      content: '{nt}',
      textAlign: 'right',
      style: {
        fill: '#4d99fc',
        fontWeight: 'bold',
      },
    },
    unit: '个',
  },
  {
    title: '新增用户',
    number: {
      number: [randomExtend(10, 20)],
      content: '{nt}',
      textAlign: 'right',
      style: {
        fill: '#f46827',
        fontWeight: 'bold',
      },
    },
    unit: '组',
  },
  {
    title: '昨日访问',
    number: {
      number: [randomExtend(2000, 3000)],
      content: '{nt}',
      textAlign: 'right',
      style: {
        fill: '#40faee',
        fontWeight: 'bold',
      },
    },
    unit: '个',
  },
]

function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}

export default class DigitalFlopC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      digitalFlopData: this.getData(),
    }
  }

  getData = () => {
    if (this.props.type === 1) {
      return data1
    } else {
      return data2
    }
  }

  render() {
    const { digitalFlopData } = this.state
    return (
      <div className={Styles.digital_flop}>
        {digitalFlopData.map(item => (
          <div className={Styles.digital_flop_item} key={item.title}>
            <div className={Styles.digital_flop_title}>{item.title}</div>
            <div className={Styles.digital_flop}>
              <DigitalFlop config={item.number} style={{ width: '100px', height: '50px' }} />
              <div className={Styles.unit}>{item.unit}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
