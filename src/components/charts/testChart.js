import React from 'react'
import echarts from 'echarts'
// import _ from 'lodash'
import resizeListener from 'element-resize-event'
// import color from '@/constants/colorList'
const test = /^[A-Za-z]+$/i

export default class GraphChart extends React.Component {
  constructor(...props) {
    super(...props)
    this.dom = null
    this.instance = null
    this.graph = {
      nodes: [{
        name: '故宫博物院',
        category: 0,
        symbolSize: 60,
      }, {
        name: '颐和园',
        category: 3,
        symbolSize: 40,
      }, {
        name: '圆明园',
        category: 3,
        symbolSize: 40,
      }, {
        name: '清华大学',
        category: 3,
        symbolSize: 40,
      }, {
        name: '北京大学',
        category: 3,
        symbolSize: 40,
      }, {
        name: '明朝',
        category: 2,
        symbolSize: 24,
      }, {
        name: '清朝',
        category: 2,
        symbolSize: 24,
      }, {
        name: '辛亥革命',
        category: 2,
        symbolSize: 24,
      }, {
        name: '北伐战争',
        category: 2,
        symbolSize: 24,
      }, {
        name: '抗日战争',
        category: 2,
        symbolSize: 24,
      }, {
        name: '中华人民共和国建立',
        category: 2,
        symbolSize: 24,
      }, {
        name: '50年代初',
        category: 2,
        symbolSize: 24,
      }, {
        name: '中华民国',
        category: 2,
        symbolSize: 24,
      }],
      links: [{
        source: '北京大学',
        target: '清华大学',
        name: '大学机构',
      }, {
        source: '清华大学',
        target: '圆明园',
        name: '附近',
      }, {
        source: '圆明园',
        target: '颐和园',
        name: '皇家园林',
      }, {
        source: '颐和园',
        target: '故宫博物院',
        name: '世界文化遗址',
      }, {
        source: '故宫博物院',
        target: '明朝',
        name: '历史事件',
      }, {
        source: '故宫博物院',
        target: '清朝',
        name: '历史事件',
      }, {
        source: '故宫博物院',
        target: '辛亥革命',
        name: '历史事件',
      }, {
        source: '故宫博物院',
        target: '北伐战争',
        name: '历史事件',
      }, {
        source: '故宫博物院',
        target: '中华民国',
        name: '历史事件',
      }, {
        source: '故宫博物院',
        target: '抗日战争',
        name: '历史事件',
      }, {
        source: '故宫博物院',
        target: '中华人民共和国建立',
        name: '历史事件',
      }, {
        source: '故宫博物院',
        target: '50年代初',
        name: '历史事件',
      }],
    }
    this.forcename = '故宫博物院'
  }

  componentDidMount() {
    const { graph, forcename } = this
    try {
      this.instance = this.renderChart(this.dom, graph, forcename, this.instance)
      resizeListener(this.dom, () => {
        this.instance = this.renderChart(this.dom, graph, forcename, this.instance, true)
      })
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  }

  renderChart = (dom, graph, forcename, instance, forceUpdate = false) => {
    let options
    if (!graph.nodes || graph.nodes.length < 1) {
      options = {
        ...options,
        title: {
          // text: '暂无数据',
          x: '56%',
          y: 'center',
        },
      }
    } else {
      const nodes = []
      const links = []
      graph.nodes.forEach((e) => {
        const temp = {
          ...e,
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
                color: '#000000',
                fontWeight: 'normal',
                fontSize: '12',
              },
            },
          },
        }
        nodes.push(temp)
      })
      graph.links.forEach((e) => {
        e.label = {
          align: 'center',
          fontSize: 8,
        }
        if (e.name === '历史') {
          e.lineStyle = {
            color: '#ff7d18',
          }
        } else {
          e.lineStyle = {
            color: '#006acc',
          }
        }
        links.push(e)
      })
      options = {
        series: [{
          type: 'graph',
          layout: 'force',
          focusNodeAdjacency: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
              },
              formatter(x) {
                return x.data.name
              },
            },
          },
          name: forcename,
          roam: false,
          force: {
            initLayout: 'circular',
            repulsion: 50,
            gravity: 0.01,
            edgeLength: 100,
            layoutAnimation: false,
          },
          gravity: 1,
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 12,
            },
          },
          linkSymbol: 'arrow',
          categories: [
            {
              name: '0',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#ca1001',
                  }, {
                    offset: 1,
                    color: '#ff8980',
                  }]),
                },
              },
            },
            {
              name: '1',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#157eff',
                  }, {
                    offset: 1,
                    color: '#35c2ff',
                  }]),
                },
              },
            },
            {
              name: '2',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#ffb402',
                  }, {
                    offset: 1,
                    color: '#ffdc84',
                  }]),
                },
              },
            },
            {
              name: '3',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#01acca',
                  }, {
                    offset: 1,
                    color: '#5adbe7',
                  }]),
                },
              },
            },
          ],
          minRadius: 1,
          maxRadius: 5,
          coolDown: 0.995,
          steps: 10,
          nodes,
          links,
        }],
      }
    }
    let myChart = null
    if (forceUpdate === true) {
      myChart = instance
      myChart.resize()
      myChart.setOption(options)
      return myChart
    }
    if (instance) myChart = instance
    else myChart = echarts.init(dom)
    myChart.clear()
    myChart.resize()
    myChart.setOption(options)
    return myChart
  }

  render() {
    return <div className="e-charts-graph" ref={t => this.dom = t} style={{ height: '100%' }} />
  }
}
