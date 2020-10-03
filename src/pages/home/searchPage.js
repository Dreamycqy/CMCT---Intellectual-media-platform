import React from 'react'
import { Button, AutoComplete, Input, List, Empty, Divider, Avatar } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { newSearch } from '@/services/edukg'
import { getUrlParams } from '@/utils/common'
import kgIcon from '@/assets/kgIcon.png'
import GrapeImg from '@/assets/grape.png'
import color from '@/constants/colorList'
import targetData from '@/constants/dataList'
import place from '@/assets/place.png'
// import phyImg from '@/assets/eduIcon/phy.png'
// import chemImg from '@/assets/eduIcon/chem.png'
// import bioImg from '@/assets/eduIcon/bio.png'
// import geoImg from '@/assets/eduIcon/geo.png'

let localCounter = 0

@connect()
class ClusterBroker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: getUrlParams().filter || '',
      loading: false,
      dataSource: [],
      firstIn: true,
    }
  }

  componentWillMount = () => {
    const { filter } = this.state
    if (filter.length > 0) {
      this.search(filter)
    }
  }

  checkAvatar = () => {
    return ''
  }

  search = async (filter) => {
    this.setState({ loading: true, filter, firstIn: false })
    const data = await newSearch({
      searchKey: filter,
    })
    if (data.data) {
      this.setState({
        dataSource: targetData,
      })
    }
    this.setState({ loading: false })
  }

  handleHighlight = (str, filter) => {
    let lightStr = []
    const word = new RegExp(filter, 'ig')
    const arr = str.split(word)
    lightStr = [<span key={localCounter++} style={{ color: '#24b0e6' }}>{arr[0]}</span>]
    for (let i = 1; i < arr.length; i++) {
      const keyword = str.match(word)[i - 1]
      lightStr.push(<span key={localCounter++} style={{ color: 'red' }}>{keyword}</span>)
      lightStr.push(<span key={localCounter++} style={{ color: '#24b0e6' }}>{arr[i]}</span>)
    }
    return lightStr
  }

  handleInputChange = (value) => {
    this.setState({ filter: value })
  }

  handleJumpGraph = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/cmct/classGraph',
      query: {
      },
    }))
  }

  renderTags = (list) => {
    const result = []
    list.forEach((e) => {
      const index = Number(`${Math.random()}`.charAt(3))
      result.push(
        <span
          style={{
            color: 'white',
            padding: '2px 20px',
            display: 'inline-block',
            textAlign: 'center',
            border: '1px solid',
            backgroundColor: color.line[index],
            borderColor: color.line[index],
            borderRadius: 4,
            marginRight: 12,
          }}
        >
          {e}
        </span>,
      )
    })
    return result
  }

  render() {
    const {
      dataSource, filter, loading, firstIn,
    } = this.state
    return (
      <div style={{ margin: '0 auto', minHeight: 800, backgroundColor: '#ffffffee', paddingTop: firstIn ? 250 : 20 }}>
        <div style={{ marginBottom: '0 auto 20px', textAlign: 'center' }}>
          <div style={{ height: 70, width: firstIn ? 900 : 1100, display: 'inline-block' }}>
            <div style={{ height: 60, display: 'inline-block', float: 'left' }}>
              <img style={{ float: 'left' }} src={GrapeImg} alt="" height="60px" />
              <div style={{ fontSize: 18, float: 'left', color: '#6e72df', fontWeight: 700, lineHeight: '60px' }}>文旅智媒平台</div>
            </div>
            <AutoComplete
              size="large"
              style={{
                width: firstIn ? 520 : 720, float: 'left', marginLeft: 30,
              }}
              dataSource={[]}
              value={filter}
              onChange={value => this.handleInputChange(value, 'search')}
              onSelect={value => this.setState({ filter: value })}
              backfill
              optionLabelProp="value"
              defaultActiveFirstOption={false}
            >
              <Input
                onPressEnter={e => this.search(e.target.value)}
                placeholder="请输入您感兴趣的文旅内容"
                style={{
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  height: 60,
                  lineHeight: '60px',
                  fontSize: 24,
                  backgroundColor: '#fff',
                }}
              />
            </AutoComplete>
            <Button
              style={{
                float: 'left',
                width: 180,
                height: 60,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}
              type="primary" size="large"
              onClick={() => this.search(filter)}
            >
              搜索
            </Button>
          </div>
          <br />
          <div style={{ height: 30, width: 900, display: 'inline-block' }}>
            例：
            <a href="javascript:;" onClick={() => this.search('玉渊潭公园')}>玉渊潭公园</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.search('故宫博物院')}>故宫博物院</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => this.search('圆明园公园')}>圆明园公园</a>
          </div>
          <br />
          <List
            itemLayout="vertical"
            size="large"
            dataSource={dataSource}
            loading={loading}
            style={{
              // border: '1px solid #e8e8e8',
              width: 1100,
              display: dataSource.length > 0 || loading === true ? 'block' : 'none',
              backgroundColor: '#ffffffa6',
              borderRadius: 4,
              margin: '0 auto',
              textAlign: 'left',
              paddingBottom: 30,
            }}
            pagination={{
              showQuickJumper: true,
            }}
            renderItem={(item) => {
              return (
                <List.Item
                  style={{ padding: 20 }}
                  extra={(
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  )}
                >
                  <List.Item.Meta
                    avatar={(
                      <div style={{ textAlign: 'center' }}>
                        <Avatar src={place} size="large" />
                        <p style={{ fontSize: 12, marginTop: 2, color: '#888' }}>景点</p>
                      </div>
                    )}
                    title={(
                      <a
                        href="javascript:;"
                        onClick={() => {
                          window.open(`/cmct/knowledgeCard?name=${item.name}`)
                        }}
                      >
                        {this.handleHighlight(item.name, filter)}
                      </a>
                    )}
                    description={(
                      <span>
                        {this.renderTags(item.tags)}
                      </span>
                    )}
                  />
                  <div style={{ color: '#888' }}>
                    <p>{`简介: ${item.info}`}</p>
                    <p>{`经纬: ${item.geo.join(', ')}`}</p>
                    <p>
                      {`地址: ${item.address}`}
                      <a href="javascript:;">&nbsp;&nbsp;&gt;&nbsp;在地图上发现</a>
                    </p>
                  </div>
                </List.Item>
              )
            }}
          />
        </div>
        <Empty
          style={{ marginTop: 200, display: dataSource.length === 0 && firstIn === false && loading === false ? 'block' : 'none' }}
          description="没有结果"
        />
        <div
          style={{ marginTop: 100, display: 'none', textAlign: 'center' }}
        >
          <div style={{ display: 'inline-block' }}>
            <img src={kgIcon} alt="" width="200px" style={{ float: 'left' }} />
            <div style={{ width: 560, overflow: 'hidden', paddingTop: 10, paddingLeft: 50 }}>
              科学教育知识图谱是以中国的科学课程标准、
              美国的《Next Generation Science Standards》为基础，
              结合基础教育知识图谱edukg中的内容构建而成的面向科学教育的知识图谱。
              该图谱涵盖地球与宇宙科学、物质科学、生命科学三大模块，
              涉及到物理、化学、地理、生物四门学科，
              适合从小学起各个学段的学生和教师进行学习和使用。
              图谱中将科学学科的核心概念表示为树状知识体系，各个知识点以实体的形式展示。
              为充分利用互联网的学习资源，本图谱将科普中国等多个网站的图文、视频、学术论文等资源与知识点进行链接，
              实现知识的互联共通。
            </div>
            <Button
              style={{ marginTop: 20, marginLeft: 10 }}
              type="primary" href="javascript:;"
              onClick={() => this.handleJumpGraph()}
            >
              浏览图谱
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
export default ClusterBroker
