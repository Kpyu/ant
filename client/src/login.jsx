//   神兽护体
//   ┏┓       ┏┓
//  ┏┛┻━━━━━━━┛┻┓
//  ┃           ┃
//  ┃     ━     ┃
//  ┃  ┳┛   ┗┳  ┃
//  ┃           ┃
//  ┃```  ┻  ```┃
//  ┃           ┃
//  ┗━┓      ┏━━┛
//    ┃      ┃   Code is far away from bug with the animal protecting.
//    ┃      ┃   神兽护佑,代码无bug.
//    ┃      ┗━━━┓
//    ┃          ┣┓
//    ┃          ┏┛
//    ┗┓┓┏━━┳┓┏━━┛
//     ┃┫┫  ┃┫┫
//     ┗┻┛  ┗┻┛
import React, { Component, PropTypes } from 'react';

/**
  组件的生命周期主要由三个部分组成：
  Mounting：组件正在被插入DOM中
  Updating：如果DOM需要更新，组件正在被重新渲染
  Unmounting：组件从DOM中移除
  React提供了方法，让我们在组件状态更新的时候调用，will标识状态开始之前，did表示状态完成后。例如componentWillMount就表示组件被插入DOM之前。
  getInitialState()：初始化state
  componentWillMount()：组件被插入DOM前执行
  componentDidMount()：组件被插入DOM后执行
  componentWillReceiveProps():
     组件被插入DOM后 未被触发,当节点初次被放入的时候 componentWillReceiveProps 并不会被触发。
     这是故意这么设计的。查看更多 其他生命周期的方法 。
     原因是因为 componentWillReceiveProps 经常会处理一些和 old props 比较的逻辑，
     而且会在变化之前执行；不在组件即将渲染的时候触发，这也是这个方法设计的初衷
  entWillReceiveProps(object nextProps):
    组件获取到新的属性时执行，这个方法应该将this.props同nextProps进行比较，然后通过this.setState()切换状态
  shouldComponentUpdate(object nextProps, object nextState):
    组件发生改变时执行，应该将this.props和nextProps、this.stats和nextState进行比较，返回true或false决定组件是否更新
  componentWillUpdate(object nextProps, object nextState)：
    组件更新前执行，不能在此处调用this.setState()。
  componentDidUpdate(object prevProps, object prevState)：
    组件更新后执行
  componentWillUnmount()：
    组件被移除前执行
  findDOMNode()：获取真实的DOM
  forceUpdate()：强制更新
**/
export default class ReactLogin extends Component {
  componentWillMount() {
    console.log('执行登陆页渲染');
  }
  componentDidMount() {
    console.log('登陆页渲染完成');
  }
}
