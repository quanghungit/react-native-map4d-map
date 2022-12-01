"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFPolygon = void 0;

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
   * An array of array of coordinates to describe the polygon holes
   */
  holes: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.shape({
    /**
     * Latitude/Longitude coordinates
     */
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  }))),

  /**
   * The color to use for the polygon.
   */
  fillColor: _reactNative.ColorPropType,

  /**
   * The color to use for the polygon stroke.
   */
  strokeColor: _reactNative.ColorPropType,

  /**
   * The stroke width to use for the polygon.
   */
  strokeWidth: _propTypes.default.number,

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
   * Callback that is called when the user presses on the polygon
   */
  onPress: _propTypes.default.func
};

class MFPolygon extends _react.default.Component {
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
    this.polygon = ref;
  }

  setCoordinates(coordinates) {
    this._runCommand("setCoordinates", [coordinates]);
  }

  setHoles(holes) {
    this._runCommand("setHoles", [holes]);
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

  setVisible(visible) {
    this._runCommand("setVisible", [visible]);
  }

  setZIndex(zIndex) {
    this._runCommand("setZIndex", [touchable]);
  }

  setUserData(userData) {
    this._runCommand("setUserData", [userData]);
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.polygon);
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
    const componentName = "RMFPolygon";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFPolygon`][name];
  }

  render() {
    return /*#__PURE__*/_react.default.createElement(RMFPolygon, _extends({}, this.props, {
      ref: this._ref,
      onPress: this._onPress
    }));
  }

}

exports.MFPolygon = MFPolygon;
MFPolygon.propTypes = propTypes;
var RMFPolygon = (0, _reactNative.requireNativeComponent)(`RMFPolygon`, MFPolygon);
//# sourceMappingURL=MFPolygon.js.map