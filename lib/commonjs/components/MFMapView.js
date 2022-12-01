"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFMapView = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const CameraShape = _propTypes.default.shape({
  target: _propTypes.default.shape({
    latitude: _propTypes.default.number.isRequired,
    longitude: _propTypes.default.number.isRequired
  }),
  zoom: _propTypes.default.number.isRequired,
  bearing: _propTypes.default.number.isRequired,
  tilt: _propTypes.default.number.isRequired
}); // if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)


const viewPropTypes = _reactNative.ViewPropTypes || View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
   * If `false` hide the button to move map to the current user's location.
   * Default value is `false`.
   */
  showsMyLocationButton: _propTypes.default.bool,

  /**
   * If `true` the app will ask for the user's location.
   * Default value is `false`.
   */
  showsMyLocation: _propTypes.default.bool,

  /**
   * A Boolean indicating whether the map displays buildings.
   * Default value is `true`.
   */
  showsBuildings: _propTypes.default.bool,

  /**
   * A Boolean indicating whether the map displays POIs.
   * Default value is `true`.
   */
  showsPOIs: _propTypes.default.bool,

  /**
   * If `false` the user won't be able to zoom the map.
   * Default value is `true`.
   */
  zoomGesturesEnabled: _propTypes.default.bool,

  /**
   * If `false` the user won't be able to scroll the map.
   * Default value is `true`.
   */
  scrollGesturesEnabled: _propTypes.default.bool,

  /**
   * If `false` the user won't be able to pinch/rotate the map.
   * Default value is `true`.
   */
  rotateGesturesEnabled: _propTypes.default.bool,

  /**
   * If `false` the user won't be able to tilt the map.
   * Default value is `true`.
   */
  tiltGesturesEnabled: _propTypes.default.bool,

  /**
   * The camera view position.
   */
  camera: CameraShape,

  /**
   * Type of map tiles to be rendered.
   */
  mapType: _propTypes.default.oneOf(['roadmap', 'raster', 'satellite', 'map3d']),

  /**
   * Callback that is called once the map is fully loaded.
   * @platform android
   */
  onMapReady: _propTypes.default.func,

  /**
   * Callback that is called when user taps on the map.
   */
  onPress: _propTypes.default.func,

  /**
   * Callback that is called when user taps on the POIs
   */
  onPoiPress: _propTypes.default.func,

  /**
   * Callback that is called when user taps on the Buildings
   */
  onBuildingPress: _propTypes.default.func,

  /**
   * Callback that is called when user taps on the Places
   */
  onPlacePress: _propTypes.default.func,

  /**
   * @deprecated This prop is no longer support, which is subject to removal in a future versions.
   */
  onModeChange: _propTypes.default.func,

  /**
   * Callback that is called when moving camera
   */
  onCameraMove: _propTypes.default.func,

  /**
   * Callback that is called when camera start moving
   */
  onCameraMoveStart: _propTypes.default.func,

  /**
   * Callback that is called when camera idle
   */
  onCameraIdle: _propTypes.default.func,

  /**
   * Callback that is called when user taps on location Button
   */
  onMyLocationButtonPress: _propTypes.default.func,

  /**
   * @deprecated This prop is no longer support, which is subject to removal in a future versions.
   */
  onShouldChangeMapMode: _propTypes.default.func,

  /**
   * Callback that is called when user zoom in/out reach limited zoom (min/max zoom or zoom at 17 on 3D)
   */
  onReachLimitedZoom: _propTypes.default.func
};

