"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFCircle = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
   * The coordinate of the center of the circle
   */
  center: _propTypes.default.shape({
    /**
     * Coordinates for the center of the circle.
     */
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  }).isRequired,

  /**
   * The radius of the circle to be drawn (in meters)
   */
  radius: _propTypes.default.number.isRequired,

  /**
   * The stroke width to use for the circle.
   */
  strokeWidth: _propTypes.default.number,

  /**
   * The stroke color to use for the circle.
   */
  strokeColor: _reactNative.ColorPropType,

  /**
   * The fill color to use for the circle.
   */
  fillColor: _reactNative.ColorPropType,

  /**
   * zIndex
   */
  zIndex: _propTypes.default.number,

  /**
   * visible
   */
  visible: _propTypes.default.bool,

  /**
   * userData
   */
  userData: _propTypes.default.object,

  /**
   * Callback that is called when the user presses on the circle
   */
  onPress: _propTypes.default.func
}; // const defaultProps = {
//   strokeColor: '#000',
//   strokeWidth: 1,
// };

class MFCircle extends _react.default.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._ref = this._ref.bind(this);
  }

  setCenter(center) {
    this._runCommand("setCenter", [center]);
  }

  setRadius(radius) {
    this._runCommand("setRadius", [radius]);
  }

  setFillColor(color) {
    this._runCommand("setFillColor", [(0, _reactNative.processColor)(color)]);
  }

  setStrokeColor(color) {
    this._runCommand("setStrokeColor", [(0, _reactNative.processColor)(color)]);
  }

  setStrokeWidth(width) {
    this._runCommand("setStrokeWidth", [width]);
  }

  setUserData(userData) {
    this._runCommand("setUserData", [userData]);
  }

  setZIndex(zIndex) {
    this._runCommand("setZIndex", [zIndex]);
  }

  setVisible(visible) {
    this._runCommand("setVisible", [visible]);
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.circle);
  }

  _runCommand(name, args) {
    switch (_reactNative.Platform.OS) {
      case 'android':
        _reactNative.NativeModules.UIManager.dispatchViewManagerCommand(this._getHandle(), this._uiManagerCommand(name), args);

        break;

      case 'ios':
        this._mapManagerCommand(name)(this._getHandle(), ...args);

        break;

      default:
        break;
    }
  }

  _uiManagerCommand(name) {
    const UIManager = _reactNative.NativeModules.UIManager;
    const componentName = "RMFCircle";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFCircle`][name];
  }

  _onPress(event) {
    event.stopPropagation();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }

  _ref(ref) {
    this.circle = ref;
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(RMFCircle, _extends({}, this.props, {
      ref: this._ref,
      onPress: this._onPress
    }));
  }

}

exports.MFCircle = MFCircle;
MFCircle.propTypes = propTypes; // MFCircle.defaultProps = defaultProps;

var RMFCircle = (0, _reactNative.requireNativeComponent)(`RMFCircle`, MFCircle);
//# sourceMappingURL=MFCircle.js.map