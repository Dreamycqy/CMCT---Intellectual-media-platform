import React from 'react'
import { Card, Spin, Table, List, Icon, Cascader, Input, Button, Modal, Popover, Avatar } from 'antd'
import Slider from 'react-slick'
import ReactPlayer from 'react-player'
import moment from 'moment'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import _ from 'lodash'
import { connect } from 'dva'
import { getNews } from '@/services/edukg'
import { getUrlParams } from '@/utils/common'
import GrapeImg from '@/assets/grape.png'
import dataList from '@/constants/dataList'
import place from '@/assets/place.png'
import Explore from './explore'
import Styles from './style.less'

const columns = [{
  title: '标签',
  dataIndex: 'name',
  width: 150,
  align: 'left',
}, {
  title: 'none',
  width: 10,
}, {
  title: '内容',
  align: 'left',
  dataIndex: 'value',
}]

const options = [{
  value: 'publisher',
  label: '相关度',
  children: [
    {
      value: 'desc',
      label: '倒序',
    },
    {
      value: 'asc',
      label: '正序',
    },
  ],
}, {
  value: 'publishTime',
  label: '发表时间',
  children: [
    {
      value: 'desc',
      label: '倒序',
    },
    {
      value: 'asc',
      label: '正序',
    },
  ],
}]

const kgList = [
  {
    title: '爱新觉罗溥仪',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/9612/cut-20200421180619-1075321186_jpg_265_331_13509.jpg/300',
    type: '人物',
    desc: '爱新觉罗·溥仪，字曜之，号浩然，出生于北京醇亲王府，醇贤亲王奕譞之孙、摄政王载沣长子，清朝末代皇帝，中国历史上最后一个皇帝。',
  },
  {
    title: '朱棣',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/32150/cut-20190526200410-1697936262_jpg_418_522_45595.jpg/300',
    type: '人物',
    desc: '朱棣（1360年5月2日-1424年8月12日），出生于应天（今南京），朱元璋第四子，明朝第三位皇帝，被称为“永乐大帝”。',
  },
  {
    title: '慈禧',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/30443/20190603141620-897148730_jpeg_407_430_36671.jpg/0',
    type: '人物',
    desc: '慈禧（本名：叶赫那拉氏，别名：西太后、老佛爷，1835年11月29日-1908年11月15日），出生于北京，咸丰帝妃嫔，同治帝生母，晚清实际统治者。',
  },
  {
    title: '木结构建筑',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/0/20161021204506-440428090.jpg/800',
    type: '建筑',
    desc: '木结构建筑（timber construction）是指单纯由木材或主要由木材承受荷载的结构建筑，通过各种金属连接件或榫卯手段进行连接和固定。',
  },
  {
    title: '',
    src: '',
    type: '',
    desc: '',
  },
  {
    title: '知识点6',
    src: '',
    type: '',
    desc: '',
  },
  {
    title: '知识点7',
    src: '',
    type: '',
    desc: '',
  },
]

const endDate = moment()
const startDate = moment().subtract(30, 'days')

