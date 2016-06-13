import { Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import actions from '../actions';
// import styles from './Layout.less';
const SubMenu = Menu.SubMenu;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.onCollapseChange = this.onCollapseChange.bind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(actions.menuLoad());
  }
  onCollapseChange() {
    const { dispatch, collapse } = this.props;
    if (collapse) {
      dispatch(actions.menuCollapse());
    } else {
      dispatch(actions.menuOpen());
    }
  }
  render() {
    const { collapse, children, menus } = this.props;
    return (
      <div className={collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside'}>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"></div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
            {
              menus ?
                menus.map(function (menuItem) {
                  return (
                    <Menu.Item key={menuItem.icon}>
                      <Icon type={menuItem.icon} /><span className="nav-text">{ menuItem.name }</span>
                    </Menu.Item>);
                }) :
                (<div></div>)
            }
          </Menu>
          <div className="ant-aside-action" onClick={this.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header"></div>
          <div className="ant-layout-breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>应用列表</Breadcrumb.Item>
              <Breadcrumb.Item>某应用</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div style={{ height: 220 }}>
                {children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
            @copyright Kpyu
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    collapse: state.collapseＭenu.collapse,
    menus: state.menu.menus
  };
}
function mapDispatchToProps(dispatch) {
  return {};
}
Layout.propTypes = {
  collapse: PropTypes.bool.isRequired,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  menus: PropTypes.array.isRequired
};
export default connect(mapStateToProps)(Layout);
