import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUtensils, faPlaceOfWorship, faMapMarkedAlt, faAtlas, faToriiGate, faUserFriends, faBookOpen, faHouseUser, faUndo,
} from '@fortawesome/free-solid-svg-icons'
import Styles from './cards/wheel.css'
import Main from './main'

const menuData = [
  {
    color: '#b3462f',
    icon: faUserFriends,
    name: '人物',
  }, {
    color: '#e78b38',
    icon: faAtlas,
    name: '历史事件',
  }, {
    color: '#353535',
    icon: faMapMarkedAlt,
    name: '地点',
  }, {
    color: '#303c54',
    icon: faToriiGate,
    name: '场所',
  }, {
    color: '#3a384e',
    icon: faBookOpen,
    name: '文艺作品',
  }, {
    color: '#78332c',
    icon: faPlaceOfWorship,
    name: '机构',
  }, {
    color: '#78332c',
    icon: faUtensils,
    name: '美食',
  },
  {
    color: '#b3462f',
    icon: faUserFriends,
    name: '人物',
  }, {
    color: '#e78b38',
    icon: faAtlas,
    name: '历史事件',
  }, {
    color: '#353535',
    icon: faMapMarkedAlt,
    name: '地点',
  }, {
    color: '#303c54',
    icon: faToriiGate,
    name: '场所',
  }, {
    color: '#3a384e',
    icon: faBookOpen,
    name: '文艺作品',
  }, {
    color: '#78332c',
    icon: faPlaceOfWorship,
    name: '机构',
  }, {
    color: '#78332c',
    icon: faUtensils,
    name: '美食',
  },
  {
    color: '#b3462f',
    icon: faUserFriends,
    name: '人物',
  }, {
    color: '#e78b38',
    icon: faAtlas,
    name: '历史事件',
  }, {
    color: '#353535',
    icon: faMapMarkedAlt,
    name: '地点',
  }, {
    color: '#303c54',
    icon: faToriiGate,
    name: '场所',
  }, {
    color: '#3a384e',
    icon: faBookOpen,
    name: '文艺作品',
  }, {
    color: '#78332c',
    icon: faPlaceOfWorship,
    name: '机构',
  }, {
    color: '#78332c',
    icon: faUtensils,
    name: '美食',
  },
]

const menuData2 = [
  {
    color: '#b3462f',
    icon: faHouseUser,
    name: '住宿场所',
  }, {
    color: '#303c54',
    icon: faToriiGate,
    name: '景点',
  }, {
    color: '#78332c',
    icon: faPlaceOfWorship,
    name: '购物场所',
  }, {
    color: '#78332c',
    icon: faUtensils,
    name: '餐饮场所',
  },
]

const placeData = [
  {
    color: '#b3462f',
    icon: null,
    name: '清华大学甲所餐厅',
  }, {
    color: '#e78b38',
    icon: null,
    name: '清芬园学生食堂',
  }, {
    color: '#353535',
    icon: null,
    name: '听涛园',
  }, {
    color: '#303c54',
    icon: null,
    name: '清华大学观畴园',
  }, {
    color: '#3a384e',
    icon: null,
    name: '玉树园餐厅',
  }, {
    color: '#78332c',
    icon: null,
    name: '清华大学荷园教工餐厅',
  }, {
    color: '#78332c',
    icon: null,
    name: '寓园教工餐厅',
  },
]

export default class WheelMenu extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      menuItems: [],
      showMenuItems: [],
      menuOpen: true,
      show: false,
    }
  }

  componentWillMount = async () => {
    await this.makeMenu(this.props.select === '餐饮场所' ? placeData : menuData)
    // this.animateButtons()
  }

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.show === true) {
      await this.makeMenu(nextProps.select === '餐饮场所' ? placeData : menuData)
      this.setState({ show: true })
    }
  }

  itemClick = async (name) => {
    if (name === '场所') {
      await this.setState({ showMenuItems: [], menuOpen: false })
      await this.makeMenu(menuData2)
      this.animateButtons()
      this.setState({ menuOpen: true })
    }
    if (name === '餐饮场所') {
      this.props.findCenter()
    }
  }

  toggle = async (menuOpen) => {
    console.log('open?', menuOpen)
    await this.setState({ showMenuItems: [] })
    this.animateButtons()
    this.setState({ menuOpen })
  }

  close = () => {
    this.setState({ menuOpen: false, menuItems: [], showMenuItems: [], show: false })
    this.props.closeModal()
  }

  menu = (size, items, open) => (
    <div className={Styles[open ? 'menuWrapperOpen' : 'menuWrapperClosed']}>
      <div className="menuBackground">
        {this.menuItems(size, items, open)}
      </div>
    </div>
  )

  menuItems = (size, items, open) => {
    const buttons = items.map((item) => {
      const styling = {
        transform:
          `rotate(${item.rotation}deg) 
           translate(${size / 2}em) 
           rotate(${-(item.rotation)}deg)`,
        backgroundColor: item.color,
        opacity: open ? 1 : 0,
      }
      return (
        <div
          className={Styles.menuItem}
          style={styling}
          onClick={() => this.itemClick(item.name)}
        >
          <span>
            {item.icon !== null
              ? <FontAwesomeIcon icon={item.icon} size="2x" color="white" />
              : null}
          </span>
          <br />
          <div style={{ marginTop: 3, color: '#fff' }}>{item.name}</div>
        </div>
      )
    })
    return (
      <div
        style={{
          position: 'relative',
          height: 500,
          width: 500,
          borderRadius: '50%',
          margin: '1.75em auto 0',
          zIndex: 20,
          top: '50%',
          marginTop: '8em',
        }}
        className={open ? Styles.animateMenu : null}
      >
        {buttons}
      </div>
    )
  }

  makeMenu = (menuConfig) => {
    const angle = 360 / (menuConfig.length + 1)
    let rotation = 0
    const menuItems = []
    menuConfig.forEach(({ color, icon, name }) => {
      menuItems.push({
        color,
        icon,
        click: () => this.itemClick(name),
        rotation,
        angle,
        name,
        show: false,
      })
      rotation += angle
    })
    menuItems.push({
      color: 'black',
      icon: faUndo,
      click: () => this.itemClick('back'),
      rotation,
      angle,
      name: '返回',
      show: false,
    })
    this.setState({
      menuItems,
    })
  }

  animateButtons = () => {
    const { length } = this.state.menuItems
    const stagger = (i) => {
      if (i < length) {
        setTimeout(() => {
          const items = this.state.menuItems
          const showing = this.state.menuItems[i].show
          this.setState({
            showMenuItems: [
              ...items.slice(0, i),
              { ...items[i], show: !showing },
              ...items.slice(i + 1),
            ],
          })
          stagger(i + 1)
        }, 50)
      }
    }
    stagger(0)
  }

  render() {
    const { showMenuItems, menuOpen, show } = this.state
    return (
      <div style={{ display: show ? 'block' : 'none' }}>
        <div style={{ position: 'absolute', width: '100%' }}>
          <div className={Styles.menuToggle}>
            <Main
              toggle={this.toggle}
              close={this.close}
              show={this.props.show}
              select={this.props.select}
            />
          </div>
        </div>
        {this.menu(46, showMenuItems, menuOpen)}
      </div>
    )
  }
}
