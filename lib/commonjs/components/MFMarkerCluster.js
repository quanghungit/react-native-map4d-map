"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFMarkerCluster = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,
  // algorithm: PropTypes.string,

  /**
   * Callback that is called when the user presses on the marker cluster
   */
  onPressCluster: _propTypes.default.func
};

class MFMarkerCluster extends _react.default.Component {
  constructor(props) {
    super(props);
    this._onPressCluster = this._onPressCluster.bind(this);
    this._ref = this._ref.bind(this);
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.cluster);
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
    const componentName = "RMFMarkerCluster";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFMarkerCluster`][name];
  }

  _onPressCluster(event) {
    event.stopPropagation();

    if (this.props.onPressCluster) {
      this.props.onPressCluster(event);
    }
  }

  _ref(ref) {
    this.cluster = ref;
  }

  render() {
    console.log('RMFMarkerCluster | render');
    return /*#__PURE__*/_react.default.createElement(RMFMarkerCluster, _extends({}, this.props, {
      ref: this._ref,
      onPressCluster: this._onPressCluster
    }));
  }

}

exports.MFMarkerCluster = MFMarkerCluster;
MFMarkerCluster.propTypes = propTypes;
var RMFMarkerCluster = (0, _reactNative.requireNativeComponent)(`RMFMarkerCluster`, MFMarkerCluster);
//# sourceMappingURL=MFMarkerCluster.js.map