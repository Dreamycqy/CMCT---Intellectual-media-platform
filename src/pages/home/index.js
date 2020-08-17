import React from 'react'
import { Button, AutoComplete, Input } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'
import Background from '@/assets/banner2.jpg'
import Logo from '@/assets/homeLogo.png'

let localCounter = 0
const { Option } = AutoComplete

@connect()
class ClusterBroker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      data: [],
    }
  }

  search = async () => {
    this.setState({ data: [] })
  }

  handleJump = (value) => {
    const { filter } = this.state
    router.push({
      pathname: '/searchPage',
      query: {
        filter: value || filter,
      },
    })
  }

  handleHighlight = (str, filter) => {
    let lightStr = []
    const word = new RegExp(filter, 'ig')
    const arr = str.split(word)
    lightStr = [<span key={localCounter++}>{arr[0]}</span>]
    for (let i = 1; i < arr.length; i++) {
      const keyword = str.match(word)[i - 1]
      lightStr.push(<span key={localCounter++} style={{ color: 'red' }}>{keyword}</span>)
      lightStr.push(<span key={localCounter++}>{arr[i]}</span>)
    }
    return lightStr
  }

  handleInputChange = (value) => {
    this.setState({ filter: value }, () => setTimeout(() => this.search(value), 1000))
  }

  renderOption = (data) => {
    const children = []
    // const { filter } = this.state
    // data.forEach(item => children.push(
    //   <Option key={item} value={item}>
    //     {this.handleHighlight(item, filter)}
    //   </Option>,
    // ))
    return children
  }

  render() {
    const {
      data,
    } = this.state
    return (
      <div style={{ textAlign: 'center', background: `url("${Background}") repeat`, height: '100%', minHeight: 800 }}>
        <div style={{ display: 'inline-block', marginTop: '10%', marginLeft: -30 }}>
          <div style={{ float: 'left' }}>
            <img src={Logo} alt="logo" width="84px" height="84px" />
          </div>
          <div style={{ float: 'left', fontSize: 42, marginTop: 16, color: 'white' }}>
            SEKG 科学教育图谱
          </div>
        </div>
        <br />
        <br />
        <div style={{ display: 'inline-block' }}>
          <AutoComplete
            size="large"
            style={{
              width: 500, float: 'left',
            }}
            dataSource={this.renderOption(data)}
            onChange={value => this.handleInputChange(value)}
            onSelect={value => this.setState({ filter: value })}
            backfill
            placeholder="请输入要搜索的内容"
            optionLabelProp="value"
            defaultActiveFirstOption={false}
          >
            <Input
              onPressEnter={e => this.handleJump(e.target.value)}
              style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
            />
          </AutoComplete>
          <Button style={{ float: 'left', borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} size="large" type="primary" onClick={() => this.handleJump()}>搜索</Button>
        </div>
      </div>
    )
  }
}
export default ClusterBroker
