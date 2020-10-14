import React from 'react'

import { ScrollBoard } from '@jiaminghi/data-view-react'

import './ScrollBoard.less'

const config = {
  header: ['地区', '更新时间', '热度'],
  data: [
    ['故宫博物院', '2019-07-01', '1590'],
    ['玉渊潭公园', '2019-07-02', '1330'],
    ['什刹海公园', '2019-07-03', '1036'],
    ['颐和园', '2019-07-04', '782'],
    ['圆明园', '2019-07-05', '611'],
    ['清华大学', '2019-07-06', '532'],
    ['北京大学', '2019-07-07', '476'],
    ['国家科技馆', '2019-07-08', '253'],
    ['国家生物博物馆', '2019-07-09', '225'],
    ['军事博物馆', '2019-07-10', '193'],
  ],
  index: true,
  columnWidth: [100, 120, 150],
  align: ['center'],
  rowNum: 7,
  headerBGC: '#1981f6',
  headerHeight: 45,
  oddRowBGC: 'rgba(0, 44, 81, 0.8)',
  evenRowBGC: 'rgba(10, 29, 50, 0.8)',
}

export default () => {
  return (
    <div id="scroll-board" style={{ height: 260, padding: 10 }}>
      <ScrollBoard config={config} />
    </div>
  )
}
