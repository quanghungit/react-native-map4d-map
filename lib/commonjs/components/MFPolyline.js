"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFPolyline = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
   * An array of coordinates to describe the polygon
   */
  coordinates: _propTypes.default.arrayOf(_propTypes.default.shape({
    /**
     * Latitude/Longitude coordinates
     */
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  })),

  /**
   * The color to use for the path.
   */
  color: _reactNative.ColorPropType,

  /**
   * The stroke width to use for the path.
   */
  width: _propTypes.default.number,

  /**
   * The default style is `solid`.
   */
  lineStyle: _propTypes.default.oneOf(['solid', 'dotted']),

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
   * Callback that is called when the user presses on the polyline
   */
  onPress: _propTypes.default.func
};

class MFPolyline extends _react.default.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._ref = this._ref.bind(this);
  }

  _onPress(event) {
    event.stopPropagation();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }

  _ref(ref) {
    this.polyline = ref;
  } // TODO - bug


  setCoordinates(coordinates) {
    this._runCommand("setCoordinates", [coordinates]);
  }

  setWidth(width) {
    this._runCommand("setWidth", [width]);
  }

  setColor(color) {
    this._runCommand("setColor", [(0, _reactNative.processColor)(color)]);
  }

  setVisible(visible) {
    this._runCommand("setVisible", [visible]);
  }

  setTouchable(color) {
    this._runCommand("setTouchable", [touchable]);
  }

  setZIndex(zIndex) {
    this._runCommand("setZIndex", [touchable]);
  }

  setLineStyle(style) {
    this._runCommand("setLineStyle", [style]);
  }

  setUserData(userData) {
    this._runCommand("setUserData", [userData]);
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.polyline);
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
    const componentName = "RMFPolyline";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFPolyline`][name];
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(RMFPolyline, _extends({}, this.props, {
      ref: this._ref,
      onPress: this._onPress
    }));
  }

}

exports.MFPolyline = MFPolyline;
MFPolyline.propTypes = propTypes;
var RMFPolyline = (0, _reactNative.requireNativeComponent)(`RMFPolyline`, MFPolyline);
//# sourceMappingURL=MFPolyline.js.map