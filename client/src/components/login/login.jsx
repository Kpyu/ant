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
import Promise from 'bluebird';
import { withProps, compose } from 'recompose';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import { submit } from '../../actions/Action.jsx';

const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
};
class Login extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }
  handleTouchTap() {
    alert('oh hi');
  }
  render() {
    const { onSubmit } = this.props;
    var a = [1, 2, 3];
    var b = a.map((x) => x + 1);
    return (
      <div className="commentBox">
        <h1> Sum </h1>
        Hello, world!I am a CommentBox.{ b }.Sucka
        <RaisedButton label="Dood!" primary={true} onTouchTap={this.handleTouchTap} />
      </div>
    );
  }
}

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {
  };
}
// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
  return {
    onSubmit: () => {
      console.log('执行了点击提交事件');
      dispatch(submit());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
// 你可以传递一个对象，而不是定义一个 `mapDispatchToProps`：
// export default connect(mapStateToProps, CounterActionCreators)(Counter);

// 或者如果你想省略 `mapDispatchToProps`，你可以通过传递一个 `dispatch` 作为一个 props：
// export default connect(mapStateToProps)(Counter);

// 想看到更多的方法，详细的 connect() 示例如下。
Login.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
