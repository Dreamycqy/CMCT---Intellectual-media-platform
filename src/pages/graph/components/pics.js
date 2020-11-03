import React from 'react'
import { Card, Spin, Button, Modal } from 'antd'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Styles from '../style.less'

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectImg: {
        src: '',
        index: 1,
      },
      modalVisible: false,
    }
  }

  renderImg = (list) => {
    const result = []
    list.forEach((e, index) => {
      result.push(
        <div>
          <a href="javascript:;" onClick={() => this.chooseImg(index)}>
            <img style={{ border: '1px solid #e8e8e8', margin: 10, objectFit: 'cover' }} src={e.object} alt="" height="160px" width="160px" />
          </a>
        </div>,
      )
    })
    return result
  }

  chooseImg = (num) => {
    const { imgList } = this.state
    this.setState({
      modalVisible: true,
      selectImg: {
        index: num,
        src: imgList[num].object,
      },
    })
  }

  render() {
    const { modalVisible, selectImg } = this.state
    const { loading, imgList } = this.props
    return (
      <div>
        <Card className={Styles.myCard} style={{ display: imgList.length === 0 ? 'none' : 'block', marginTop: 10 }} id="components-anchor-pics" title="相关图片">
          <Spin spinning={loading}>
            <div style={{ height: 190 }}>
              <Slider
                style={{ height: 180, backgroundColor: 'aliceblue' }}
                dots slidesPerRow={4}
                autoplay autoplaySpeed={3000}
              >
                {this.renderImg(imgList)}
              </Slider>
            </div>
          </Spin>
        </Card>
        <Modal
          title="相关图片"
          visible={modalVisible}
          footer={null}
          width="1000px"
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <div style={{ marginTop: 20 }}>
            <div style={{ textAlign: 'center', minHeight: 320 }}>
              <img src={selectImg.src} alt="" style={{ maxHeight: 300 }} />
            </div>
            <div style={{ marginTop: 30, textAlign: 'center' }}>
              <Button type="primary" style={{ marginRight: 20 }} disabled={selectImg.index === 0} onClick={() => this.chooseImg(selectImg.index - 1)}>前一张</Button>
              <span>
                第&nbsp;
                {selectImg.index + 1}
                &nbsp;
                /
                &nbsp;
                {imgList.length}
                &nbsp;张
              </span>
              <Button type="primary" style={{ marginLeft: 20 }} disabled={selectImg.index === imgList.length - 1} onClick={() => this.chooseImg(selectImg.index + 1)}>后一张</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default News
