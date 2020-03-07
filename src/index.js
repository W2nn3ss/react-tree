import './index.css';
import cx from 'classnames';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-animated-tree';
import tree from './tree';
import packageJSON from '../package.json';

const treeStyles = {
  position: 'absolute',
  top: 40,
  left: 40,
  color: 'black',
  fill: 'black',
  width: '100%'
}

const typeStyles = {
  fontSize: '2em',
  verticalAlign: 'middle'
}

class App extends Component {
  state = {
    active: null,
    tree: tree
  };

  renderNode = node => {
    return (
      <span
        className={cx('node', {
          'is-active': node === this.state.active
        })}
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.module}
      </span>
    );
  };

  onClickNode = node => {
    this.setState({
      active: node
    });
  };

  render() {
    return (
      <div className="app">
        <div className="tree">
        <div className="inspector">
        <h1>
            {packageJSON.name} {packageJSON.version}
          </h1>
          
        <Tree content="main" type="ITEM" canHide open style={treeStyles}>
        <Tree content="hello" type={<span style={typeStyles}></span>} canHide />
        <Tree content="subtree with children" canHide>
          <Tree content="hello" />
          <Tree content="sub-subtree with children">
            <Tree content={JSON.stringify(this.state.tree, null, '  ')} style={{ color: '#63b1de' }} />
            <button onClick={this.updateTree}><Tree class="addContent" content="+" onClick={this.updateTree} style={{ color: '#63b1de' }} /></button>
            
          </Tree>
          <Tree content="hello" />
        </Tree>
        <Tree content="hello" canHide />
        <Tree content="hello" canHide />
      </Tree>
        </div>
        </div>
      </div>
    );
  }

  handleChange = tree => {
    this.setState({
      tree: tree
    });
  };

  updateTree = () => {
    const { tree } = this.state;
    tree.children.push({ module: 'test' });
    this.setState({
      tree: tree
    });
  };
}

ReactDOM.render(<App />, document.getElementById('app'));