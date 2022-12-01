import React from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  Platform,
  NativeModules, 
  findNodeHandle,
  processColor
} from 'react-native';
import { ViewPropTypes, ColorPropType } from "deprecated-react-native-prop-types"
// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = ViewPropTypes || View.propTypes;

const propTypes = {
  ...viewPropTypes,

  /**
   * An array of coordinates to describe the polygon
   */
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Latitude/Longitude coordinates
       */
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    })
  ),

  /**
   * An array of array of coordinates to describe the polygon holes
   */
  holes: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Latitude/Longitude coordinates
         */
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
      })
    )
  ),

  /**
   * The color to use for the polygon.
   */
  fillColor: ColorPropType,

  /**
   * The color to use for the polygon stroke.
   */
  strokeColor: ColorPropType,

  /**
   * The stroke width to use for the polygon.
   */
  strokeWidth: PropTypes.number,

  /**
   * zIndex
   */
  zIndex: PropTypes.number,

  /**
   * visible
   */
  visible: PropTypes.bool,

  /**
   * userData
   */
  userData:PropTypes.object,

  /**
   * Callback that is called when the user presses on the polygon
   */
  onPress: PropTypes.func,
};


class MFPolygon extends React.Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this)
    this._ref = this._ref.bind(this)
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
    this._runCommand("setCoordinates", [coordinates])
  }

  setHoles(holes) {
    this._runCommand("setHoles", [holes])
  }

  setFillColor(color) {
    this._runCommand("setFillColor", [processColor(color)])
  }

  setStrokeColor(color) {
    this._runCommand("setStrokeColor", [processColor(color)])
  }

  setStrokeWidth(width) {
    this._runCommand("setStrokeWidth", [width])
  }

  setVisible(visible) {
    this._runCommand("setVisible", [visible])
  }

  setZIndex(zIndex) {
    this._runCommand("setZIndex", [touchable])
  }

  setUserData(userData) {
    this._runCommand("setUserData", [userData])
  }

  _getHandle() {
    return findNodeHandle(this.polygon);
  }

  _runCommand(name, args) {
    switch (Platform.OS) {
      case 'android':
        NativeModules.UIManager.dispatchViewManagerCommand(
          this._getHandle(),
          this._uiManagerCommand(name),
          args
        );
        break;

      case 'ios':
        this._mapManagerCommand(name)(this._getHandle(), ...args);
        break;

      default:
        break;
    }
  }

  _uiManagerCommand(name) {
    const UIManager = NativeModules.UIManager;
    const componentName = "RMFPolygon";

    if (!UIManager.getViewManagerConfig) {
      // RN < 0.58
      return UIManager[componentName].Commands[name];
    }

    // RN >= 0.58        
    return UIManager.getViewManagerConfig(componentName).Commands[name];
  }

  _mapManagerCommand(name) {
    return NativeModules[`RMFPolygon`][name];
  }

  render() {
    return <RMFPolygon
      {...this.props}
      ref={this._ref}
      onPress={this._onPress}
    />;
  }
}

MFPolygon.propTypes = propTypes;

var RMFPolygon = requireNativeComponent(`RMFPolygon`, MFPolygon);

export { MFPolygon }
