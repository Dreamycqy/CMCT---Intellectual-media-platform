import React from 'react'
import echarts from 'echarts'
import _ from 'lodash'
import resizeListener, { unbind } from 'element-resize-event'
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

  renderChart = (dom, mapData, parentInfo, instance, forceUpdate = false) => {
    console.log(parentInfo)
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
          formatter: p => {
            let val = p.value
            if (!val) {
              val = 0
            }
            const txtCon = `${p.name}:${val.toFixed(2)}`
            return txtCon
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
            dataView: {
              optionToContent(opt) {
                const series = opt.series[0].data // 折线图数据
                const tdHeads = '<th  style="padding: 0 20px">所在地区</th><th style="padding: 0 20px">销售额</th>' // 表头
                const tdBodys = '' // 数据
                let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:left;"><tbody><tr>${tdHeads} </tr>`
                for (let i = 0; i < series.length; i++) {
                  table += `<tr>
                          <td style="padding: 0 50px">${series[i].name}</td>
                          <td style="padding: 0 50px">${series[
                    i
                  ].value.toFixed(2)}万</td>
                          </tr>`
                }
                table += '</tbody></table>'
                return table
              },
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
        series: [{
          name: '地图',
          type: 'map',
          map: 'Map',
          roam: true, // 是否可缩放
          zoom: 1.1, // 缩放比例
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
      if (
        parentInfo[parentInfo.length - 1].code == params.data.cityCode
      ) {
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
