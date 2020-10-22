import React from 'react'
import * as d3 from 'd3'
import d3Cloud from '@/utils/d3-cloud'
import colorList from '@/constants/colorList'

export default class D3SimpleTagCloudChart extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth
    const data = [
      { name: '中华文化', value: 9, href: 'http://www.qq.com/' },
      { name: '清华大学', value: 8, href: 'https://www.taobao.com/' },
      { name: '天安门', value: 8, href: 'https://www.baidu.com/' },
      { name: '故宫博物院', value: 7, href: '/cmct/knowledgeCard?name=故宫博物院' },
      { name: '玉渊潭公园', value: 6, href: '/cmct/knowledgeCard?name=玉渊潭公园' },
      { name: '李白', value: 6, href: 'http://www.sina.com.cn/' },
      { name: '青海湖', value: 5, href: 'http://www.sohu.com/' },
      { name: '西湖', value: 4, href: 'http://www.meituan.com/' },
      { name: '长城', value: 4, href: 'http://www.ctrip.com/' },
      { name: '国家图书馆', value: 3, href: 'https://www.360.cn/' },
      { name: '六朝古都', value: 3, href: 'https://www.mi.com/' },
      { name: '杭州', value: 3, href: 'https://www.ele.me/' },
      { name: '北京大学', value: 2, href: 'https://www.toutiao.com/' },
    ]
    const chart = d3.select(this.chartRef)

    // const fill = d3.scaleLinear(d3.schemeCategory20) // 定义颜色

    const words = data.map(item => { // 处理原始数据
      return {
        text: item.name,
        size: item.value * 3,
        href: item.href,
      }
    })

    console.log(words)

    const layout = d3Cloud() // 构建云图
      .size([280, 300])
      .words(words)
      .padding(5)
      .rotate(() => { return ~~(Math.random() * 2) * 90 })
      .font('Impact')
      .fontSize((d) => { return d.size })
      .on('end', draw)

    layout.start()

    function draw(words) { // 输出所有标签
      const g = chart.attr('width', containerWidth)
        .attr('height', layout.size()[1])
        .append('g')
        .attr('transform', `translate(${containerWidth / 2},${layout.size()[1] / 2})`)

      g.selectAll('text')
        .data(words)
        .enter().append('text')
        .on('click', (d) => {
          window.open('/cmct/knowledgeCard?name=故宫博物院')
        })
        .style('font-family', 'Impact')
        .style('cursor', 'pointer')
        .style('fill', (d, i) => { return colorList.line[i] })
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => {
          return `translate(${[d.x, d.y]})rotate(${d.rotate})`
        })
        .style('font-size', (d) => { return `${d.size}px` })
        .text((d) => { return d.text })
        .append('title')
        .text((d) => { return d.href })

      g.selectAll('text') // 创建动画
        .style('fill-opacity', 0)
        .transition()
        .duration(200)
        .delay((d, i) => {
          return i * 200
        })
        .style('fill-opacity', 1)
    }
  }

  render() {
    return (
      <div className="tag-cloud-chart--simple">
        <svg ref={(r) => this.chartRef = r} />
      </div>
    )
  }
}
