"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFDirectionsRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
   * The directions to display on the map,
   * retrieved as an array of array of coordinates to describe the routes.
   * Similar to directions prop but has higher priority
   */
  routes: _propTypes.default.arrayOf(_propTypes.default.arrayOf(_propTypes.default.shape({
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  }))),

  /**
   * The directions to display on the map,
   * retrieved as a json string from Get route Map4D API (/sdk/route).
   * Similar to routes prop but with lower priority
   */
  directions: _propTypes.default.string,

  /**
   * The index of the main route, default value is 0.
   */
  activedIndex: _propTypes.default.number,

  /**
   * The active route stroke width.
   */
  activeStrokeWidth: _propTypes.default.number,

  /**
   * The active route color.
   */
  activeStrokeColor: _reactNative.ColorPropType,

  /**
   * The active route outline stroke width.
   */
  activeOutlineWidth: _propTypes.default.number,

  /**
   * The active route outline color.
   */
  activeOutlineColor: _reactNative.ColorPropType,

  /**
   * The inactive route stroke width.
   */
  inactiveStrokeWidth: _propTypes.default.number,

  /**
   * The inactive route color.
   */
  inactiveStrokeColor: _reactNative.ColorPropType,

  /**
   * The inactive route outline stroke width.
   */
  inactiveOutlineWidth: _propTypes.default.number,

  /**
   * The inactive route outline color.
   */
  inactiveOutlineColor: _reactNative.ColorPropType,

  /**
   * The options of the origin POI.
   */
  originPOIOptions: _propTypes.default.shape({
    coordinate: _propTypes.default.shape({
      latitude: _propTypes.default.number.isRequired,
      longitude: _propTypes.default.number.isRequired
    }),
    icon: _propTypes.default.shape({
      uri: _propTypes.default.any.isRequired
    }),
    title: _propTypes.default.string,
    titleColor: _reactNative.ColorPropType,
    visible: _propTypes.default.bool
  }),

  /**
   * The options of the destination POI.
   */
  destinationPOIOptions: _propTypes.default.shape({
    coordinate: _propTypes.default.shape({
      latitude: _propTypes.default.number.isRequired,
      longitude: _propTypes.default.number.isRequired
    }),
    icon: _propTypes.default.shape({
      uri: _propTypes.default.any.isRequired
    }),
    title: _propTypes.default.string,
    titleColor: _reactNative.ColorPropType,
    visible: _propTypes.default.bool
  }),

  /**
   * Callback that is called when the user presses on the routes.
   */
  onPress: _propTypes.default.func
};

class MFDirectionsRenderer extends _react.default.Component {
  constructor(props) {
    super(props);
    this._ref = this._ref.bind(this);
    this._onPress = this._onPress.bind(this);
  }

  setActivedIndex(index) {
    this._runCommand("setActivedIndex", [index]);
  }

  setRoutes(routes) {
    this._runCommand("setRoutes", [routes]);
  }

  setDirections(directions) {
    this._runCommand("setDirections", [directions]);
  }

  render() {
    let originPOIOptions = this.props.originPOIOptions;

    if (originPOIOptions) {
      if (originPOIOptions.titleColor) {
        originPOIOptions.titleColor = (0, _reactNative.processColor)(originPOIOptions.titleColor);
      }

      if (originPOIOptions.icon) {
        let uri = _reactNative.Image.resolveAssetSource(originPOIOptions.icon.uri) || {
          uri: originPOIOptions.icon.uri
        };
        originPOIOptions.icon = {
          uri: uri.uri
        };
      }
    }

    let destinationPOIOptions = this.props.destinationPOIOptions;

    if (destinationPOIOptions) {
      if (destinationPOIOptions.titleColor) {
        destinationPOIOptions.titleColor = (0, _reactNative.processColor)(destinationPOIOptions.titleColor);
      }

      if (destinationPOIOptions.icon) {
        let uri = _reactNative.Image.resolveAssetSource(destinationPOIOptions.icon.uri) || {
          uri: destinationPOIOptions.icon.uri
        };
        destinationPOIOptions.icon = {
          uri: uri.uri
        };
      }
    }

    return /*#__PURE__*/_react.default.createElement(RMFDirectionsRenderer, _extends({}, this.props, {
      originPOIOptions: originPOIOptions,
      destinationPOIOptions: destinationPOIOptions,
      ref: this._ref,
      onPress: this._onPress
    }));
  }

  _ref(ref) {
    this.renderer = ref;
  }

  _onPress(event) {
    event.stopPropagation();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
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

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.renderer);
  }

  _uiManagerCommand(name) {
    const UIManager = _reactNative.NativeModules.UIManager;
    const componentName = "RMFDirectionsRenderer";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFDirectionsRenderer`][name];
  }

}

exports.MFDirectionsRenderer = MFDirectionsRenderer;
MFDirectionsRenderer.propTypes = propTypes;
var RMFDirectionsRenderer = (0, _reactNative.requireNativeComponent)(`RMFDirectionsRenderer`, MFDirectionsRenderer);
//# sourceMappingURL=MFDirectionsRenderer.js.map