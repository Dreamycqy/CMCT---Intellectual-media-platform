import React from 'react'
import { Card, Spin, Table, Icon, Button, Popover } from 'antd'
import _ from 'lodash'
import { connect } from 'dva'
import { infoByUri } from '@/services/index'
import { getJimuVideo } from '@/services/edukg'
import { getUrlParams } from '@/utils/common'
import place from '@/assets/place.png'

import Explore from './explore'
import Styles from './style.less'
import NewsList from './components/news'
import PicsList from './components/pics'
import Relation from './components/relation'
import VideoCard from './components/videos'

const columns = [{
  title: '标签',
  dataIndex: 'predicate_label',
  width: 150,
  align: 'left',
}, {
  title: 'none',
  width: 10,
}, {
  title: '内容',
  align: 'left',
  render: (text, record) => {
    return (
      <span>{record.object_label ? record.object_label : record.object}</span>
    )
  },
}]

@connect()
class FirstGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forcename: '',
      uri: '',
      dataSource: [],
      loading: false,
      imgList: [],
      showExplore: true,
      videoList: [],
      loadingVideo: false,
      info: {
        picsrc: '',
        name: '',
        geo: [0, 0],
        desc: '',
        address: '',
        his: '',
      },
    }
  }

  componentWillMount() {
    const { uri } = getUrlParams()
    this.setState({ uri })
    this.getKg(uri)
  }

  getKg = async (uri) => {
    this.setState({ loading: true })
    const data = await infoByUri({
      uri,
    })
    if (data.data) {
      let picsrc = '' // 首图
      let name = '' // 名称
      const geo = [0, 0] // 经纬
      let address = '' // 地址
      let desc = '' // 简介
      let his = '' // 所在区
      const imgList = []
      const dataSource = []
      data.data.property.forEach((e) => {
        if (e.predicate_label === '图片链接') {
          if (picsrc === '') {
            picsrc = e.object
          }
          imgList.push({
            object: e.object,
          })
        } else if (e.predicate_label === '中文名') {
          name = e.object
        } else if (e.predicate_label === '经度') {
          geo[0] = Number(e.object)
        } else if (e.predicate_label === '纬度') {
          geo[1] = Number(e.object)
        } else if (e.predicate_label === '地址') {
          address = e.object
        } else if (e.predicate_label === '简介') {
          desc = e.object
        } else if (e.predicate_label === '历史') {
          his = e.object
        } else {
          const target = _.find(dataSource, { predicate: e.predicate })
          if (target) {
            if (e.object_label) {
              target.object_label += `, ${e.object_label}`
            } else {
              target.object += `, ${e.object}`
            }
          } else {
            dataSource.push(e)
          }
        }
      })
      const people = _.findIndex(dataSource, { predicate_label: '相关人物' })
      dataSource.push(dataSource[people])
      dataSource.splice(people, 1)
      this.setState({
        info: {
          picsrc,
          name,
          geo,
          desc,
          address,
          his,
        },
        forcename: name,
        imgList,
        dataSource,
      })
      this.getVideos(name)
    }
    this.setState({ loading: false })
  }

  getVideos = async (name) => {
    this.setState({ loadingVideo: true })
    const data = await getJimuVideo({
      hit_size: 20,
      q: name,
    })
    if (data) {
      console.log(data.items)
      this.setState({ videoList: this.handleVideoData(data.items) })
    }
    this.setState({ loadingVideo: false })
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

  render() {
    const {
      forcename, dataSource, loading, uri, videoList, loadingVideo,
      imgList, showExplore, info,
    } = this.state
    return (
      <div style={{ paddingTop: 10, overflow: 'hidden', minWidth: 1300, backgroundColor: '#ffffffe9' }}>
        <div style={{ float: 'left', width: '65%', padding: 10 }}>
          <Card
            className={Styles.myCard}
            id="components-anchor-graph"
            title={(
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                <img src={place} alt="" height="40px" />
                <span style={{ color: '#24b0e6', marginLeft: 10 }}>{forcename}</span>
              </div>
            )}
            extra={(
              <div>
                <Button type="primary" onClick={() => this.setState({ showExplore: !showExplore })}>
                  {showExplore === false ? '展开图谱探索' : '隐藏图谱探索'}
                </Button>
                <Popover
                  content={(
                    <div>
                      一些说明。
                    </div>
                  )}
                  title="说明"
                >
                  <a href="javascript:;"><Icon style={{ fontSize: 20, marginLeft: 20 }} type="question-circle" /></a>
                </Popover>
              </div>
            )}
          >
            <Spin spinning={loading}>
              <div style={{ padding: 20 }}>
                <div
                  style={{
                    marginBottom: 20,
                    display: showExplore === true ? 'block' : 'none',
                  }}
                >
                  <div style={{ width: '100%', height: 500, backgroundColor: '#e8e8e8' }}>
                    <Explore uri={uri} forcename={forcename} />
                  </div>
                </div>
                <div style={{ marginBottom: 20, fontSize: 18 }}>
                  <div style={{ color: '#1e95c3', fontWeight: 'bold', marginBottom: 20 }}>
                    <div
                      style={{
                        display: 'inline-block', width: 10, height: 20, backgroundColor: '#1e95c3',
                      }}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;简介
                  </div>
                  <div style={{ height: 160 }}>
                    <div style={{ float: 'left', marginRight: 10 }}>
                      <img src={info.picsrc} alt="" height="150px" />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <p>{info.desc}</p>
                    </div>
                  </div>
                </div>
                <div style={{ color: '#1e95c3', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>
                  <div
                    style={{
                      display: 'inline-block', width: 10, height: 20, backgroundColor: '#1e95c3',
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;地址
                </div>
                <p style={{ marginBottom: 20 }}>{info.address}</p>
                <div style={{ color: '#1e95c3', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>
                  <div
                    style={{
                      display: 'inline-block', width: 10, height: 20, backgroundColor: '#1e95c3',
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;视频
                </div>
                <div style={{ marginBottom: 20 }}>
                  <VideoCard videoList={videoList} loadingVideo={loadingVideo} name={forcename} />
                </div>
                <div style={{ color: '#1e95c3', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>
                  <div
                    style={{
                      display: 'inline-block', width: 10, height: 20, backgroundColor: '#1e95c3',
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;历史
                </div>
                <p>{info.his}</p>
              </div>
            </Spin>
          </Card>
          <PicsList loading={loading} imgList={imgList} />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div>
            <Card className={Styles.myCard} id="components-anchor-props" style={{ display: dataSource.length === 0 ? 'none' : 'block', margin: 10 }}>
              <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                size="small"
                className={Styles.myTable}
                showHeader={false}
                pagination={false}
                rowKey={(record) => record.propertyname}
                scroll={{ y: 600 }}
              />
            </Card>
            <Relation loading={loading} />
            <NewsList name={forcename} />
          </div>
        </div>
      </div>
    )
  }
}

export default FirstGraph
