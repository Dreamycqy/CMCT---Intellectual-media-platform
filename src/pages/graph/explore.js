import React from 'react'
import { Icon, Avatar, Dropdown, Menu } from 'antd'
import TextChart from '@/components/charts/testChart'

const { SubMenu } = Menu

class GraphList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hisList: [{
        name: '故宫博物院',
        type: '景点',
      }, {
        name: '颐和园',
        type: '景点',
        relation: '皇室建筑',
      }, {
        name: '圆明园',
        type: '景点',
        relation: '皇家园林',
      }, {
        name: '清华大学',
        type: '机构',
        relation: '附近',
      }, {
        name: '北京大学',
        type: '机构',
        relation: '大学',
      }],
      dimList: [
        {
          name: '附近',
          children: [
            { name: '景点' },
            { name: '机构',
              children: [
                { name: '大学' },
              ],
            },
            { name: '商铺' },
            { name: '餐饮' },
          ],
        },
        {
          name: '文化',
          children: [
            { name: '皇室建筑' },
            { name: '皇家园林' },
          ],
        },
        {
          name: '历史',
          children: [
            { name: '清朝' },
          ],
        },
        {
          name: '人物',
        },
      ],
      targetPoint: {
        name: '',
        key: '故宫博物院0',
      },
      friendList: [],
      selectDim: '',
    }
  }

  handleHistory = (e, index) => {
    this.setState({ targetPoint: { ...e, key: e.name + index, index } })
  }

  handleIcon = (type) => {
    switch (type) {
      case '景点':
        return <Icon type="heart" theme="twoTone" />
      case '机构':
        return <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />
      case '商铺':
        return <Icon type="dollar" theme="twoTone" twoToneColor="#52c41a" />
      case '餐饮':
        return <Icon type="fire" theme="twoTone" twoToneColor="#red" />
      default:
        return null
    }
  }

  handleSelect = async ({ key }) => {
    console.log(key)
  }

  renderHistory = (list) => {
    const { targetPoint } = this.state
    const result = []
    list.forEach((e, index) => {
      result.push(
        <div
          key={e.name + index}
          style={{
            borderBottom: '1px solid #e8e8e8',
            padding: '4px 10px',
            backgroundColor: e.name + index === targetPoint.key ? '#24b0e6' : '#fff',
          }}
        >
          {this.handleIcon(e.type)}
          <a
            style={{ marginLeft: 4, color: e.name + index === targetPoint.key ? '#fff' : '' }}
            href="javascript:;" onClick={() => this.handleHistory(e, index)}
          >
            {e.name}
          </a>
        </div>,
      )
    })
    return result
  }

  renderMenu = (list, key) => {
    return list.map((item) => {
      const {
        name, children,
      } = item
      const newkey = `${key}/${name}`
      if (children) {
        return (
          <SubMenu
            key={newkey} title={(
              <span>
                <a style={{ color: '#000000a6' }} href="javascript:;" onClick={() => this.forceClick(newkey)}>{name}</a>
              </span>
            )}
          >
            {this.renderMenu(children, newkey)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={newkey} onClick={() => this.forceClick(newkey)}>
            {name}
          </Menu.Item>
        )
      }
    })
  }

  renderDims = (list) => {
    const result = []
    list.forEach((e, index) => {
      let icon = <Icon type="user" />
      switch (e.name) {
        case '附近':
          icon = <Icon type="global" />
          break
        case '文化':
          icon = <Icon type="reconciliation" />
          break
        case '历史':
          icon = <Icon type="read" />
          break
        case '人物':
          icon = <Icon type="user" />
          break
        default:
          icon = null
          break
      }
      if (e.children) {
        const menu = (
          <Menu
            onSelect={this.handleSelect}
          >
            {this.renderMenu(e.children, e.name)}
          </Menu>
        )
        result.push(
          <Dropdown placement="bottomLeft" overlay={menu}>
            <div
              style={{ marginBottom: 6, textAlign: 'center', cursor: 'pointer', backgroundColor: e.name === '历史' ? '#c4e3ff' : null, padding: '6px 0' }}
              onClick={() => this.forceClick(e.name)}
              key={e.name + index}
            >
              <Avatar icon={icon} />
              <div style={{ marginTop: 4 }}>{e.name}</div>
            </div>
          </Dropdown>,
        )
      } else {
        result.push(
          <div
            style={{ marginBottom: 6, textAlign: 'center', cursor: 'pointer', padding: '6px 0' }}
            onClick={() => this.forceClick(e.name)}
            key={e.name + index}
          >
            <Avatar icon={icon} />
            <div style={{ marginTop: 4 }}>{e.name}</div>
          </div>,
        )
      }
    })
    return result
  }

  forceClick = (e) => {
    console.log(e)
  }

  render() {
    const { hisList, dimList, targetPoint, friendList, selectDim } = this.state
    return (
      <div style={{ height: '100%' }}>
        <div style={{ height: '100%', width: 140, float: 'left', border: '1px solid #e8e8e8', backgroundColor: '#fff' }}>
          <h3 style={{ textAlign: 'center', padding: 10, backgroundColor: '#1e95c3', color: '#fff' }}>访问历史</h3>
          <div style={{ overflow: 'scroll', height: 440 }}>
            {this.renderHistory(hisList)}
          </div>
        </div>
        <div style={{ height: '100%', width: 600, float: 'left' }}>
          <TextChart />
        </div>
        <div style={{ width: 80, position: 'absolute', zIndex: 100, borderLeft: '1px solid #e8e8e8', right: '20px', backgroundColor: '#ffffff69' }}>
          <h4 style={{ textAlign: 'center', padding: 10, backgroundColor: '#1e95c3', color: '#fff' }}>当前选择</h4>
          <div style={{ overflow: 'scroll', maxHeight: 400, padding: '10px 0' }}>
            {this.renderDims(dimList)}
          </div>
        </div>
      </div>
    )
  }
}
export default GraphList
