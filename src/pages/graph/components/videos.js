import React from 'react'
import { Spin, Card } from 'antd'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import video from '@/assets/play.png'
import Styles from '../style.less'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  renderImg = (list) => {
    const result = []
    list.forEach((e) => {
      result.push(
        <div>
          <div
            style={{
              width: 240,
              height: 160,
              border: '1px solid #e8e8e8',
              backgroundSize: '240px 160px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => window.open(e.url)}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', zIndex: 9, width: 240, height: 160, backgroundColor: '#ffffffa6' }}>
                <img src={video} alt="" style={{ marginTop: 50, marginLeft: 90 }} width="60px" />
              </div>
              <img src={e.cover ? `https://images.weserv.nl/?url=${e.cover}` : null} alt="" style={{ objectFit: 'cover' }} width="240px" height="160px" />
            </div>
          </div>
          <div style={{ textAlign: 'center', width: 240 }}>
            <h4 style={{ marginTop: 6, padding: '0 30px' }}>
              <a href="javascript:;" style={{ overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical', display: '-webkit-box', WebkitLineClamp: 2 }} onClick={() => window.open(e.url)}>
                {e.name}
              </a>
            </h4>
          </div>
        </div>,
      )
    })
    return result
  }

  render() {
    const { videoList, loadingVideo } = this.props
    return (
      <Card className={Styles.myCard} style={{ marginTop: 10, height: 340 }} id="components-anchor-pics" title="相关视频">
        <Spin spinning={loadingVideo} size="large" style={{ marginTop: 100 }}>
          <Slider
            style={{ height: 220, marginTop: 10 }}
            slidesPerRow={3} dots
            autoplay autoplaySpeed={5000}
          >
            {this.renderImg(videoList)}
          </Slider>
        </Spin>
      </Card>
    )
  }
}
