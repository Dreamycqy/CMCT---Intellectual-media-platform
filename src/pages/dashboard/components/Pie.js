import React from 'react'
import { Charts } from '@jiaminghi/data-view-react'
import Styles from './Cards.less'

function randomExtend(minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}
export default class Pies extends React.Component {
  render() {
    const card = {
      total: {
        number: [randomExtend(9000, 10000)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#ea6027',
          fontWeight: 'bold',
        },
      },
      num: {
        number: [randomExtend(30, 60)],
        content: '{nt}',
        textAlign: 'right',
        style: {
          fill: '#26fcd8',
          fontWeight: 'bold',
        },
      },
      ring: {
        series: [
          {
            type: 'gauge',
            startAngle: -Math.PI / 2,
            endAngle: Math.PI * 1.5,
            arcLineWidth: 13,
            radius: '80%',
            data: [{ name: '满意占比', value: 70 }],
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            pointer: {
              show: false,
            },
            backgroundArc: {
              style: {
                stroke: '#224590',
              },
            },
            details: {
              show: true,
              formatter: '满意占比{value}%',
              style: {
                fill: '#1ed3e5',
                fontSize: 20,
              },
            },
          },
        ],
        color: ['#03d3ec'],
      },
    }
    return (
      <div style={{ height: 240 }}>
        <Charts className={Styles.ring_charts} option={card.ring} />
      </div>
    )
  }
}
