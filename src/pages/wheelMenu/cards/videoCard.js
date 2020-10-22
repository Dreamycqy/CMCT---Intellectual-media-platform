import React from 'react'
import { Spin } from 'antd'
import Slider from 'react-slick'
import video from '@/assets/play.png'

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
              width: 310,
              height: 180,
              border: '1px solid #e8e8e8',
              backgroundSize: '310px 180px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => window.open(e.url)}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', zIndex: 9, width: 310, height: 180, backgroundColor: '#ffffffa6' }}>
                <img src={video} alt="" style={{ marginTop: 60, marginLeft: 120 }} width="60px" />
              </div>
              <img src={e.cover ? `https://images.weserv.nl/?url=${e.cover}` : null} alt="" style={{ objectFit: 'cover' }} width="310px" height="180px" />
            </div>
          </div>
          <div style={{ textAlign: 'center', width: 310 }}>
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
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>某场所</div>
        <div style={{ color: '#fff', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>北京市海淀区清华大学某场所</div>
        <Spin spinning={loadingVideo} size="large" style={{ marginTop: 100 }}>
          <Slider
            style={{ height: 190, marginTop: 10 }}
            slidesPerRow={1}
            autoplay autoplaySpeed={5000}
          >
            {this.renderImg(videoList)}
          </Slider>
        </Spin>
      </div>
    )
  }
}
