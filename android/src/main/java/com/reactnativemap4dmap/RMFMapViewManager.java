package com.reactnativemap4dmap;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.bridge.*;
import com.facebook.react.uimanager.annotations.*;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;
import java.util.HashMap;

import androidx.annotation.Nullable;
import android.view.View;
import android.content.Context;

public class RMFMapViewManager extends ViewGroupManager<RMFMapView> {
    private static final int k_animateCamera = 1;
    private static final int k_moveCamera = 2;
    private static final int k_enable3DMode = 3;
    private static final int k_setMyLocationEnabled = 4;
    private static final int k_setShowsMyLocationButton = 5;
    private static final int k_setTime = 6;
    private static final int k_fitBounds = 7;
    private static final int k_setPOIsEnabled = 8;
    private static final int k_setZoomGesturesEnabled = 9;
    private static final int k_setScrollGesturesEnabled = 10;
    private static final int k_setRotateGesturesEnabled = 11;
    private static final int k_setTiltGesturesEnabled = 12;
    private static final int k_setAllGesturesEnabled = 13;

    private ThemedReactContext reactContext;
    private final ReactApplicationContext appContext;

    public RMFMapViewManager(ReactApplicationContext context) {
      this.appContext = context;
    }

    @Override
    public String getName() {
        return "RMFMapView";
    }

    @Override
    protected RMFMapView createViewInstance(ThemedReactContext context) {
        this.reactContext = context;
        return new RMFMapView(context, this.appContext, this);
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
      Map<String, Map<String, String>> map = MapBuilder.of(
        "onMapReady", MapBuilder.of("registrationName", "onMapReady"),
        "onMarkerDrag", MapBuilder.of("registrationName", "onMarkerDrag"),
        "onMarkerPress", MapBuilder.of("registrationName", "onMarkerPress"),
        "onModeChange", MapBuilder.of("registrationName", "onModeChange"),
        "onCameraMoveStart", MapBuilder.of("registrationName", "onCameraMoveStart"),
        "onCameraMove", MapBuilder.of("registrationName", "onCameraMove"),
        "onCameraIdle", MapBuilder.of("registrationName", "onCameraIdle")
      );
      map.putAll(MapBuilder.of(
        "onMyLocationButtonPress", MapBuilder.of("registrationName", "onMyLocationButtonPress"),
        "onPress", MapBuilder.of("registrationName", "onPress"),
        "onShouldChangeMapMode", MapBuilder.of("registrationName", "onShouldChangeMapMode"),
        "onPoiPress", MapBuilder.of("registrationName", "onPoiPress"),
        "onBuildingPress", MapBuilder.of("registrationName", "onBuildingPress"),
        "onPlacePress", MapBuilder.of("registrationName", "onPlacePress"),
        "onReachLimitedZoom", MapBuilder.of("registrationName", "onReachLimitedZoom")
      ));
      return map;
    }

    @Nullable
  @Override
  public Map<String, Integer> getCommandsMap() {
    HashMap<String, Integer> map = new HashMap();
    map.put("animateCamera", k_animateCamera);
    map.put("moveCamera", k_moveCamera);
    map.put("enable3DMode", k_enable3DMode);
    map.put("setMyLocationEnabled", k_setMyLocationEnabled);
    map.put("showsMyLocationButton", k_setShowsMyLocationButton);
    map.put("setPOIsEnabled", k_setPOIsEnabled);
    map.put("setTime", k_setTime);
    map.put("fitBounds", k_fitBounds);
    map.put("setZoomGesturesEnabled", k_setZoomGesturesEnabled);
    map.put("setScrollGesturesEnabled", k_setScrollGesturesEnabled);
    map.put("setRotateGesturesEnabled", k_setRotateGesturesEnabled);
    map.put("setTiltGesturesEnabled", k_setTiltGesturesEnabled);
    map.put("setAllGesturesEnabled", k_setAllGesturesEnabled);
    return map;
  }

