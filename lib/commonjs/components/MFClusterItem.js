"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFClusterItem = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
   * The coordinate for the marker cluster item.
   */
  coordinate: _propTypes.default.shape({
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  }).isRequired,

  /**
   * The title of the marker cluster item.
   */
  title: _propTypes.default.string,

  /**
   * The snippet of the marker cluster item.
   */
  snippet: _propTypes.default.string,

  /**
   * Callback that is called when the user presses on the marker cluster item.
   */
  onPress: _propTypes.default.func,

  /**
   * Callback that is called when the user presses on the info window of marker cluster item.
   */
  onPressInfoWindow: _propTypes.default.func
};

class MFClusterItem extends _react.default.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._ref = this._ref.bind(this);
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.clusterItem);
  }

  _runCommand(name, args) {
    switch (_reactNative.Platform.OS) {
      case 'android':
        _reactNative.NativeModules.UIManager.dispatchViewManagerCommand(this._getHandle(), this._uiManagerCommand(name), args);

        break;

      case 'ios':
        //this.getMapManagerCommand(name)(this._getHandle(), ...args);
        this._mapManagerCommand(name)(this._getHandle(), ...args);

        break;

      default:
        break;
    }
  }

  _uiManagerCommand(name) {
    const UIManager = _reactNative.NativeModules.UIManager;
    const componentName = "RMFClusterItem";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFClusterItem`][name];
  }

  _onPress(event) {
    event.stopPropagation();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }

  _ref(ref) {
    this.clusterItem = ref;
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(RMFClusterItem, _extends({}, this.props, {
      ref: this._ref,
      onPress: this._onPress
    }));
  }

}

exports.MFClusterItem = MFClusterItem;
MFClusterItem.propTypes = propTypes;
var RMFClusterItem = (0, _reactNative.requireNativeComponent)(`RMFClusterItem`, MFClusterItem);
//# sourceMappingURL=MFClusterItem.js.map