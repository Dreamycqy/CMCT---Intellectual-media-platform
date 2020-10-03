import React from 'react'
import { Layout, ConfigProvider, Menu } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import router from 'umi/router'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_GB from 'antd/lib/locale-provider/en_GB'
import menuList from '@/constants/menuList'

const {
  Header, Footer, Content,
} = Layout

function mapStateToProps(state) {
  const { locale } = state.global
  return {
    locale,
  }
}
@connect(mapStateToProps)
class MainLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: window.location.pathname.split('/')[2],
    }
  }

  componentWillReceiveProps = () => {
    const key = window.location.pathname.split('/')[2]
    this.setState({
      key,
    })
  }

  handleSelect = (key) => {
    this.setState({ key })
    router.push(`/cmct/${key}`)
  }

  handleLocaleChange = () => {
    this.props.dispatch({
      type: 'global/updateState',
      payload: {
        locale: this.props.locale === 'cn' ? 'en' : 'cn',
      },
    })
  }

  makeMenu = () => {
    const result = []
    for (const i in menuList) { // eslint-disable-line
      result.push(<Menu.Item key={i}>{menuList[i][this.props.locale]}</Menu.Item>)
    }
    return result
  }

  render() {
    return (
      <Layout>
        <ConfigProvider locale={this.props.locale === 'cn' ? zh_CN : en_GB}>
          <Header
            style={{
              height: 40,
              backgroundColor: '#001529',
              position: 'fixed',
              top: 0,
              zIndex: 999,
              width: '100%',
              padding: 0,
            }}
          >
            <div
              style={{
                width: 300,
                height: 31,
                marginLeft: 30,
                float: 'left',
                fontSize: 14,
                fontWeight: 700,
                lineHeight: '40px',
              }}
            >
              <Link to="/cmct">文旅智媒平台</Link>
            </div>
            <Menu
              mode="horizontal"
              theme="dark"
              selectedKeys={[this.state.key]}
              style={{ lineHeight: '40px', float: 'right', height: 39 }}
              onClick={e => this.handleSelect(e.key)}
            >
              {this.makeMenu()}
            </Menu>
          </Header>
          <Content style={{ minHeight: 800, marginTop: 40 }}>
            {this.props.children}
          </Content>
          <Footer
            style={{ backgroundColor: '#001529', padding: 30 }}
          >
            <div style={{ padding: '0 30px' }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ display: 'inline-block' }}>
                  <div style={{ fontSize: 18 }}>文 化 旅 游 部</div>
                  <div style={{ fontSize: 10 }}>清 华 大 学 知 识 工 程 研 究 室</div>
                </div>
              </div>
            </div>
          </Footer>
        </ConfigProvider>
      </Layout>
    )
  }
}

export default MainLayout
