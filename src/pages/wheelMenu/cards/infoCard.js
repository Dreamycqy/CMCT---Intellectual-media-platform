import React from 'react'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>某场所</div>
        <div style={{ color: '#fff', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>北京市海淀区清华大学某场所</div>
        <div style={{ height: 150, marginTop: 10 }}>
          <div style={{ float: 'left', marginRight: 10 }}>
            <img
              style={{ objectFit: 'cover' }}
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              height="150" width="150"
              alt=""
            />
          </div>
          <div style={{ color: '#fff', textAlign: 'left', fontSize: 12, marginLeft: 4 }}>
            清华大学（清华，Tsinghua University），于1911年始建，坐落于北京市，是中国教育部直属的高等院校，是中国最著名的大学之一，被誉为“红色工程师的摇篮”，隶属“211工程”“985工程”。其前身是清华学堂。清华大学因北京西北郊清华园而得名。1912年，更名为清华学校。1928年，更名为国立清华大学。1938年，迁至昆明，易名国立西南联合大学。1946年，迁回清华园复校，1949年后更名“清华大学”。
          </div>
        </div>
      </div>
    )
  }
}
