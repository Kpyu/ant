import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from '../Layout';

class Main extends Component {
  render() {
    return (
      <div>主页</div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Main);

Main.propTypes = {
  dispatch: PropTypes.func.isRequired
};
