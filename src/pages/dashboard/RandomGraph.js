import React from 'react'
import { Spin, Table } from 'antd'
import _ from 'lodash'
import { newResult } from '@/services/edukg'
import { BorderBox8 } from '@jiaminghi/data-view-react'
import Chart from './relationGraph'
import Styles from './style.less'

const test = /^[A-Za-z]+$/i

const columns = [{
  title: '标签',
  dataIndex: 'predicate_label',
  width: 150,
  align: 'left',
  render: (text) => {
    return <span style={{ fontWeight: 700 }}>{text}</span>
  },
}, {
  title: 'none',
  width: 10,
}, {
  title: '内容',
  align: 'left',
  render: (text, record) => {
    const typeNew = record.predicate ? record.predicate.split('#')[1] : ''
    if (typeNew === 'image' || record.object.indexOf('getjpg') > -1 || record.object.indexOf('getpng') > -1) {
      return <img style={{ maxHeight: 300 }} alt="" src={record.object} />
    } else if (typeNew === 'category' || (record.object.indexOf('http') > -1 && record.object_label)) {
      return <span style={{ color: '#24b0e6' }}>{record.labelList.join('， ')}</span>
    } else {
      return <span style={{ color: '#24b0e6' }}>{record.object}</span>
    }
  },
}]