  @Override
  public void receiveCommand(RMFMapView view, int commandId, @Nullable ReadableArray args) {
    ReadableMap map;
    switch (commandId) {
      case k_animateCamera:
        map = args.getMap(0);
        view.animateCamera(map);
        break;
      case k_moveCamera:
        map = args.getMap(0);
        view.moveCamera(map);
        break;
      case k_enable3DMode:
        view.enable3DMode(args.getBoolean(0));
        break;
      case k_setMyLocationEnabled:
        view.setMyLocationEnabled(args.getBoolean(0));
        break;
      case k_setShowsMyLocationButton:
        view.setShowsMyLocationButton(args.getBoolean(0));
        break;
      case k_setTime:
        view.setTime(args.getDouble(0));
        break;
      case k_fitBounds:
        view.fitBounds(args.getMap(0));
        break;
      case k_setPOIsEnabled:
        view.setPOIsEnabled(args.getBoolean(0));
        break;
      case k_setZoomGesturesEnabled:
        view.setZoomGesturesEnabled(args.getBoolean(0));
        break;
      case k_setScrollGesturesEnabled:
        view.setScrollGesturesEnabled(args.getBoolean(0));
        break;
      case k_setRotateGesturesEnabled:
        view.setRotateGesturesEnabled(args.getBoolean(0));
        break;
      case k_setTiltGesturesEnabled:
        view.setTiltGesturesEnabled(args.getBoolean(0));
        break;
      case k_setAllGesturesEnabled:
        view.setAllGesturesEnabled(args.getBoolean(0));
        break;
    }
  }

  @Override
  public void addView(RMFMapView parent, View child, int index) {
    parent.addFeature(child, index);
  }

  @Override
  public int getChildCount(RMFMapView view) {
    return view.getFeatureCount();
  }

  @Override
  public View getChildAt(RMFMapView view, int index) {
    return view.getFeatureAt(index);
  }

  @Override
  public void removeViewAt(RMFMapView parent, int index) {
    parent.removeFeatureAt(index);
  }

  void pushEvent(Context context1, View view, String name, WritableMap data) {
    reactContext.getJSModule(RCTEventEmitter.class)
        .receiveEvent(view.getId(), name, data);
  }

  @Override
  public void onDropViewInstance(RMFMapView view) {
    view.doDestroy();
    super.onDropViewInstance(view);
  }

  @ReactProp(name = "showsMyLocationButton", defaultBoolean = true)
  public void setShowsMyLocationButton(RMFMapView view, boolean showMyLocationButton) {
    view.setShowsMyLocationButton(showMyLocationButton);
  }

  @ReactProp(name = "showsMyLocation", defaultBoolean = true)
  public void setShowsMyLocation(RMFMapView view, boolean showsMyLocation) {
    view.setMyLocationEnabled(showsMyLocation);
  }

  @ReactProp(name = "camera")
  public void setCamera(RMFMapView view, ReadableMap camera) {
    view.moveCamera(camera);
  }

  @ReactProp(name = "showsBuildings", defaultBoolean = true)
  public void setBuildingsEnabled(RMFMapView view, boolean buildingsEnable) {
    view.setBuildingsEnabled(buildingsEnable);
  }

  @ReactProp(name = "showsPOIs", defaultBoolean = true)
  public void setPOIsEnabled(RMFMapView view, boolean enable) {
    view.setPOIsEnabled(enable);
  }

  @ReactProp(name = "mapType")
  public void setMapType(RMFMapView view, String mapType) {
    view.setMapType(mapType);
  }

  @ReactProp(name = "zoomGesturesEnabled", defaultBoolean = true)
  public void setZoomGesturesEnabled(RMFMapView view, boolean enable) {
    view.setZoomGesturesEnabled(enable);
  }

  @ReactProp(name = "scrollGesturesEnabled", defaultBoolean = true)
  public void setScrollGesturesEnabled(RMFMapView view, boolean enable) {
    view.setScrollGesturesEnabled(enable);
  }

  @ReactProp(name = "rotateGesturesEnabled", defaultBoolean = true)
  public void setRotateGesturesEnabled(RMFMapView view, boolean enable) {
    view.setRotateGesturesEnabled(enable);
  }

  @ReactProp(name = "tiltGesturesEnabled", defaultBoolean = true)
  public void setTiltGesturesEnabled(RMFMapView view, boolean enable) {
    view.setTiltGesturesEnabled(enable);
  }
}
