import React from 'react'
import echarts from 'echarts'
import _ from 'lodash'
import resizeListener, { unbind } from 'element-resize-event'
import placeData from '@/constants/5aPlace'
// import color from '@/constants/colorList'

export default class GraphChart extends React.Component {
  constructor(...props) {
    super(...props)
    this.dom = null
    this.instance = null
  }

  componentDidMount() {
    const { mapData, parentInfo } = this.props
    try {
      this.instance = this.renderChart(this.dom, mapData, parentInfo, this.instance)
      resizeListener(this.dom, () => {
        this.instance = this.renderChart(this.dom, mapData, parentInfo, this.instance, true)
      })
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      mapData, parentInfo,
    } = nextProps
    return !_.isEqual(mapData, this.props.mapData) || !_.isEqual(parentInfo, this.props.parentInfo)
  }

  componentDidUpdate() {
    const { mapData, parentInfo } = this.props
    this.instance = this.renderChart(this.dom, mapData, parentInfo, this.instance)
  }

  // componentWillUnmount() {
  //   unbind(this.dom)
  //   this.instance && this.instance.dispose()  //  eslint-disable-line
  // }

  hide = (array) => {
    const result = []
    array.forEach((e) => {
      if (e.category === '2') {
        if (e.show === true) {
          result.push(e)
        }
      } else {
        result.push(e)
      }
    })
    return result
  }

  convertData = (list, parentInfo) => {
    const result = []
    list.forEach((e) => {
      if (!_.find(result, { where: e['所在省份'] }) && parentInfo.length === 1) {
        result.push({
          name: e['景区名称'],
          value: [Number(e['经度']), Number(e['纬度']), 0],
          where: e['所在省份'],
          pic: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
        })
      } else if (parentInfo.length === 2 && e['所在省份'] === parentInfo[1].cityName) {
        result.push({
          name: e['景区名称'],
          value: [Number(e['经度']), Number(e['纬度']), 0],
          where: e['所在省份'],
          pic: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
        })
      } else if (parentInfo.length > 2 && e['景区名称'].indexOf(parentInfo[2].cityName) > -1) {
        result.push({
          name: e['景区名称'],
          value: [Number(e['经度']), Number(e['纬度']), 0],
          where: e['所在省份'],
          pic: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
        })
      }
    })
    return result
  }

  renderChart = (dom, mapData, parentInfo, instance, forceUpdate = false) => {
    if (!mapData || mapData.length < 1) {
      return
    }
    echarts.registerMap('Map', this.props.geoJson)
    let options
    const that = this
    if (!mapData || mapData.length < 1) {
      options = {
        ...options,
        title: {
          // text: '暂无数据',
          x: '56%',
          y: 'center',
        },
      }
    } else {
      options = {
        tooltip: {
          trigger: 'item',
          borderRadius: 4,
          formatter: p => {
            let res = ''
            if (!p.data.where) {
              const txtCon = `${p.name}`
              res = txtCon
            } else {
              res += '<div style="text-align:center;width:260px;">'
              res += `<div><img style='width:250px;height:150px;' src='${p.data.pic}' /></div>`
              res += `<div style='margin-top:4px;word-wrap:break-word;word-break:break-all;'>${p.name}</div>`
              res += `<div style='margin-top:4px;word-wrap:break-word;word-break:break-all;font-size:12px;'>${p.name}<br />是国家5A级景区，位于${p.data.where}，<br />下面是对该景区的大段描述balabala</div>`
              res += '</div>'
            }
            return res
          },
        },
        title: {
          show: true,
          left: 'center',
          top: '15',
          text: `${parentInfo[parentInfo.length - 1].cityName
          }`,
          textStyle: {
            color: 'rgb(179, 239, 255)',
            fontSize: 16,
          },
        },
        toolbox: {
          feature: {
            restore: {
              show: false,
            },
            saveAsImage: {
              name: `${parentInfo[parentInfo.length - 1].cityName}地图`,
            },
            dataZoom: {
              show: false,
            },
            magicType: {
              show: false,
            },
          },
          iconStyle: {
            normal: {
              borderColor: '#1990DA',
            },
          },
          top: 15,
          right: 35,
        },
        geo: {
          show: true,
          map: 'Map',
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#24CFF4',
              borderColor: '#53D9FF',
              borderWidth: 1.3,
              shadowBlur: 15,
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 7,
              shadowOffsetY: 6,
            },
            emphasis: {
              areaColor: '#8dd7fc',
              borderWidth: 1.6,
              shadowBlur: 25,
            },
          },
        },
        series: [{
          name: 'Top 5',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: [50, 50],
          roam: true, // 是否可缩放
          label: {
            normal: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 9,
              },
              formatter(value) {
                return value.data.name
              },
            },
          },
          itemStyle: {
            normal: {
              color: '#D8BC37', // 标志颜色
            },
          },
          data: this.convertData(placeData, parentInfo),
          // showEffectOn: 'render',
          // rippleEffect: {
          //   brushType: 'stroke',
          // },
          // hoverAnimation: true,
          zlevel: 2,
        }, {
          name: '地图',
          type: 'map',
          map: 'Map',
          roam: true, // 是否可缩放
          geoIndex: 0,
          data: mapData,
          label: {
            normal: {
              show: true,
              color: 'rgb(249, 249, 249)', // 省份标签字体颜色
              formatter: p => {
                switch (p.name) {
                  case '内蒙古自治区':
                    p.name = '内蒙古'
                    break
                  case '西藏自治区':
                    p.name = '西藏'
                    break
                  case '新疆维吾尔自治区':
                    p.name = '新疆'
                    break
                  case '宁夏回族自治区':
                    p.name = '宁夏'
                    break
                  case '广西壮族自治区':
                    p.name = '广西'
                    break
                  case '香港特别行政区':
                    p.name = '香港'
                    break
                  case '澳门特别行政区':
                    p.name = '澳门'
                    break
                  default:
                    break
                }
                return p.name
              },
            },
            emphasis: {
              show: true,
              color: '#f75a00',
            },
          },
          itemStyle: {
            normal: {
              areaColor: '#24CFF4',
              borderColor: '#53D9FF',
              borderWidth: 1.3,
              shadowBlur: 15,
              shadowColor: 'rgb(58,115,192)',
              shadowOffsetX: 7,
              shadowOffsetY: 6,
            },
            emphasis: {
              areaColor: '#8dd7fc',
              borderWidth: 1.6,
              shadowBlur: 25,
            },
          },
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
    if (myChart._$handlers.click) { // eslint-disable-line
      myChart._$handlers.click.length = 0 // eslint-disable-line
    }
    myChart.on('click', params => {
      console.log(params)
      if (parentInfo[parentInfo.length - 1].code === params.data.cityCode) {
        return
      }
      if (params.data.where) {
        console.log('景区！')
        const city = params.data.name.split('市')
        const lowCity = city[city.length - 1].split('县')
        const district = lowCity[lowCity.length - 1].split('区')
        window.open(`/cmct/knowledgeCard?name=${district[district.length - 1]}`)
        return
      }
      const { data } = params
      that.props.parentInfoPush({
        cityName: data.name,
        code: data.cityCode,
      })
    })
    return myChart
  }

  render() {
    return <div className="e-charts-graph" ref={t => this.dom = t} style={{ height: '100%' }} />
  }
}
