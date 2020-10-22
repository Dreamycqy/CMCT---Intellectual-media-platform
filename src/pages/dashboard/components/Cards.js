import React from 'react'
import RoseChart from './RoseChart'
import RankingBoard from './RankingBoard'
import D3SimpleTagCloudChart from './D3SimpleTagCloudChart'
import Styles from './Cards.less'

export default class Cards extends React.Component {
  constructor(props) {
    super(props)
    this.cards = [{
      title: '地区新闻热度',
      sign: '北京',
      content: <RankingBoard />,
    }, {
      title: '热门地点类型',
      sign: '风景区',
      content: <RoseChart />,
    }, {
      title: '热门词云',
      sign: '中华文化',
      content: <div style={{ height: 255 }}><D3SimpleTagCloudChart /></div>,
    }]
  }

  render() {
    return (
      <div className={Styles.cards}>
        {this.cards.map((card) => (
          <div className={Styles.card_item} key={card.title}>
            <div className={Styles.card_header}>
              <div className={Styles.card_header_left}>{card.title}</div>
              <div className={Styles.card_header_right}>{card.sign}</div>
            </div>
            {card.content}
          </div>
        ))}
      </div>
    )
  }
}
