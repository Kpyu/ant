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
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});
function Login(props) {
  console.log(props);
  const {
    fields: { name, email, password },
    handleSubmit,
    resetForm,
    submitting,
    onSubmit
  } = props;
  const standardActions = (
      <FlatButton
        label="Ok"
        secondary={true}
        />
    );
  return (
    <form onSubmit={handleSubmit(onSubmit) }>
          <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            title="Super Secret Password"
            actions={standardActions}
            >
            1-2-3-4-5
          </Dialog>
          <h1>material-ui</h1>
          <h2>example project</h2>
          <RaisedButton
            label="Super Secret Password"
            primary={true}
            />
        </div>
      </MuiThemeProvider>
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
