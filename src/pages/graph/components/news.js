import React from 'react'
import { Card, List, Icon, Cascader } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import { getNews } from '@/services/edukg'
import Styles from '../style.less'

const endDate = moment()
const startDate = moment().subtract(30, 'days')

const options = [{
  value: 'publisher',
  label: '相关度',
  children: [
    {
      value: 'desc',
      label: '倒序',
    },
    {
      value: 'asc',
      label: '正序',
    },
  ],
}, {
  value: 'publishTime',
  label: '发表时间',
  children: [
    {
      value: 'desc',
      label: '倒序',
    },
    {
      value: 'asc',
      label: '正序',
    },
  ],
}]

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      filter: ['publishTime', 'desc'],
      resource: [],
      name: '',
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if ((nextProps.name !== this.state.name) && (nextProps.name !== '')) {
      this.getNews(nextProps.name)
    }
  }

  getNews = async (name) => {
    const data = await getNews({
      words: name,
      endDate: endDate.format('YYYY-MM-DD'),
      startDate: startDate.format('YYYY-MM-DD'),
      page: 1,
      pageSize: 20,
    })
    if (data) {
      this.setState({ resource: data.data, name })
    }
  }

  render() {
    const {
      loading, resource, filter,
    } = this.state
    return (
      <Card
        className={Styles.myCard}
        style={{ margin: 10 }}
        title="相关新闻"
        id="components-anchor-pages"
        extra={(
          <Cascader
            options={options}
            value={filter}
            rows={4}
            onChange={(value) => this.setState({ filter: value })}
            allowClear={false}
          />
        )}
      >
        <List
          itemLayout="vertical"
          size="large"
          dataSource={_.orderBy(resource, filter[0], filter[1])}
          loading={loading}
          pagination={{
            showSizeChanger: false,
            size: 'small',
            style: { display: typeof resource === 'object' && resource.length > 0 ? 'block' : 'none' },
          }}
          style={{ height: 670, overflowY: 'scroll', padding: '0 20px 20px 20px' }}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  title={(
                    <a
                      style={{ width: 120, cursor: 'pointer' }}
                      href="javascript:;"
                      onClick={() => { window.open(item.url) }}
                    >
                      {item.title}
                    </a>
                  )}
                  description={(
                    <div>
                      <Icon
                        type="read"
                        style={{ marginRight: 8, color: '#24b0e6' }}
                      />
                      新闻来源：
                      {item.publisher}
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Icon
                        type="clock-circle"
                        style={{ marginRight: 8, color: '#24b0e6' }}
                      />
                      发布时期：
                      {item.publishTime}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                  )}
                />
                <div>
                  <p>{`${item.content}...`}</p>
                </div>
              </List.Item>
            )
          }}
        />
      </Card>
    )
  }
}

export default News
