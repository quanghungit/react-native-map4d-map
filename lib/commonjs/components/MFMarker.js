"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFMarker = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
   * The coordinate for the marker.
   */
  coordinate: _propTypes.default.shape({
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  }).isRequired,

  /**
   * Default value is `false`
   */
  draggable: _propTypes.default.bool,

  /**
   * Sets the ground anchor point for the marker.
   */
  anchor: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  }),

  /**
   * 
   */
  elevation: _propTypes.default.number,

  /**
   * 
   */
  rotation: _propTypes.default.number,

  /**
   * Sets the infor window anchor point for the marker.
   */
  infoWindowAnchor: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  }),

  /**
   * The title of the marker.
   */
  title: _propTypes.default.string,

  /**
   * The snippet of the marker.
   */
  snippet: _propTypes.default.string,

  /**
   * Marker icon to render.
   */
  icon: _propTypes.default.shape({
    uri: _propTypes.default.any.isRequired,
    width: _propTypes.default.number.isRequired,
    height: _propTypes.default.number.isRequired
  }),

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
   * Callback that is called when the user presses on the marker
   */
  onPress: _propTypes.default.func,

  /**
   * Callback that is called when the user presses on the info window
   */
  onPressInfoWindow: _propTypes.default.func,

  /**
   * Callback that is called when the user initiates a drag on this marker (if it is draggable)
   */
  onDragStart: _propTypes.default.func,

  /**
   * Callback called continuously as the marker is dragged
   */
  onDrag: _propTypes.default.func,

  /**
   * Callback that is called when a drag on this marker finishes. This is usually the point you
   * will want to setState on the marker's coordinate again
   */
  onDragEnd: _propTypes.default.func
};

class MFMarker extends _react.default.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._ref = this._ref.bind(this);
  }

  setCoordinate(location) {
    this._runCommand("setCoordinate", [location]);
  }

  setRotation(rotation) {
    this._runCommand("setRotation", [rotation]);
  }

  setTitle(title) {
    this._runCommand("setTitle", [title]);
  }

  setSnippet(snippet) {
    this._runCommand("setSnippet", [snippet]);
  }

  setDraggable(draggable) {
    this._runCommand("setDraggable", [draggable]);
  }

  setZIndex(zIndex) {
    this._runCommand("setZIndex", [zIndex]);
  }

  setVisible(visible) {
    this._runCommand("setVisible", [visible]);
  }

  setInfoWindowAnchor(anchor) {
    this._runCommand("setInfoWindowAnchor", [anchor]);
  }

  setElevation(elevation) {
    this._runCommand("setElevation", [elevation]);
  }

  setUserData(userData) {
    this._runCommand("setUserData", [userData]);
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.marker);
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
    const componentName = "RMFMarker";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFMarker`][name];
  }

  _onPress(event) {
    event.stopPropagation();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }

  _ref(ref) {
    this.marker = ref;
  }

  render() {
    let icon = {};

    if (this.props.icon) {
      let uri = _reactNative.Image.resolveAssetSource(this.props.icon.uri) || {
        uri: this.props.icon.uri
      };
      icon = {
        uri: uri.uri,
        width: this.props.icon.width,
        height: this.props.icon.height
      };
    }

    return /*#__PURE__*/_react.default.createElement(RMFMarker, _extends({}, this.props, {
      icon: icon,
      ref: this._ref,
      style: [styles.marker, this.props.style],
      onPress: this._onPress
    }));
  }

}

exports.MFMarker = MFMarker;
MFMarker.propTypes = propTypes;
var RMFMarker = (0, _reactNative.requireNativeComponent)(`RMFMarker`, MFMarker);

const styles = _reactNative.StyleSheet.create({
  marker: {
    position: 'absolute'
  }
});
//# sourceMappingURL=MFMarker.js.map