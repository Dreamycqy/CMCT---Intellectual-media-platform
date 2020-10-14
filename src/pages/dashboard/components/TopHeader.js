import React from 'react'

import { Decoration5, Decoration8 } from '@jiaminghi/data-view-react'

import Styles from './TopHeader.less'

export default () => {
  return (
    <div className={Styles.top_header}>
      <Decoration8 className={Styles.header_left_decoration} />
      <Decoration5 className={Styles.header_center_decoration} />
      <Decoration8 className={Styles.header_right_decoration} reverse />
      <div className={Styles.center_title}>文旅智媒系统大数据</div>
    </div>
  )
}
