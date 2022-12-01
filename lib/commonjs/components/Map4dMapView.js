"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Map4dMapView = void 0;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-map4d-map' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const ComponentName = 'Map4dMapView';
const Map4dMapView = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
exports.Map4dMapView = Map4dMapView;
//# sourceMappingURL=Map4dMapView.js.map