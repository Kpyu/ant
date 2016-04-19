import React, { PropTypes } from 'react';
import { defaultProps } from 'recompose';
import { Link } from 'react-router';

function Hello(props) {
  console.log(props);
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Hello, {props.name}</h1>
      <div style={{ margin: 'auto', width: '75%' }}>
      </div>
      <Link to="/login">Login</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

Hello.propTypes = {
  name: PropTypes.string
};

export default defaultProps(
  {
    name: 'Sean Campbell'
  }
)(Hello);
