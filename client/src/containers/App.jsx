import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function App(props) {
  console.log(props);
  const childrenWithStoreProps = React.Children.map(
    props.children,
    (child) => React.cloneElement(child, { ...props }));
  return (
    <div>
      {childrenWithStoreProps}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