class Random extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graph: {
        nodes: [],
        links: [],
      },
      forcename: '北京',
      loading: false,
      dataSource: [],
      lastHqUrl: {
        name: '北京',
        uri: 'http://edukb.org/knowledge/0.1/instance/geo#-33ba70160a8d6700d86fdb1362bc9965',
      },
      lastUrl: {
        name: '北京',
        uri: 'http://edukb.org/knowledge/0.1/instance/geo#-33ba70160a8d6700d86fdb1362bc9965',
      },
    }
    this.timer = undefined
  }

  componentWillMount = () => {
    this.getChart(this.state.lastUrl.uri)
  }

  componentDidMount = () => {
    this.timer = setInterval(() => this.getNew(), 7000)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  getNew = () => {
    const { nodes } = this.state.graph
    const uriList = []
    nodes.forEach((e) => {
      if (e.category === '2') {
        uriList.push(e)
      }
    })
    const target = uriList[Math.floor(Math.random() * uriList.length)]
    console.log(this.state.forcename, target.name, uriList.length)
    if (uriList.length > 5) {
      this.setState({
        lastHqUrl: this.state.lastUrl,
      })
      this.getChart(target.uri)
    } else {
      console.log(this.state.lastHqUrl.name)
      this.getChart(this.state.lastHqUrl.uri)
    }
    this.setState({ lastUrl: {
      name: target.name,
      uri: target.uri,
    } })
  }

  getChart = async (uri) => {
    this.setState({ loading: true })
    const data = await newResult({
      uri,
    })
    if (data) {
      const { lable, propety, resourcePropety, content } = data.data
      const wikiLinks = {}
      const newProperty = []
      const params = this.remakeGraphData(content, lable)
      if (resourcePropety) {
        propety.forEach((e) => {
          const target = _.filter(resourcePropety, { resourceuri: e.object })
          if (target.length > 0) {
            if (!wikiLinks[e.predicate_label]) {
              wikiLinks[e.predicate_label] = []
            }
            const item = {
              ...e,
              propety: target,
            }
            wikiLinks[e.predicate_label].push(item)
          } else {
            newProperty.push(e)
          }
        })
      }
      this.setState({
        forcename: lable,
        dataSource: propety ? this.handleData(newProperty) : [],
        graph: {
          nodes: params.nodes,
          links: params.links,
        },
      })
    }
    this.setState({ loading: false })
  }

  remakeGraphData = (list, forcename, type) => {
    window.location.href = '#components-anchor-graph'
    const nodes = [{
      name: forcename,
      category: '0', // 二级父节点
      symbolSize: 48, // 节点大小
      uri: '',
      symbol: 'circle',
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      draggable: true,
      label: {
        normal: {
          show: true,
          position: 'bottom',
          formatter: (val) => {
            const strs = val.data.name.replace(' ', '\n').split('')
            let str = ''
            for (let j = 0, s; s = strs[j++];) {
              str += s
              if (!(j % 8) && !test.test(s)) str += '\n'
            }
            return str
          },
          textStyle: {
            color: '#ffffff',
            fontWeight: 'normal',
            fontSize: '12',
          },
        },
      },
    }]
    const links = []
    const temp = {}
    list.forEach((e) => {
      if (!e.predicate_label) {
        e.predicate_label = type === 'class' ? '概念' : '实体'
      }
      if (!temp[e.predicate_label]) {
        temp[e.predicate_label] = []
      }
      temp[e.predicate_label].push(e)
    })
    for (const colle in temp) { // eslint-disable-line
      if (temp[colle].length > 2) {
        nodes.push({
          name: `${colle} (集)`,
          category: '1', // 二级父节点
          symbolSize: 36, // 节点大小
          uri: '',
          open: false,
          symbol: 'circle',
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          draggable: true,
          label: {
            normal: {
              show: true,
              position: 'bottom',
              formatter: (val) => {
                const strs = val.data.name.replace(' ', '\n').split('')
                let str = ''
                for (let j = 0, s; s = strs[j++];) {
                  str += s
                  if (!(j % 8) && !test.test(s)) str += '\n'
                }
                return str
              },
              textStyle: {
                color: '#ffffff',
                fontWeight: 'normal',
                fontSize: '12',
              },
            },
          },
        })
        links.push({
          source: `${colle} (集)`,
          target: forcename,
        })
        temp[colle].forEach((e) => {
          nodes.push({
            name: e.object_label || e.subject_label,
            category: '2', // 叶子节点
            symbolSize: 16, // 节点大小
            uri: e.object || e.subject,
            show: false,
            symbol: 'circle',
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            draggable: true,
            type,
            label: {
              normal: {
                show: true,
                position: 'bottom',
                formatter: (val) => {
                  const strs = val.data.name.replace(' ', '\n').split('')
                  let str = ''
                  for (let j = 0, s; s = strs[j++];) {
                    str += s
                    if (!(j % 8) && !test.test(s)) str += '\n'
                  }
                  return str
                },
                textStyle: {
                  color: '#ffffff',
                  fontWeight: 'normal',
                  fontSize: '12',
                },
              },
            },
          })
          links.push({
            source: e.object_label || e.subject_label,
            target: `${colle} (集)`,
          })
        })
      } else {
        temp[colle].forEach((e) => {
          nodes.push({
            name: e.object_label || e.subject_label,
            category: '2', // 叶子节点
            symbolSize: 16, // 节点大小
            uri: e.object || e.subject,
            show: false,
            symbol: 'circle',
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            draggable: true,
            type,
            label: {
              normal: {
                show: true,
                position: 'bottom',
                formatter: (val) => {
                  const strs = val.data.name.replace(' ', '\n').split('')
                  let str = ''
                  for (let j = 0, s; s = strs[j++];) {
                    str += s
                    if (!(j % 8) && !test.test(s)) str += '\n'
                  }
                  return str
                },
                textStyle: {
                  color: '#ffffff',
                  fontWeight: 'normal',
                  fontSize: '12',
                },
              },
            },
          })
          links.push({
            source: e.object_label || e.subject_label,
            target: forcename,
          })
        })
      }
    }
    return { nodes, links }
  }

  handleData = (array) => {
    const result = []
    array.forEach((e) => {
      if (e.predicate_label && e.predicate_label !== '学术论文') {
        if (e.type === 'image' || e.object.indexOf('getjpg') > 0 || e.object.indexOf('getpng') > 0) {
          // return
        } else {
          const target = _.find(result, { predicate_label: e.predicate_label })
          if (!target) {
            result.push({
              ...e,
              labelList: [e.object_label],
            })
          } else {
            target.labelList.push(e.object_label)
          }
        }
      }
    })
    return result
  }

  render() {
    const { graph, forcename, loading, dataSource } = this.state
    return (
      <div>
        <BorderBox8 reverse="{true}">
          <Spin spinning={loading} size="large">
            <div style={{ height: 400 }}>
              <Chart
                graph={graph} forcename={forcename}
              />
            </div>
          </Spin>
        </BorderBox8>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          size="small"
          className={Styles.myTable}
          showHeader={false}
          pagination={false}
          rowKey={record => record.propertyname}
        />
      </div>
    )
  }
}
export default Random
