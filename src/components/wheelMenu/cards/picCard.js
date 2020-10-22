import React from 'react'
import Slider from 'react-slick'

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
        <div style={{ textAlign: 'center' }}>
          <a href="javascript:;" onClick={() => window.open(e.object)}>
            <img style={{ border: '1px solid #e8e8e8', margin: 10, objectFit: 'cover' }} src={e.object} alt="" height="180px" width="300px" />
          </a>
        </div>,
      )
    })
    return result
  }

  render() {
    const { imgList } = this.props
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>某场所</div>
        <div style={{ color: '#fff', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>北京市海淀区清华大学某场所</div>
        <Slider
          style={{ height: 190 }}
          slidesPerRow={1}
          autoplay autoplaySpeed={5000}
        >
          {this.renderImg(imgList)}
        </Slider>
      </div>
    )
  }
}
