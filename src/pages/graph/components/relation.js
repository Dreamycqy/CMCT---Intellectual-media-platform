import React from 'react'
import { Card, List, Avatar } from 'antd'
import Styles from '../style.less'

const kgList = [
  {
    title: '爱新觉罗溥仪',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/9612/cut-20200421180619-1075321186_jpg_265_331_13509.jpg/300',
    type: '人物',
    desc: '爱新觉罗·溥仪，字曜之，号浩然，出生于北京醇亲王府，醇贤亲王奕譞之孙、摄政王载沣长子，清朝末代皇帝，中国历史上最后一个皇帝。',
  },
  {
    title: '朱棣',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/32150/cut-20190526200410-1697936262_jpg_418_522_45595.jpg/300',
    type: '人物',
    desc: '朱棣（1360年5月2日-1424年8月12日），出生于应天（今南京），朱元璋第四子，明朝第三位皇帝，被称为“永乐大帝”。',
  },
  {
    title: '慈禧',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/30443/20190603141620-897148730_jpeg_407_430_36671.jpg/0',
    type: '人物',
    desc: '慈禧（本名：叶赫那拉氏，别名：西太后、老佛爷，1835年11月29日-1908年11月15日），出生于北京，咸丰帝妃嫔，同治帝生母，晚清实际统治者。',
  },
  {
    title: '木结构建筑',
    src: 'https://pic.baike.soso.com/ugc/baikepic2/0/20161021204506-440428090.jpg/800',
    type: '建筑',
    desc: '木结构建筑（timber construction）是指单纯由木材或主要由木材承受荷载的结构建筑，通过各种金属连接件或榫卯手段进行连接和固定。',
  },
  // {
  //   title: '',
  //   src: '',
  //   type: '',
  //   desc: '',
  // },
  // {
  //   title: '知识点6',
  //   src: '',
  //   type: '',
  //   desc: '',
  // },
  // {
  //   title: '知识点7',
  //   src: '',
  //   type: '',
  //   desc: '',
  // },
]

export default class Relation extends React.Component {
  render() {
    const { loading } = this.props
    return (
      <Card
        className={Styles.myCard}
        style={{ margin: 10 }}
        title="相关知识"
        id="components-anchor-kgrelated"
      >
        <List
          itemLayout="vertical"
          size="small"
          dataSource={kgList}
          loading={loading}
          pagination={{
            showSizeChanger: false,
            size: 'small',
            style: { display: typeof resource === 'object' ? 'block' : 'none' },
          }}
          style={{ height: 500, overflowY: 'scroll', padding: '0 20px 20px 20px' }}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.src} size="large" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={`分类：${item.type}`}
                />
                <p style={{ fontSize: 12, wordBreak: 'break-all' }}>{item.desc}</p>
              </List.Item>
            )
          }}
        />
      </Card>
    )
  }
}
