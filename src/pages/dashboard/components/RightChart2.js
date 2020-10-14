import React from 'react'
import { BorderBox8, Charts } from '@jiaminghi/data-view-react'

const option = {
  legend: {
    data: [
      {
        name: '内容增长',
        color: '#00baff',
      },
      {
        name: '用户增长',
        color: '#ff5ca9',
      },
      {
        name: '访问增长',
        color: '#3de7c9',
      },
      {
        name: '用户回头率增长',
        color: '#f5d94e',
      },
    ],
    textStyle: {
      fill: '#fff',
    },
  },
  xAxis: {
    data: ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'],
    axisLine: {
      style: {
        stroke: '#999',
      },
    },
    axisLabel: {
      style: {
        fill: '#999',
      },
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    data: 'value',
    splitLine: {
      show: false,
    },
    axisLine: {
      style: {
        stroke: '#999',
      },
    },
    axisLabel: {
      style: {
        fill: '#999',
      },
    },
    axisTick: {
      show: false,
    },
    min: 0,
    max: 8,
  },
  series: [
    {
      name: '内容增长',
      data: [2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5],
      type: 'bar',
      barStyle: {
        fill: 'rgba(0, 186, 255, 0.4)',
      },
    },
    {
      name: '用户增长',
      data: [2.5, 3.5, 6.5, 6.5, 7.5, 6.5, 2.5],
      type: 'line',
      lineStyle: {
        stroke: '#ff5ca9',
      },
      linePoint: {
        radius: 4,
        style: {
          fill: '#ff5ca9',
          stroke: 'transparent',
        },
      },
    },
    {
      name: '访问增长',
      data: [1.3, 2.3, 5.3, 5.3, 6.3, 5.3, 1.3],
      type: 'line',
      smooth: true,
      lineArea: {
        show: true,
        gradient: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)'],
      },
      lineStyle: {
        lineDash: [5, 5],
      },
      linePoint: {
        radius: 4,
        style: {
          fill: '#00db95',
        },
      },
    },
    {
      data: [0.2, 1.2, 4.2, 4.2, 5.2, 4.2, 0.2],
      type: 'line',
      name: '用户回头率增长',
      lineArea: {
        show: true,
        gradient: ['rgba(245, 217, 79, 0.8)', 'rgba(245, 217, 79, 0.2)'],
      },
      lineStyle: {
        stroke: '#f5d94e',
      },
      linePoint: {
        radius: 4,
        style: {
          fill: '#f5d94e',
          stroke: 'transparent',
        },
      },
    },
  ],
}

export default () => (
  <BorderBox8 style={{ height: 240, margin: 10 }}>
    <div style={{
      position: 'absolute',
      right: '70px',
      textAlign: 'right',
      fontSize: '20px',
      top: '10px',
    }}
    >
      用户使用趋势（月同比）
    </div>
    <Charts option={option} />
  </BorderBox8>
)
