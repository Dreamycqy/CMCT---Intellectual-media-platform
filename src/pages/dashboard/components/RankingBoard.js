import React from 'react'

import { ScrollRankingBoard } from '@jiaminghi/data-view-react'

import './RankingBoard.less'

const config = {
  data: [
    {
      name: '北京近期开展xxxx活动...',
      value: 55,
    },
    {
      name: '北京近期开展yyyy活动...',
      value: 120,
    },
    {
      name: '北京近期开展zzzz活动...',
      value: 78,
    },
    {
      name: '天津近期开展xxxx活动...',
      value: 66,
    },
    {
      name: '上海近期开展xxxx活动...',
      value: 80,
    },
    {
      name: '杭州近期开展xxxx活动...',
      value: 45,
    },
    {
      name: '广州近期开展xxxx活动...',
      value: 29,
    },
  ],
  rowNum: 7,
}

export default () => {
  return (
    <div style={{ height: 240, padding: 10 }}>
      <ScrollRankingBoard config={config} />
    </div>
  )
}
