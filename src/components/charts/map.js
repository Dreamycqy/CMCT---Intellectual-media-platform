import React from 'react'
import echarts from 'echarts'
import _ from 'lodash'
import resizeListener from 'element-resize-event'
import placeData from '@/constants/5aPlace'
// import color from '@/constants/colorList'

export default class GraphChart extends React.Component {
  constructor(...props) {
    super(...props)
    this.dom = null
    this.instance = null
    this.showAttack = false
    this.lineData = []
    // this.lineData = [{
    //   name: '海淀区清华大学',
    //   target: [
    //     { name: '海淀区北京大学', list: ['类型：大学', '类型：世界一流大学', '位于：海淀区'] },
    //     { name: '海淀区紫竹院公园', list: ['类型1：aaa', '类型2：bbb'] },
    //     { name: '海淀区颐和园', list: ['类型1：aaa', '类型2：bbb'] },
    //   ],
    // }, {
    //   name: '海淀区中央广播电视塔',
    //   target: [
    //     { name: '海淀区北京大学', list: ['类型1：aaa', '类型2：bbb'] },
    //     { name: '海淀区紫竹院公园', list: ['类型1：aaa', '类型2：bbb'] },
    //     { name: '海淀区颐和园', list: ['类型1：aaa', '类型2：bbb'] },
    //   ],
    // }]
    this.attackList = []
    this.state = {
      newCenter: [],
    }
  }

  componentDidMount() {
    const { mapData, parentInfo, pointData, centerPoint } = this.props
    try {
      this.instance = this.renderChart(this.dom, mapData, pointData, centerPoint, parentInfo, this.instance)
      resizeListener(this.dom, () => {
        this.instance = this.renderChart(this.dom, mapData, pointData, centerPoint, parentInfo, this.instance, true)
      })
    } catch (e) {
      console.log(e); // eslint-disable-line
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(nextProps.mapData, this.props.mapData)) {
      this.setState({ newCenter: [] })
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      mapData, parentInfo, pointData, geoJson, centerPoint,
    } = nextProps
    return !_.isEqual(mapData, this.props.mapData) || !_.isEqual(parentInfo, this.props.parentInfo) || !_.isEqual(pointData, this.props.pointData) || !_.isEqual(geoJson, this.props.geoJson) || !_.isEqual(centerPoint, this.props.centerPoint)
  }

  componentDidUpdate() {
    const { mapData, parentInfo, pointData, centerPoint } = this.props
    this.instance = this.renderChart(this.dom, mapData, pointData, centerPoint, parentInfo, this.instance)
  }

  convertData = (list) => {
    const result = []
    list.forEach((e) => {
      result.push({
        name: e['景区名称'],
        value: [Number(e['经度']), Number(e['纬度']), 0],
        where: e['所在省份'],
        aoiCode: e['区域码'],
        pic: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      })
    })
    return result
  }

  showInfo = (name) => {
    this.props.selectInfo(name)
  }

  handleLine = (list, pointData) => {
    if (pointData.length === 0) {
      return
    }
    const result = []
    list.forEach((item) => {
      const ori = _.find(placeData, { 景区名称: item.name })
      item.target.forEach((e) => {
        const target = _.find(placeData, { 景区名称: e.name })
        result.push([
          { coord: [ori['经度'], ori['纬度']], list: e.list },
          { coord: [target['经度'], target['纬度']] },
        ])
      })
    })
    return result
  }

  handleAttack = (center, list) => {
    const result = []
    list.forEach((e) => {
      result.push([
        { coord: [e['经度'], e['纬度']], list: ['餐饮场所'] },
        { coord: center },
      ])
    })
    return result
  }

  handleCenter = async (value) => {
    const { mapData, pointData, parentInfo, centerPoint } = this.props
    await this.setState({ newCenter: [value[0], value[1]] })
    this.instance = this.renderChart(this.dom, mapData, pointData, centerPoint, parentInfo, this.instance)
  }

