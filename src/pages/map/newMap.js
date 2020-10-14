import React from 'react'
import { Spin } from 'antd'
import AMapJS from 'amap-js'
import MapChart from '@/components/charts/newMap'

const key = '1ee802ced4061b529b02d9b9d2b9f704'

class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      mapData: [],
      parentInfo: [{
        cityName: '全国',
        code: 100000,
      }],
      geoJson: {
        features: [],
      },
    }
    this.geoJson = {
      features: [],
    }
  }

  componentWillMount = () => {
    this.getGeoData(100000)
  }

  getGeoData = async (adcode) => {
    const that = this
    const amapLoader = new AMapJS.AMapLoader({
      key,
      version: '1.4.15',
      plugins: [],
    })
    const amapuiLoader = new AMapJS.AMapUILoader({
      version: '1.1',
    })
    this.setState({ loading: true })
    await amapLoader.load()
    await amapuiLoader.load()
    amapuiLoader.loadUI(['geo/DistrictExplorer'])
      .then(([DistrictExplorer]) => {
        const districtExplorer = new DistrictExplorer()
        districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
          if (error) {
            console.error(error)
            return
          }
          const Json = areaNode.getSubFeatures()
          if (Json.length > 0) {
            that.geoJson.features = Json
          } else if (Json.length === 0) {
            if (that.geoJson.features.length === 0) {
              return
            }
            that.geoJson.features = that.geoJson.features.filter(
              item => item.properties.adcode === adcode,
            )
          }
          this.setState({ geoJson: that.geoJson })
          this.getMapData()
        })
      })
      .catch(e => { console.log(e) })
  }

  getMapData = () => {
    let mapData = this.geoJson.features.map(item => {
      return {
        name: item.properties.name,
        value: Math.random() * 1000,
        cityCode: item.properties.adcode,
      }
    })
    mapData = mapData.sort((a, b) => {
      return b.value - a.value
    })
    this.setState({ mapData, loading: false })
  }

  parentInfoPush = (params) => {
    const { parentInfo } = this.state
    parentInfo.push(params)
    this.setState({ parentInfo })
    this.getGeoData(params.code)
  }

  renderBread = (list) => {
    const result = []
    list.forEach((e, index) => {
      console.log(e)

      result.push(
        <div style={{ float: 'left', marginRight: 10 }}>
          <a style={{ color: 'white' }} href="javascript:;" onClick={() => this.chooseArea(e.code, index)}>
            {e.cityName}
          </a>
        </div>,
      )
      if (index !== list.length - 1) {
        result.push(<div style={{ float: 'left', marginRight: 14 }}>&gt;</div>)
      }
    })
    return result
  }

  chooseArea = async (code, index) => {
    const { parentInfo } = this.state
    if (parentInfo.length === index + 1) {
      return
    }
    parentInfo.splice(index + 1)
    await this.setState({ parentInfo })
    this.getGeoData(code)
  }

  render() {
    const { mapData, parentInfo, geoJson, loading } = this.state
    return (
      <div>
        <Spin spinning={loading} size="large">
          <div style={{ height: 320 }}>
            <MapChart
              mapData={mapData} parentInfo={parentInfo}
              parentInfoPush={this.parentInfoPush} geoJson={geoJson}
            />
          </div>
        </Spin>
      </div>
    )
  }
}

export default MapPage
