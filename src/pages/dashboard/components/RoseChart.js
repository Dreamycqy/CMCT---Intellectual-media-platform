import React, { useState, useEffect } from 'react'

import { Charts } from '@jiaminghi/data-view-react'

import './RoseChart.less'

function getData() {
  return {
    series: [
      {
        type: 'pie',
        radius: '50%',
        roseSort: false,
        data: [
          { name: '风景区', value: 36 },
          { name: '博物馆', value: 18 },
          { name: '古迹', value: 24 },
          { name: '餐馆', value: 10 },
          { name: '娱乐', value: 12 },
        ],
        insideLabel: {
          show: false,
        },
        outsideLabel: {
          formatter: '{name} {percent}%',
          labelLineEndLength: 20,
          style: {
            fill: '#fff',
          },
          labelLineStyle: {
            stroke: '#fff',
          },
        },
        roseType: true,
      },
    ],
    color: [
      '#da2f00',
      '#fa3600',
      '#ff4411',
      '#ff724c',
      '#541200',
      '#801b00',
      '#a02200',
      '#5d1400',
      '#b72700',
    ],
  }
}

export default () => {
  const [option, setData] = useState({})

  useEffect(() => {
    createData()

    setInterval(createData, 30000)
  }, [])

  function createData() {
    setData(getData())
  }

  return (
    <div style={{ height: 240 }}>
      <Charts option={option} />
    </div>
  )
}