@connect()
class FirstGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forcename: getUrlParams().name,
      dataSource: _.find(dataList, { name: getUrlParams().name }).params,
      loading: false,
      filter: ['publishTime', 'desc'],
      searchKey: '',
      imgList: [
        { object: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2278166867,3581766351&fm=26&gp=0.jpg' },
        { object: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2635761105,765707989&fm=26&gp=0.jpg' },
        { object: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3301832637,470639581&fm=26&gp=0.jpg' },
        { object: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2456562730,1535398683&fm=26&gp=0.jpg' },
        { object: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2893246761,1977766465&fm=26&gp=0.jpg' },
        { object: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2651851767,3764004854&fm=26&gp=0.jpg' },
      ],
      selectImg: {
        src: '',
        index: 1,
      },
      modalVisible: false,
      resource: [],
      showExplore: true,
    }
    this.targetData = _.find(dataList, { name: getUrlParams().name })
  }

  componentWillMount() {
    this.getNews(this.state.forcename)
  }

  getNews = async (name) => {
    const data = await getNews({
      words: name,
      endDate: endDate.format('YYYY-MM-DD'),
      startDate: startDate.format('YYYY-MM-DD'),
      page: 1,
      pageSize: 20,
    })
    if (data) {
      this.setState({ resource: data.data })
    }
  }

  renderImg = (list) => {
    const result = []
    const { imgList } = this.state
    list.forEach((e) => {
      result.push(
        <div>
          <a href="javascript:;" onClick={() => this.chooseImg(_.findIndex(imgList, { object: e.object }))}>
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
    const {
      forcename, dataSource, loading, resource, filter, searchKey,
      imgList, selectImg, modalVisible, showExplore,
    } = this.state
    return (
      <div style={{ paddingTop: 10, overflow: 'hidden', minWidth: 1300, backgroundColor: '#ffffffe9' }}>
        <div style={{ height: 80, margin: '10px 0 0 20px', textAlign: 'center', display: 'none' }}>
          <div style={{ display: 'inline-block' }}>
            <div style={{ height: 60, marginLeft: 30, marginTop: 6, float: 'left' }}>
              <img style={{ float: 'left' }} src={GrapeImg} alt="" height="60px" />
              <div style={{ fontSize: 38, float: 'left', color: '#6e72df', fontWeight: 700 }}>cmct</div>
            </div>
            <Input
              value={searchKey}
              onChange={(e) => this.setState({ searchKey: e.target.value })}
              onPressEnter={(e) => this.handleJump(e.target.value)}
              placeholder="请输入科学教育相关知识点"
              style={{
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
                width: 520,
                height: 50,
                lineHeight: '50px',
                fontSize: 24,
                float: 'left',
                marginTop: 10,
                marginLeft: 20,
              }}
            />
            <Button
              style={{
                float: 'left',
                height: 50,
                width: 180,
                marginTop: 10,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
              }}
              type="primary" size="large"
              onClick={() => this.handleJump(searchKey)}
            >
              搜索
            </Button>
          </div>
        </div>
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
                    <Explore />
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
                  <p>{this.targetData.info}</p>
                </div>
                <div style={{ color: '#1e95c3', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>
                  <div
                    style={{
                      display: 'inline-block', width: 10, height: 20, backgroundColor: '#1e95c3',
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;视频
                </div>
                <div style={{ paddingLeft: 40, marginBottom: 20 }}>
                  <ReactPlayer url={this.targetData.video} />
                </div>
                <div style={{ color: '#1e95c3', fontWeight: 'bold', fontSize: 18, marginBottom: 20 }}>
                  <div
                    style={{
                      display: 'inline-block', width: 10, height: 20, backgroundColor: '#1e95c3',
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;历史
                </div>
                <p>{this.targetData.history}</p>
              </div>
            </Spin>
          </Card>
          <Card className={Styles.myCard} style={{ display: imgList.length === 0 ? 'none' : 'block', marginTop: 10 }} id="components-anchor-pics" title="相关图片">
            <Spin spinning={loading}>
              <div style={{ height: 220 }}>
                <Slider
                  style={{ height: 180, backgroundColor: 'aliceblue' }}
                  dots slidesPerRow={4}
                  // autoplay autoplaySpeed={3000}
                >
                  {this.renderImg(imgList)}
                </Slider>
              </div>
            </Spin>
          </Card>
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
                // scroll={{ y: 350 }}
              />
            </Card>
            <Card
              className={Styles.myCard}
              style={{ margin: 10 }}
              title="相关知识"
              id="components-anchor-kgrelated"
            >
              <List
                itemLayout="vertical"
                size="small"
                dataSource={kgList}
                loading={loading}
                pagination={{
                  showSizeChanger: false,
                  size: 'small',
                  style: { display: typeof resource === 'object' && resource.length > 0 ? 'block' : 'none' },
                }}
                style={{ height: 500, overflowY: 'scroll', padding: '0 20px 20px 20px' }}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.src} size="large" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={`分类：${item.type}`}
                      />
                      <p style={{ fontSize: 12, wordBreak: 'break-all' }}>{item.desc}</p>
                    </List.Item>
                  )
                }}
              />
            </Card>
            <Card
              className={Styles.myCard}
              style={{ margin: 10 }}
              title="相关新闻"
              id="components-anchor-pages"
              extra={(
                <Cascader
                  options={options}
                  value={filter}
                  rows={4}
                  onChange={(value) => this.setState({ filter: value })}
                  allowClear={false}
                />
              )}
            >
              <List
                itemLayout="vertical"
                size="large"
                dataSource={_.orderBy(resource, filter[0], filter[1])}
                loading={loading}
                pagination={{
                  showSizeChanger: false,
                  size: 'small',
                  style: { display: typeof resource === 'object' && resource.length > 0 ? 'block' : 'none' },
                }}
                style={{ height: 670, overflowY: 'scroll', padding: '0 20px 20px 20px' }}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <List.Item.Meta
                        title={(
                          <a
                            style={{ width: 120, borderTop: '1px solid #e8e8e8', cursor: 'pointer' }}
                            href="javascript:;"
                            onClick={() => { window.open(item.url) }}
                          >
                            {item.title}
                          </a>
                        )}
                        description={(
                          <div>
                            <Icon
                              type="read"
                              style={{ marginRight: 8, color: '#24b0e6' }}
                            />
                            新闻来源：
                            {item.publisher}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Icon
                              type="clock-circle"
                              style={{ marginRight: 8, color: '#24b0e6' }}
                            />
                            发布时期：
                            {item.publishTime}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                        )}
                      />
                      <div>
                        <p>{`${item.content}...`}</p>
                      </div>
                    </List.Item>
                  )
                }}
              />
            </Card>
          </div>
        </div>
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

export default FirstGraph
