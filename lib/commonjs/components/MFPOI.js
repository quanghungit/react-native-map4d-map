"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFPOI = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
  * The coordinate for the POI.
  */
  coordinate: _propTypes.default.shape({
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  }).isRequired,

  /**
   * The title of the POI.
   */
  title: _propTypes.default.string,

  /**
   * The color of the title.
   */
  titleColor: _reactNative.ColorPropType,

  /**
   * The subtile of the POI.
   */
  subtitle: _propTypes.default.string,

  /**
   * The type of POI
   */
  //poiType: PropTypes.oneOf(['cafe', 'atm', 'bank']),
  poiType: _propTypes.default.string,

  /**
   * POI icon to render.
   */
  icon: _propTypes.default.shape({
    uri: _propTypes.default.any.isRequired
  }),

  /**
   * zIndex
   */
  zIndex: _propTypes.default.number,

  /**
   * visible
   */
  //TODO
  // visible: PropTypes.bool,

  /**
   * userData
   */
  userData: _propTypes.default.object,

  /**
   * Callback that is called when the user presses on the POI
   */
  onPress: _propTypes.default.func
};

class MFPOI extends _react.default.Component {
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
    this.poi = ref;
  }

  setCoordinate(coordinate) {
    this._runCommand("setCoordinate", [coordinate]);
  }

  setTitle(title) {
    this._runCommand("setTitle", [title]);
  }

  setTitleColor(color) {
    this._runCommand("setTitleColor", [(0, _reactNative.processColor)(color)]);
  }

  setSubTitle(subtitle) {
    this._runCommand("setSubTitle", [subtitle]);
  }

  setPoiType(type) {
    this._runCommand("setPoiType", [type]);
  }

  setIcon(icon) {
    let uri = _reactNative.Image.resolveAssetSource(icon.uri) || {
      uri: icon.uri
    };

    this._runCommand("setIcon", [{
      uri: uri.uri
    }]);
  }

  setZIndex(zIndex) {
    this._runCommand("setZIndex", [zIndex]);
  } // setVisible(visible) {
  //   this._runCommand("setVisible", [visible])
  // }


  setUserData(userData) {
    this._runCommand("setUserData", [userData]);
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.poi);
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
    const componentName = "RMFPOI";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFPOI`][name];
  }

  render() {
    let icon = {};

    if (this.props.icon) {
      let uri = _reactNative.Image.resolveAssetSource(this.props.icon.uri) || {
        uri: this.props.icon.uri
      };
      icon = {
        uri: uri.uri
      };
    }

    return /*#__PURE__*/_react.default.createElement(RMFPOI, _extends({}, this.props, {
      icon: icon,
      ref: this._ref,
      onPress: this._onPress
    }));
  }

}

exports.MFPOI = MFPOI;
MFPOI.propTypes = propTypes;
var RMFPOI = (0, _reactNative.requireNativeComponent)(`RMFPOI`, MFPOI);
//# sourceMappingURL=MFPOI.js.map