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
// const styles = {
//   container: {
//     textAlign: 'center',
//     paddingTop: 200
//   }
// };

// const muiTheme = getMuiTheme({
//   palette: {
//     accent1Color: deepOrange500
//   }
// });
// // Grab the state from a global injected into server-generated HTML
// const initialState = window.__INITIAL_STATE__;
// // Create Redux store with initial state

// class ReactLogin extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.handleRequestClose = this.handleRequestClose.bind(this);
//     this.handleTouchTap = this.handleTouchTap.bind(this);

//     this.state = {
//       open: false
//     };
//   }
//   componentWillMount() {
//     console.log('执行登陆页渲染');
//   }
//   componentDidMount() {
//     console.log('登陆页渲染完成');
//   }
//   handleRequestClose() {
//     this.setState({
//       open: false
//     });
//   }

//   handleTouchTap() {
//     this.setState({
//       open: true
//     });
//   }

//   render() {
//     const standardActions = (
//       <FlatButton
//         label="Ok"
//         secondary={true}
//         onTouchTap={this.handleRequestClose}
//         />
//     );

//     return (
//       <MuiThemeProvider muiTheme={muiTheme}>
//         <div style={styles.container}>
//           <Dialog
//             open={this.state.open}
//             title="Super Secret Password"
//             actions={standardActions}
//             onRequestClose={this.handleRequestClose}
//             >
//             1-2-3-4-5
//           </Dialog>
//           <h1>material-ui</h1>
//           <h2>example project</h2>
//           <RaisedButton
//             label="Super Secret Password"
//             primary={true}
//             onTouchTap={this.handleTouchTap}
//             />
//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }

// const store = configureStore(initialState);

// const rootElement = document.getElementById('root');
// render(
//   <Provider store={store}>
//     <ReactLogin />
//   </Provider>,
//  rootElement
// );


function Login(props) {
  console.log(props);
  const {
    fields: { name, email, password },
    handleSubmit,
    resetForm,
    submitting,
    onSubmit
  } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit) }>
      <label> Name </label>
      <input type="text" placeholder="natac" { ...name } />
      <label> Email </label>
      <input type="email" placeholder="example@gmail.com" { ...email } />
      <label> Password </label>
      <input type="password" placeholder="secret" { ...password } />
      <button type="submit" disabled={submitting}> Submit </button>
      <button type="button" disabled={submitting} onClick={resetForm}> Clear Form </button>
    </form>
  );
}

Login.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequried,
  submitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func
};

function onSubmit(values) {
  return new Promise((resolve, reject) => {
    const { name, password, email } = values;
    // login user to the redux store via actions
    setTimeout(() => {
      console.log(`Logged in user with name: ${name}, password: ${password} and email: ${email}`);
      resolve();
    }, 1000);
  });
}
// using compose lets me author the onSubmit function in the global scope and
// then inject it into the component via props by using withProps()
export default compose(
  reduxForm({
    form: 'login',
    fields: ['name', 'email', 'password'],
  }),
  withProps(
    { onSubmit }
  ),
)(Login);
