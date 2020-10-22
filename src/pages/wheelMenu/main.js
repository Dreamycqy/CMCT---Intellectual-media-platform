import React from 'react'
import PieMenu, { PieCenter, Slice } from 'react-pie-menu'
import { ThemeProvider } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getJimuVideo } from '@/services/edukg'
import {
  faImages,
  faVideo,
  faInfoCircle,
  faProjectDiagram,
} from '@fortawesome/free-solid-svg-icons'
import InfoCard from './cards/infoCard'
import VideoCard from './cards/videoCard'
import PicCard from './cards/picCard'
import * as styles from './style.js'

const theme = {
  pieMenu: {
    container: styles.container,
    center: styles.center,
  },
  slice: {
    container: styles.slice,
  },
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      choice: 0,
      type: 'info',
      imgList: [
        { object: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
        { object: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
        { object: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
        { object: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
        { object: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
        { object: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' },
      ],
      videoList: [],
      loadingVideo: false,
    }
  }

  componentWillMount = () => {
    this.getVideos('清华大学')
  }

  getVideos = async (name) => {
    this.setState({ loadingVideo: true })
    const data = await getJimuVideo({
      hit_size: 20,
      q: name,
    })
    if (data) {
      this.setState({ videoList: this.handleVideoData(data.items) })
    }
    this.setState({ loadingVideo: false })
  }

  checkVideo = (list) => {
    let url = ''
    let cover = ''
    list.forEach((e) => {
      if (e.name.indexOf('cover') > -1) {
        cover = e.url
      } else if (e.name === 'page_url' || e.name === 'v3_video') {
        url = e.url
      }
    })
    return { url, cover }
  }

  handleVideoData = (list) => {
    const result = []
    list.forEach((e) => {
      const { url, cover } = this.checkVideo(e.files)
      result.push({
        name: e.title,
        time: e.published,
        source: e.vendor,
        length: e.media.duration,
        url,
        cover,
      })
    })
    return result
  }

  selectOption = (type) => {
    this.setState({ type })
    if (type === 'interest') {
      this.props.toggle(true)
    } else {
      this.props.toggle(false)
    }
  }

  renderMain = (type) => {
    const { imgList, videoList, loadingVideo } = this.state
    switch (type) {
      case 'info':
        return <InfoCard />
      case 'pic':
        return <PicCard imgList={imgList} />
      case 'video':
        return <VideoCard videoList={videoList} loadingVideo={loadingVideo} />
      case 'interest':
        return <InfoCard />
      default:
        return null
    }
  }

  render() {
    const { choice, type } = this.state
    const Center = props => (
      <PieCenter {...props} onClick={this.goBack}> {/* eslint-disable-line */}
        <div style={{ borderRadius: 100, margin: 42 }}>
          {this.renderMain(type)}
        </div>
      </PieCenter>
    )
    return (
      <ThemeProvider theme={theme}>
        <PieMenu centerRadius="200px" radius="250px" Center={Center}>
          {choice === 0 && (
            <>
              <Slice onSelect={() => this.selectOption('info')} attrs={{ filled: 'true', active: `${type === 'info'}` }}>
                <FontAwesomeIcon icon={faInfoCircle} size="2x" />
              </Slice>
              <Slice onSelect={() => this.selectOption('pic')} attrs={{ filled: 'true', active: `${type === 'pic'}` }}>
                <FontAwesomeIcon icon={faImages} size="2x" />
              </Slice>
              <Slice onSelect={() => this.selectOption('video')} attrs={{ filled: 'true', active: `${type === 'video'}` }}>
                <FontAwesomeIcon icon={faVideo} size="2x" />
              </Slice>
              <Slice onSelect={() => this.selectOption('interest')} attrs={{ filled: 'true', active: `${type === 'interest'}` }}>
                <FontAwesomeIcon icon={faProjectDiagram} size="2x" />
              </Slice>
            </>
          )}
        </PieMenu>
      </ThemeProvider>
    )
  }
}
