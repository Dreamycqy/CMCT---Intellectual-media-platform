import React from 'react'
import { Spin, Cascader } from 'antd'
import AMapJS from 'amap-js'
import MapChart from '@/components/charts/map'
import backGroundImg from '@/assets/bg1.jpg'
import { getPlaceborder } from '@/services/edukg'

const key = '1ee802ced4061b529b02d9b9d2b9f704'
const options = [
  {
    value: '类型1',
    label: '类型1',
    children: [
      {
        value: '类型1-1',
        label: '类型1-1',
        children: [
          {
            value: '类型1-1-1',
            label: '类型1-1-1',
          },
        ],
      },
    ],
  },
  {
    value: '类型2',
    label: '类型2',
    children: [
      {
        value: '类型2-1',
        label: '类型2-1',
        children: [
          {
            value: '类型2-1-1',
            label: '类型2-1-1',
          },
        ],
      },
    ],
  },
]

class MapPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noPoint: false,
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
    this.setState({ loading: true, noPoint: false })
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

  getPlace = async (code) => {
    console.log(code)
    this.setState({ loading: true, noPoint: true })
    const data = await getPlaceborder({
      id: code,
    })
    if (data) {
      const coordinates = []
      console.log(data)
      const raw = '116.328826,40.013137;116.328969,40.01313;116.32985,40.013156;116.330133,40.013172;116.330573,40.013181;116.330764,40.01318;116.330888,40.013169;116.330994,40.013148;116.331106,40.013118;116.331216,40.013077;116.331354,40.013017;116.331449,40.012957;116.331792,40.012664;116.33208,40.012402;116.332166,40.012325;116.332196,40.012298;116.332467,40.012056;116.333146,40.011451;116.334464,40.010278;116.334945,40.009881;116.335355,40.009501;116.335382,40.009469;116.335413,40.009435;116.335512,40.009319;116.335566,40.009255;116.335645,40.009163;116.335834,40.00894;116.335967,40.008786;116.336184,40.00848;116.336323,40.00823;116.336419,40.008032;116.336532,40.007746;116.336626,40.007421;116.336701,40.00708;116.336759,40.006818;116.336774,40.00678;116.33678,40.006687;116.33678,40.006466;116.336781,40.006318;116.336782,40.006212;116.336828,40.005652;116.336855,40.0051;116.336868,40.004648;116.336886,40.00429;116.336889,40.004169;116.336947,40.00262;116.336962,40.00212;116.336989,40.001698;116.337007,40.00132;116.337039,40.000511;116.33704,40.00048;116.337058,39.99996;116.33709,39.999055;116.337081,39.998852;116.335128,39.997299;116.334779,39.997019;116.334195,39.99656;116.33417,39.99654;116.333908,39.996329;116.333579,39.996064;116.333551,39.996041;116.332997,39.995602;116.332874,39.995501;116.332731,39.995365;116.332515,39.995235;116.332467,39.996239;116.32876,39.99613;116.328875,39.994388;116.328536,39.994388;116.328189,39.994557;116.327587,39.994642;116.326893,39.994638;116.326575,39.994634;116.326589,39.994346;116.326264,39.994323;116.324607,39.994257;116.323749,39.994224;116.323693,39.994156;116.323209,39.993713;116.322694,39.993237;116.322695,39.992569;116.322373,39.992556;116.322096,39.992546;116.32201,39.992548;116.321984,39.992553;116.321958,39.99256;116.321934,39.992567;116.321903,39.992581;116.321883,39.992595;116.321878,39.992598;116.321858,39.992611;116.321848,39.992617;116.3218,39.992657;116.321492,39.992952;116.321076,39.993384;116.321022,39.993441;116.320918,39.993559;116.320892,39.993596;116.320742,39.993852;116.320711,39.993932;116.320681,39.994044;116.320634,39.994269;116.32053,39.995037;116.320414,39.995771;116.320319,39.996375;116.320256,39.996836;116.320216,39.997003;116.320163,39.997106;116.320083,39.997213;116.31994,39.997311;116.319792,39.99739;116.319592,39.997448;116.319451,39.997472;116.319402,39.997476;116.318618,39.997449;116.318057,39.99743;116.318026,39.997429;116.317312,39.997406;116.31712,39.997417;116.316917,39.997479;116.316711,39.997594;116.316512,39.997738;116.316185,39.998135;116.315687,39.998736;116.315368,39.999105;116.315308,39.999217;116.315283,39.999275;116.315269,39.999326;116.315261,39.999364;116.315255,39.999409;116.315252,39.999486;116.315249,39.999587;116.315253,39.999683;116.315254,39.99988;116.315269,40.00001;116.315289,40.000802;116.315306,40.001015;116.315329,40.00191;116.315755,40.001941;116.316351,40.001985;116.316628,40.002006;116.316982,40.00203;116.317159,40.002041;116.317248,40.002047;116.317292,40.00205;116.317328,40.002057;116.317343,40.002068;116.31735,40.002083;116.317363,40.002113;116.31739,40.002172;116.317395,40.002189;116.317397,40.002243;116.31738,40.002897;116.317382,40.002991;116.317401,40.003099;116.317416,40.00315;116.317432,40.003245;116.317412,40.003314;116.317379,40.003443;116.317356,40.003574;116.317347,40.003783;116.317344,40.003988;116.317339,40.004065;116.317338,40.00412;116.317356,40.004225;116.31738,40.004353;116.317383,40.004408;116.317366,40.004465;116.31735,40.004504;116.317272,40.004575;116.315402,40.004492;116.315422,40.004623;116.315515,40.004861;116.315609,40.005031;116.315682,40.005127;116.315773,40.005237;116.315855,40.005318;116.316005,40.005441;116.316205,40.005574;116.316361,40.005655;116.316519,40.005729;116.316708,40.00579;116.316796,40.005814;116.316846,40.005825;116.316941,40.005843;116.317028,40.005857;116.317122,40.005873;116.317234,40.005887;116.317437,40.00591;116.317824,40.005952;116.31808,40.00599;116.318232,40.006016;116.318307,40.006039;116.318348,40.006051;116.318441,40.00608;116.318483,40.006098;116.318598,40.006144;116.318681,40.006179;116.318755,40.006213;116.318838,40.006268;116.318916,40.006328;116.319034,40.006434;116.319138,40.006558;116.319201,40.006644;116.319244,40.006723;116.319292,40.006855;116.319315,40.00696;116.319333,40.007069;116.319333,40.00714;116.319322,40.007226;116.319296,40.007395;116.319273,40.007528;116.319269,40.007558;116.319197,40.008095;116.319185,40.008176;116.319154,40.008395;116.319068,40.009053;116.319064,40.009085;116.318891,40.010352;116.318852,40.01062;116.318834,40.010755;116.318806,40.011004;116.318716,40.011734;116.318695,40.011902;116.318628,40.012626;116.319389,40.012742;116.319978,40.012847;116.320494,40.012926;116.32091,40.012981;116.321016,40.012995;116.321369,40.013039;116.321648,40.013063;116.321837,40.013075;116.322198,40.013095;116.322569,40.01311;116.323465,40.013135;116.32356,40.013138;116.324675,40.013171;116.325604,40.013199;116.326284,40.013218;116.326379,40.01322;116.326612,40.013225;116.326813,40.013232;116.327137,40.013241;116.327227,40.013244;116.327635,40.013255;116.328082,40.013269;116.328198,40.013263;116.328371,40.013227;116.328826,40.013137'
      const list = raw.split(';')
      list.forEach((e) => {
        const temp = e.split(',')
        coordinates.push([Number(temp[0]), Number(temp[1])])
      })
      await this.setState({
        geoJson: {
          features: [
            {
              type: 'Feature',
              geometry: {
                coordinates: [[coordinates]],
                type: 'MultiPolygon',
              },
              properties: {
                name: '清华大学',
                level: 'district',
                childrenNum: 0,
                center: [116.32632, 40.00383],
                centroid: [116.233161, 40.026971],
                acroutes: [100000, 110000],
                adcode: 110108,
                subFeatureIndex: 5,
              },
            },
          ],
        },
      })
      this.geoJson = {
        features: [
          {
            type: 'Feature',
            geometry: {
              coordinates: [[coordinates]],
              type: 'MultiPolygon',
            },
            properties: {
              name: '清华大学',
              level: 'district',
              childrenNum: 0,
              center: [116.32632, 40.00383],
              centroid: [116.233161, 40.026971],
              acroutes: [100000, 110000],
              adcode: 110108,
              subFeatureIndex: 5,
            },
          },
        ],
      }
      this.getMapData()
    }
    this.setState({ loading: false })
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

  parentInfoPush = (params, isPlace) => {
    const { parentInfo } = this.state
    parentInfo.push(params)
    this.setState({ parentInfo })
    if (isPlace) {
      this.getGeoData(params.code)
    }
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
    const { mapData, parentInfo, geoJson, loading, noPoint } = this.state
    return (
      <div>
        <Spin spinning={loading} size="large">
          <div style={{ height: this.props.type === 'small' ? 380 : 800, background: `url(${backGroundImg}) top` }}>
            <div style={{ zIndex: 100, position: 'fixed', top: 40, backgroundColor: '#ffffff59', height: 40, padding: '0 20px', lineHeight: '40px' }}>
              {this.renderBread(parentInfo)}
            </div>
            <div style={{ zIndex: 100, position: 'fixed', top: 50, right: 80, height: 40, padding: '0 20px', lineHeight: '40px' }}>
              <Cascader options={options} placeholder="Please select" />
            </div>
            <MapChart
              mapData={mapData} parentInfo={parentInfo}
              parentInfoPush={this.parentInfoPush} geoJson={geoJson}
              getPlace={this.getPlace} noPoint={noPoint}
            />
          </div>
        </Spin>
      </div>
    )
  }
}

export default MapPage
