"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MFTileOverlay = void 0;

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
   * visible
   */
  visible: _propTypes.default.bool,

  /**
   * The order in which this tile overlay is drawn with respect to other overlays. An overlay
   * with a larger z-index is drawn over overlays with smaller z-indices. The order of overlays
   * with the same z-index is arbitrary. The default zIndex is 0.
   */
  zIndex: _propTypes.default.number
};

class MFTileOverlay extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(RMFTileOverlay, this.props);
  }

}

exports.MFTileOverlay = MFTileOverlay;
MFTileOverlay.propTypes = propTypes;
var RMFTileOverlay = (0, _reactNative.requireNativeComponent)(`RMFTileOverlay`, MFTileOverlay);
//# sourceMappingURL=MFTileOverlay.js.map