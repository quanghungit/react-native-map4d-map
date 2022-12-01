"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFGroundOverlay = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = _reactNative.ViewPropTypes || _reactNative.View.propTypes;
const propTypes = { ...viewPropTypes,

  /**
   * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
   * For example, https://tile.openstreetmap.de/{z}/{x}/{y}.png
   */
  urlTemplate: _propTypes.default.string.isRequired,

  /**
   * A region will be display ground overlay.
   */
  bounds: _propTypes.default.shape({
    northEast: _propTypes.default.shape({
      latitude: _propTypes.default.number.isRequired,
      longitude: _propTypes.default.number.isRequired
    }).isRequired,
    southWest: _propTypes.default.shape({
      latitude: _propTypes.default.number.isRequired,
      longitude: _propTypes.default.number.isRequired
    }).isRequired
  }),

  /**
   * If `true` the ground overlay will override base map. All object of base map at this
   * position will not display. The default value is false. 
   */
  override: _propTypes.default.bool,

  /**
   * visible
   */
  visible: _propTypes.default.bool,

  /**
   * The order in which this ground overlay is drawn with respect to other overlays. An overlay
   * with a larger z-index is drawn over overlays with smaller z-indices. The order of overlays
   * with the same z-index is arbitrary. The default zIndex is 0.
   */
  zIndex: _propTypes.default.number
};

class MFGroundOverlay extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(RMFGroundOverlay, this.props);
  }

}

exports.MFGroundOverlay = MFGroundOverlay;
MFGroundOverlay.propTypes = propTypes;
var RMFGroundOverlay = (0, _reactNative.requireNativeComponent)(`RMFGroundOverlay`, MFGroundOverlay);
//# sourceMappingURL=MFGroundOverlay.js.map