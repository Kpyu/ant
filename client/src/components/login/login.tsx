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
import TextField from 'material-ui/TextField';
import { doLogin, typingName } from '../../actions/Login.jsx';
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
  },
  paper: {
    height: 400,
    width: 600,
    margin: 20,
    textAlign: 'center',
    display: 'block'
  },
  paperHeader: {
    height: 120,
    width: 600,
    backgroundColor: '#00BCD4',
    display: 'block'
  },
  h1: {
    lineHeight: '120px',
    color: '#fff',
    textAlign: 'center'
  },
  btn: {
    marginTop: 10
  }
};

class Login extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.handleName = this.handleName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handPassword = this.handPassword.bind(this);
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }
  componentWillMount() {
    this.setState({ error: { msg: '' } });
  }
  handleName(event) {
    console.log('执行输入用户名');
    if (event.target.value) {
      this.refs.userName.setState({ errorText: null });
    }
    this.setState({ userName: event.target.value });
  }
  handPassword(event) {
    console.log('执行输入密码');
    if (event.target.value) {
      this.refs.password.setState({ errorText: null });
    }
    this.setState({ password: event.target.value });
  }
  handleSubmit() {
    const { dispatch } = this.props;
    const { userName, password } = this.state;
    if (!userName) {
      this.refs.userName.setState({ errorText: '用户名不能为空' });
      return;
    }
    if (!password) {
      this.refs.password.setState({ errorText: '密码不能为空' });
      return;
    }
    dispatch(doLogin(userName, password));
  }
  render() {
    const { error } = this.state;
    var a = [1, 2, 3];
    var b = a.map((x) => x + 1);
    return (
      <Paper style={styles.paper} zDepth={1} >
        <Paper style={styles.paperHeader} zDepth={1}>
          <h1 style={styles.h1}>登录</h1>
        </Paper>
        <div className="commentBox">
          <TextField
            ref="userName"
            hintText="请输入用户名"
            floatingLabelText="用户名"
            multiLine={false}
            onChange={ this.handleName }
            />
          <br />
          <TextField
            ref="password"
            hintText="请输入密码"
            floatingLabelText="密码"
            onChange = {this.handPassword}
            type="password"
            />
        </div>
        <RaisedButton
          label="登录"
          primary={true}
          style={styles.btn}
          onMouseDown={this.handleSubmit}
          />
      </Paper>
    );
  }
}


Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {};
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
export default connect(mapStateToProps)(Login);
// 你可以传递一个对象，而不是定义一个 `mapDispatchToProps`：
// export default connect(mapStateToProps, CounterActionCreators)(Counter);

// 或者如果你想省略 `mapDispatchToProps`，你可以通过传递一个 `dispatch` 作为一个 props：
// export default connect(mapStateToProps)(Counter);

// 想看到更多的方法，详细的 connect() 示例如下。

