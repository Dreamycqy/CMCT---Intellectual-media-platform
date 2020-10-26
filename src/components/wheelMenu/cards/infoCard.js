import React from 'react'

const text1 = '清华大学甲所餐厅位于清华大学校园内，学院氛围浓厚，装修干净整洁，收拾的很利索，就餐舒适快捷。菜品丰富，品种比较齐全，价格也实惠，是个物有所值的吃饭地儿。特色服务：订座服务，可以刷卡，有包厢，有停车位，提供在线菜单，有下午茶，提供早餐，有wifi。'
const text2 = '餐饮的概念主要有两种：一是饮食，二是指提供餐饮的行业或者机构，满足食客的饮食需求，从而获取相应的服务收入。由于在不同的地区、不同的文化下，不同的人群饮食习惯、口味的不同，因此，世界各地的餐饮表现出多样化的特点。餐饮市场将进入品牌消费时代，中国餐饮业将以百分之十六的增速继续对扩大消费、促进就业发挥积极作用。对于餐饮企业而言，品牌力的重要性不言而喻。餐饮市场的竞争最后必将是品牌之间的竞争，谁的品牌力更强，谁就能拥有更广阔的市场，品牌力成为餐饮企业逐鹿市场的关键。'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{this.props.name}</div>
        <div style={{ color: '#fff', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>海淀区双清路30号清华大学内甲所招待所1楼</div>
        <div style={{ height: 150, marginTop: 10 }}>
          <div style={{ float: 'left', marginRight: 10 }}>
            <img
              style={{ objectFit: 'cover' }}
              src="https://pic.baike.soso.com/ugc/baikepic2/12718/20160810232919-273315875.jpg/800"
              height="150" width="150"
              alt=""
            />
          </div>
          <div style={{ color: '#fff', textAlign: 'left', fontSize: 12, marginLeft: 4 }}>
            {this.props.name === '餐饮场所' ? text2 : text1}
          </div>
        </div>
      </div>
    )
  }
}
