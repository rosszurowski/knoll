(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
	(factory((global.Knoll = global.Knoll || {}),global.React));
}(this, (function (exports,React) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

function Table$1(props) {
  var className = props.className,
      children = props.children,
      data = props.data,
      rowClassName = props.rowClassName,
      headerCellClassName = props.headerCellClassName,
      cellClassName = props.cellClassName;


  var columns = React__default.Children.toArray(children);
  var hasCells = columns.some(function (child) {
    return Boolean(child.props.cell);
  });
  var hasHeaders = columns.some(function (child) {
    return Boolean(child.props.header);
  });

  return React__default.createElement(
    'table',
    { className: className },
    hasHeaders && React__default.createElement(
      'thead',
      null,
      React__default.createElement(
        'tr',
        { className: rowClassName },
        React__default.Children.map(children, function (child, index) {
          return React__default.createElement(
            'th',
            { className: headerCellClassName, key: index },
            maybeCall(child.props.header)
          );
        })
      )
    ),
    React__default.createElement(
      'tbody',
      null,
      hasCells && data.map(function (row, rowIndex) {
        return React__default.createElement(
          'tr',
          { className: rowClassName, key: rowIndex },
          React__default.Children.map(children, function (child, index) {
            return React__default.createElement(
              'td',
              { className: cellClassName, key: index },
              maybeCall(child.props.cell, row)
            );
          })
        );
      })
    )
  );
}

Table$1.propTypes = {
  cellClassName: React.PropTypes.string,
  data: React.PropTypes.array.isRequired,
  headerCellClassName: React.PropTypes.string,
  rowClassName: React.PropTypes.string
};

function maybeCall(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof fn === 'function' ? fn.apply(undefined, args) : fn;
}

var Column$1 = function Column(props) {
  return null;
};

Column$1.propTypes = {
  cell: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func]),
  header: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.func])
};

var Column = Column$1;

exports['default'] = Table$1;
exports.Column = Column;

Object.defineProperty(exports, '__esModule', { value: true });

})));