  renderChart = (dom, mapData, pointData, centerPoint, parentInfo, instance, forceUpdate = false) => {
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
      const { newCenter } = this.state
      options = {
        tooltip: {
          trigger: 'item',
          borderRadius: 4,
          formatter: p => {
            let res = ''
            if (!p.data || p.data === undefined) {
              return
            }
            if (p.data.list) {
              res += '<div">'
              res += '</div>'
              p.data.list.forEach((e) => {
                res += `<div>${e}</div>`
              })
              res += '</div>'
            } else if (!p.data.where) {
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
            color: this.props.mapType === 'large' ? 'black' : 'rgb(179, 239, 255)',
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
          center: newCenter.length > 0 ? newCenter : null,
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
              areaColor: '#d1eaff',
              borderColor: 'rgba(0,63,140,0.2)',
              shadowColor: 'rgba(0,63,140,0.2)',
              shadowOffsetY: 20,
              shadowBlur: 30,
            },
          },
        },
        series: [{
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            color: '#fff', // 流动点颜色
            period: 8, // 箭头指向速度，值越小速度越快
            trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', // 箭头图标
            symbolSize: 15, // 图标大小
          },
          lineStyle: {
            normal: {
              width: 1, // 尾迹线条宽度
              opacity: 1, // 尾迹线条透明度
              curveness: 0.1, // 尾迹线条曲直度
            },
          },
          data: this.handleAttack(centerPoint, pointData),
        }, {
          name: 'Top 5',
          type: this.props.parentInfo.length > 2 ? 'effectScatter' : 'scatter',
          coordinateSystem: 'geo',
          symbol: this.props.parentInfo.length > 2 ? null : 'pin',
          symbolSize: this.props.parentInfo.length > 2 ? [24, 24] : [30, 30],
          roam: true, // 是否可缩放
          rippleEffect: {
            period: 2,
            brushType: 'stroke',
            scale: 3,
          },
          label: {
            normal: this.props.parentInfo.length > 2 ? {
              position: 'bottom',
              show: true,
              textStyle: {
                color: '#000',
                fontSize: 9,
              },
              formatter(value) {
                return value.data.name
              },
            } : {
              show: true,
              position: 'bottom',
              textStyle: {
                color: '#000',
                fontSize: 9,
              },
              formatter(value) {
                return value.data.name
              },
              color: '#F4E925',
              shadowBlur: 16,
              shadowColor: '#333',
            },
          },
          itemStyle: {
            normal: {
              color: '#c57aff', // 标志颜色
            },
          },
          data: this.convertData(pointData),
          // showEffectOn: 'render',
          // rippleEffect: {
          //   brushType: 'stroke',
          // },
          // hoverAnimation: true,
          zlevel: 2,
        }, {
          name: 'getAttacked',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            period: 3,
            brushType: 'stroke',
            scale: 4,
          },
          label: {
            normal: {
              show: true,
              position: 'right', // 显示位置
              offset: [5, 0], // 偏移设置
              formatter(params) { // 圆环显示文字
                return params.data.name
              },
              fontSize: 16,
            },
            emphasis: {
              show: true,
            },
          },
          symbol: 'circle',
          symbolSize: 24,
          itemStyle: {
            normal: {
              show: false,
              color: 'red',
            },
          },
          data: [{
            name: '餐饮场所',
            value: [centerPoint[0], centerPoint[1], 0],
            interest: '餐饮场所',
            pic: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
          }],
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
            itemStyle: {
              normal: {
                areaColor: '#d1eaff',
                borderColor: '#000',
                shadowColor: 'rgb(58,115,192)',
                shadowOffsetX: 7,
                shadowOffsetY: 6,
                shadowBlur: 15,
                borderWidth: 1,
              },
              emphasis: {
                areaColor: '#FFAE00',
              },
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
      if (params.data.interest) {
        this.props.showModal(params.data.name)
        this.showInfo(params.data.name)
        return
      }
      if (params.data.aoiCode === 'goback') {
        const city = params.data.name.split('市')
        const lowCity = city[city.length - 1].split('县')
        const district = lowCity[lowCity.length - 1].split('区')
        this.handleCenter(params.data.value)
        this.props.showModal(params.data.name)
        this.showInfo(district[district.length - 1])
        return
      } else if (params.data.where) {
        console.log('景区！')
        const city = params.data.name.split('市')
        const lowCity = city[city.length - 1].split('县')
        const district = lowCity[lowCity.length - 1].split('区')
        this.props.getPlace(params.data.aoiCode, district[district.length - 1])
        const { data } = params
        that.props.parentInfoPush({
          cityName: district[district.length - 1],
          code: data.aoiCode,
        }, false)
        // window.open(`/cmct/knowledgeCard?name=${district[district.length - 1]}`)
        return
      }
      const { data } = params
      that.props.parentInfoPush({
        cityName: params.data.where ? params.data.name : data.name,
        code: params.data.where ? data.aoiCode : data.cityCode,
      }, true)
    })
    return myChart
  }

  render() {
    return (
      <div style={{ height: '100%', zIndex: 12 }}>
        <div className="e-charts-graph" ref={t => this.dom = t} style={{ height: '100%' }} />
      </div>
    )
  }
}
