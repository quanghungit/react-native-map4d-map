import { requireNativeComponent, UIManager, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-map4d-map' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const ComponentName = 'Map4dMapView';
export const Map4dMapView = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
//# sourceMappingURL=Map4dMapView.js.map