class MFMapView extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: _reactNative.Platform.OS === 'ios'
    };
    this._onMapReady = this._onMapReady.bind(this);
    this._ref = this._ref.bind(this);
  }

  _onMapReady() {
    const {
      onMapReady
    } = this.props;
    this.setState({
      isReady: true
    }, () => {
      if (onMapReady) {
        onMapReady();
      }
    });
  }

  _ref(ref) {
    this.map = ref;
  }

  getCamera() {
    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.NativeModules.Map4dMap.getCamera(this._getHandle());
    } else if (_reactNative.Platform.OS === 'ios') {
      return this._runCommand('getCamera', []);
    }

    return Promise.reject('Function not supported on this platform');
  }

  getBounds() {
    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.NativeModules.Map4dMap.getBounds(this._getHandle());
    } else if (_reactNative.Platform.OS === 'ios') {
      return this._runCommand('getBounds', []);
    }

    return Promise.reject('Function not supported on this platform');
  }

  getMyLocation() {
    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.NativeModules.Map4dMap.getMyLocation(this._getHandle());
    } else if (_reactNative.Platform.OS === 'ios') {
      return this._runCommand('getMyLocation', []);
    }

    return Promise.reject('Function not supported on this platform');
  }

  animateCamera(camera) {
    this._runCommand('animateCamera', [camera]);
  }

  moveCamera(camera) {
    this._runCommand('moveCamera', [camera]);
  }

  enable3DMode(enable) {
    console.warn("This method was intended to set map type map 3D. It has been superseded by 'mapType' property. This method is subject to removal in a future versions.");

    this._runCommand('enable3DMode', [enable]);
  }

  is3DMode() {
    console.warn("This type of mode checking is not recommended. It is recommended that the 'mapType' property be used instead. This method is subject to removal in a future versions.");

    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.NativeModules.Map4dMap.is3DMode(this._getHandle());
    } else if (_reactNative.Platform.OS === 'ios') {
      return this._runCommand('is3DMode', []);
    }

    return Promise.reject('Function not supported on this platform');
  }

  setMyLocationEnabled(enable) {
    this._runCommand('setMyLocationEnabled', [enable]);
  }

  showsMyLocationButton(enable) {
    this._runCommand('showsMyLocationButton', [enable]);
  }

  setPOIsEnabled(enable) {
    this._runCommand('setPOIsEnabled', [enable]);
  }

  setZoomGesturesEnabled(enable) {
    this._runCommand('setZoomGesturesEnabled', [enable]);
  }

  setScrollGesturesEnabled(enable) {
    this._runCommand('setScrollGesturesEnabled', [enable]);
  }

  setRotateGesturesEnabled(enable) {
    this._runCommand('setRotateGesturesEnabled', [enable]);
  }

  setTiltGesturesEnabled(enable) {
    this._runCommand('setTiltGesturesEnabled', [enable]);
  }

  setAllGesturesEnabled(enable) {
    this._runCommand('setAllGesturesEnabled', [enable]);
  }

  setTime(time) {
    let t = Date.parse(time);

    if (isNaN(t)) {
      console.log('time invalid');
    } else {
      this._runCommand('setTime', [t]);
    }
  }

  fitBounds(boundsData) {
    this._runCommand("fitBounds", [boundsData]);
  }

  cameraForBounds(boundsData) {
    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.NativeModules.Map4dMap.cameraForBounds(this._getHandle(), boundsData);
    } else if (_reactNative.Platform.OS === 'ios') {
      return this._runCommand('cameraForBounds', [boundsData]);
    }

    return Promise.reject('cameraForBounds not supported on this platform');
  }
  /**
   * Convert a map coordinate to screen point
   *
   * @param coordinate Coordinate
   * @param [coordinate.latitude] Latitude
   * @param [coordinate.longitude] Longitude
   *
   * @return Promise Promise with the point ({ x: Number, y: Number })
   */


  pointForCoordinate(coordinate) {
    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.NativeModules.Map4dMap.pointForCoordinate(this._getHandle(), coordinate);
    } else if (_reactNative.Platform.OS === 'ios') {
      return this._runCommand('pointForCoordinate', [coordinate]);
    }

    return Promise.reject('pointForCoordinate not supported on this platform');
  }
  /**
   * Convert a screen point to a map coordinate
   *
   * @param point Point
   * @param [point.x] X
   * @param [point.x] Y
   *
   * @return Promise Promise with the coordinate ({ latitude: Number, longitude: Number })
   */


  coordinateForPoint(point) {
    if (_reactNative.Platform.OS === 'android') {
      return _reactNative.NativeModules.Map4dMap.coordinateForPoint(this._getHandle(), point);
    } else if (_reactNative.Platform.OS === 'ios') {
      return this._runCommand('coordinateForPoint', [point]);
    }

    return Promise.reject('coordinateForPoint not supported on this platform');
  }

  _getHandle() {
    return (0, _reactNative.findNodeHandle)(this.map);
  }

  _runCommand(name, args) {
    switch (_reactNative.Platform.OS) {
      case 'android':
        return _reactNative.NativeModules.UIManager.dispatchViewManagerCommand(this._getHandle(), this._uiManagerCommand(name), args);

      case 'ios':
        return this._mapManagerCommand(name)(this._getHandle(), ...args);

      default:
        return Promise.reject(`Invalid platform was passed: ${_reactNative.Platform.OS}`);
    }
  }

  _uiManagerCommand(name) {
    const UIManager = _reactNative.NativeModules.UIManager;
    const componentName = "RMFMapView";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    } // RN >= 0.58        


    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return _reactNative.NativeModules[`RMFMapView`][name];
  }

  render() {
    let props;

    if (this.state.isReady) {
      props = {
        style: this.props.style,
        onMapReady: this._onMapReady,
        ...this.props
      };
    } else {
      props = {
        style: this.props.style,
        onMapReady: this._onMapReady
      };
    }

    return /*#__PURE__*/_react.default.createElement(RMFMapView, _extends({}, props, {
      ref: this._ref
    }));
  }

}

exports.MFMapView = MFMapView;
MFMapView.propTypes = propTypes;
var RMFMapView = (0, _reactNative.requireNativeComponent)(`RMFMapView`, MFMapView);
//# sourceMappingURL=MFMapView.js.map