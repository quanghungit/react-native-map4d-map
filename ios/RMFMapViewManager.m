//
//  RMFMapViewManager.m
//  Map4dMap
//
//  Created by Huy Dang on 4/27/20.
//  Copyright © 2020 IOTLink. All rights reserved.
//

#import "RMFMapViewManager.h"
#import "RMFMapView.h"
#import "RMFMarker.h"
#import "RMFCircle.h"
#import "RMFPolyline.h"
#import "RMFPolygon.h"
#import "RMFPOI.h"
#import "RMFDirectionsRenderer.h"
#import <Foundation/Foundation.h>
#import <React/RCTLog.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTConvert+CoreLocation.h>
#import "RCTConvert+Map4dMap.h"
#import "RMFEventResponse.h"
#import "Clustering/MFClusterItemImpl.h"

@interface RMFMapViewManager () <MFMapViewDelegate>

@end

@implementation RMFMapViewManager

RCT_EXPORT_MODULE(RMFMapView)

- (UIView *)view {
  RMFMapView * rMap = [[RMFMapView alloc] initWithFrame:CGRectMake(0, 0, 200, 200)];
//  RMFMapView * rMap = [[RMFMapView alloc] init];
//  [rMap setMyLocationEnabled:true];
  rMap.delegate = self;
  return rMap;
}

RCT_EXPORT_VIEW_PROPERTY(onMapReady, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onMapLoaded, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onKmlReady, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onLongPress, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onPanDrag, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onUserLocationChange, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onMarkerPress, RCTDirectEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTDirectEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onRegionChangeComplete, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPoiPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBuildingPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlacePress, RCTDirectEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onIndoorLevelActivated, RCTDirectEventBlock)
//RCT_EXPORT_VIEW_PROPERTY(onIndoorBuildingFocused, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraIdle, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraMove, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onCameraMoveStart, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMyLocationButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onReachLimitedZoom, RCTDirectEventBlock)

RCT_REMAP_VIEW_PROPERTY(camera, cameraProp, MFCameraPosition)
RCT_REMAP_VIEW_PROPERTY(mapType, mapTypeProp, NSString)
RCT_EXPORT_VIEW_PROPERTY(showsBuildings, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsPOIs, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsMyLocation, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsMyLocationButton, BOOL)

RCT_EXPORT_VIEW_PROPERTY(zoomGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(rotateGesturesEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(tiltGesturesEnabled, BOOL)


RCT_EXPORT_METHOD(getCamera:(nonnull NSNumber *)reactTag
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      reject(@"Invalid argument", [NSString stringWithFormat:@"Invalid view returned from registry, expecting RMFMapView, got: %@", view], NULL);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      MFCameraPosition *camera = [mapView camera];
      resolve([RMFEventResponse fromCameraPosition:camera]);
    }
  }];
}

RCT_EXPORT_METHOD(getBounds:(nonnull NSNumber *)reactTag
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      reject(@"Invalid argument", [NSString stringWithFormat:@"Invalid view returned from registry, expecting RMFMapView, got: %@", view], NULL);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      MFCoordinateBounds* bounds = [mapView getBounds];
      resolve([RMFEventResponse fromCoordinateBounds:bounds]);
    }
  }];
}

RCT_EXPORT_METHOD(cameraForBounds:(nonnull NSNumber *)reactTag
                  withData:(id)json
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      reject(@"Invalid argument", [NSString stringWithFormat:@"Invalid view returned from registry, expecting RMFMapView, got: %@", view], NULL);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      MFCameraPosition *camera = nil;
      id data = [RCTConvert NSDictionary:json];
      if (data[@"bounds"]) {
        MFCoordinateBounds* bounds = [RCTConvert MFCoordinateBounds:data[@"bounds"]];
        if (data[@"padding"]) {
          UIEdgeInsets insets = [RCTConvert UIEdgeInsets:data[@"padding"]];
          camera = [mapView cameraForBounds:bounds insets:insets];
        }
        else {
          camera = [mapView cameraForBounds:bounds];
        }
      }
      resolve([RMFEventResponse fromCameraPosition:camera]);
    }
  }];
}

RCT_EXPORT_METHOD(fitBounds:(nonnull NSNumber *)reactTag
                  withData:(id)json)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFMapView, got: %@", view);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      MFCameraPosition* camera = nil;
      id data = [RCTConvert NSDictionary:json];
      if (data[@"bounds"]) {
        MFCoordinateBounds* bounds = [RCTConvert MFCoordinateBounds:data[@"bounds"]];
        if (data[@"padding"]) {
          UIEdgeInsets insets = [RCTConvert UIEdgeInsets:data[@"padding"]];
          camera = [mapView cameraForBounds:bounds insets:insets];
        }
        else {
          camera = [mapView cameraForBounds:bounds];
        }
        [mapView moveCamera:[MFCameraUpdate setCamera:camera]];
      }
    }
  }];
}

RCT_EXPORT_METHOD(pointForCoordinate:(nonnull NSNumber *)reactTag
                  withCoordinate:(id)json
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      reject(@"Invalid argument", [NSString stringWithFormat:@"Invalid view returned from registry, expecting RMFMapView, got: %@", view], NULL);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      CGPoint point = [mapView.projection pointForCoordinate:[RCTConvert CLLocationCoordinate2D:json]];
      resolve([RMFEventResponse fromCGPoint:point]);
    }
  }];
}

RCT_EXPORT_METHOD(coordinateForPoint:(nonnull NSNumber *)reactTag
                  withPoint:(id)json
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      reject(@"Invalid argument", [NSString stringWithFormat:@"Invalid view returned from registry, expecting RMFMapView, got: %@", view], NULL);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      CLLocationCoordinate2D coordinate = [mapView.projection coordinateForPoint:[RCTConvert CGPoint:json]];
      resolve([RMFEventResponse fromCoordinate:coordinate]);
    }
  }];
}

RCT_EXPORT_METHOD(animateCamera:(nonnull NSNumber *)reactTag
                  withCamera:(id)json) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFMapView, got: %@", view);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      [mapView animateCamera:[MFCameraUpdate setCamera:[RCTConvert MFCameraPosition:json withDefaultCamera:mapView.camera]]];
    }
  }];
}

RCT_EXPORT_METHOD(moveCamera:(nonnull NSNumber *)reactTag
                  withCamera:(id)json) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFMapView, got: %@", view);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      [mapView moveCamera:[MFCameraUpdate setCamera:[RCTConvert MFCameraPosition:json withDefaultCamera:mapView.camera]]];
    }
  }];
}


RCT_EXPORT_METHOD(is3DMode:(nonnull NSNumber *)reactTag
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      reject(@"Invalid argument", [NSString stringWithFormat:@"Invalid view returned from registry, expecting RMFMapView, got: %@", view], NULL);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      resolve(@(mapView.mapType == MFMapTypeMap3D));
    }
  }];
  
}

RCT_EXPORT_METHOD(enable3DMode:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      if (enable) {
        mapView.mapType = MFMapTypeMap3D;
      }
      else if (mapView.mapType == MFMapTypeMap3D) {
        mapView.mapType = MFMapTypeRoadmap;
      }
    }
  }];
}

RCT_EXPORT_METHOD(showsMyLocationButton:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {

    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      mapView.settings.myLocationButton = enable;
    }
  }];
}

RCT_EXPORT_METHOD(setMyLocationEnabled:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      [mapView setMyLocationEnabled:enable];
    }
  }];
}

RCT_EXPORT_METHOD(getMyLocation:(nonnull NSNumber *)reactTag
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      reject(@"Invalid argument", [NSString stringWithFormat:@"Invalid view returned from registry, expecting RMFMapView, got: %@", view], NULL);
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      CLLocation *location = [mapView getMyLocation];
      resolve([RMFEventResponse fromCLLocation:location]);
    }
  }];
}

RCT_EXPORT_METHOD(setPOIsEnabled:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      [mapView setPOIsEnabled:enable];
    }
  }];
}

RCT_EXPORT_METHOD(setTime:(nonnull NSNumber *)reactTag
                  withTime:(id)json) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      NSDate * date = [RCTConvert NSDate:json];
      if (date) {
        [mapView setTime:date];
      }
    }
  }];
}


RCT_EXPORT_METHOD(setZoomGesturesEnabled:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      mapView.settings.zoomGestures = enable;
    }
  }];
}

RCT_EXPORT_METHOD(setScrollGesturesEnabled:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      mapView.settings.scrollGestures = enable;
    }
  }];
}

RCT_EXPORT_METHOD(setRotateGesturesEnabled:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      mapView.settings.rotateGestures = enable;
    }
  }];
}

RCT_EXPORT_METHOD(setTiltGesturesEnabled:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      mapView.settings.tiltGestures = enable;
    }
  }];
}

RCT_EXPORT_METHOD(setAllGesturesEnabled:(nonnull NSNumber *)reactTag
                  enable:(BOOL)enable) {
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFMapView class]]) {
      
    } else {
      RMFMapView *mapView = (RMFMapView *)view;
      [mapView.settings setAllGesturesEnabled:enable];
    }
  }];
}


// Delegate
- (BOOL)mapview:(MFMapView *)mapView didTapMarker:(MFMarker *)marker {
  RMFMapView* map = (RMFMapView*)mapView;

  if ([marker.userData conformsToProtocol:@protocol(MFClusterItem)]) {
    MFClusterItemImpl* item = (MFClusterItemImpl*)marker.userData;
    CLLocationCoordinate2D tapLocation = [map.projection coordinateForPoint:map.lastTapPixel];
    [item didTapAtPixel:map.lastTapPixel location:tapLocation];
    return NO;
  }

  RMFMarkerMap4d * rMarker = (RMFMarkerMap4d *) marker;
  [rMarker.reactMarker didTapAtPixel:map.lastTapPixel];
  return NO;
}

- (void)mapview:(MFMapView *)mapView didBeginDraggingMarker:(MFMarker *)marker {
  if ([marker isKindOfClass:[RMFMarkerMap4d class]]) {
    RMFMapView* map = (RMFMapView*)mapView;
    RMFMarkerMap4d * rMarker = (RMFMarkerMap4d *) marker;
    [rMarker.reactMarker didBeginDraggingMarkerAtPixel:map.lastLongPressPixel];
  }
}

- (void)mapview:(MFMapView *)mapView didEndDraggingMarker:(MFMarker *)marker {
  if ([marker isKindOfClass:[RMFMarkerMap4d class]]) {
    RMFMapView* map = (RMFMapView*)mapView;
    RMFMarkerMap4d * rMarker = (RMFMarkerMap4d *) marker;
    [rMarker.reactMarker didEndDraggingMarkerAtPixel:map.lastLongPressPixel];
  }
}

- (void)mapview:(MFMapView *)mapView didDragMarker:(MFMarker *)marker {
  if ([marker isKindOfClass:[RMFMarkerMap4d class]]) {
    RMFMapView* map = (RMFMapView*)mapView;
    RMFMarkerMap4d * rMarker = (RMFMarkerMap4d *) marker;
    [rMarker.reactMarker didDragMarkerAtPixel:map.lastPanPixel];
  }
}

- (void)mapview:(MFMapView *)mapView didTapInfoWindowOfMarker:(MFMarker *)marker {
  RMFMapView* map = (RMFMapView*)mapView;

  if ([marker.userData conformsToProtocol:@protocol(MFClusterItem)]) {
    MFClusterItemImpl* item = (MFClusterItemImpl*)marker.userData;
    CLLocationCoordinate2D tapLocation = [map.projection coordinateForPoint:map.lastTapPixel];
    [item didTapInfoWindowAtPixel:map.lastTapPixel location:tapLocation];
    return;
  }

  RMFMarkerMap4d * rMarker = (RMFMarkerMap4d *) marker;
  [rMarker.reactMarker didTapInfoWindowAtPixel:map.lastTapPixel];
}

- (void)mapview:(MFMapView *)mapView didTapPolyline:(MFPolyline *)polyline {
  RMFMapView* map = (RMFMapView*)mapView;
  RMFPolylineMap4d * rPolyline = (RMFPolylineMap4d *) polyline;
  [rPolyline.reactPolyline didTapAtPixel:map.lastTapPixel];
}

- (void)mapview:(MFMapView *)mapView didTapPolygon:(MFPolygon *)polygon {
  RMFMapView* map = (RMFMapView*)mapView;
  RMFPolygonMap4d * rPolygon = (RMFPolygonMap4d*) polygon;
  [rPolygon.reactPolygon didTapAtPixel:map.lastTapPixel];
}

- (void)mapview:(MFMapView *)mapView didTapCircle:(MFCircle *)circle {
  RMFMapView* map = (RMFMapView*)mapView;
  RMFCircleMap4d * rCircle = (RMFCircleMap4d*)circle;
  [rCircle.reactCircle didTapAtPixel:map.lastTapPixel];
}

- (void)mapView: (MFMapView*)  mapView willMove: (BOOL) gesture {
  RMFMapView* reactMapView = (RMFMapView*) mapView;
  [reactMapView willMove:gesture];
}

- (void)mapView:(MFMapView *)mapView movingCameraPosition:(MFCameraPosition *)position {
  RMFMapView* reactMapView = (RMFMapView*) mapView;
  [reactMapView movingCameraPosition:position];
}

//- (void)mapView:(MFMapView *)mapView didChangeCameraPosition:(MFCameraPosition *)position {
//}

- (void)mapView:(MFMapView *)mapView idleAtCameraPosition:(MFCameraPosition *)position {
  RMFMapView* reactMapView = (RMFMapView*) mapView;
  [reactMapView idleAtCameraPosition:position];
}

- (void)mapView:(MFMapView *)mapView didTapAtCoordinate:(CLLocationCoordinate2D)coordinate {
  RMFMapView* map = (RMFMapView*)mapView;
  [map didTapAtCoordinate:coordinate];
}

- (void)mapView:(MFMapView *)mapView didReachLimitedZoom:(double)zoom {
  RMFMapView* map = (RMFMapView*)mapView;
  [map onReachLimitedZoom:zoom];
}

- (void)mapView:(MFMapView *)mapView didTapPOI:(MFPOI *)poi {
  RMFMapView* map = (RMFMapView*)mapView;
  RMFPOIMap4d* rPOI = (RMFPOIMap4d*) poi;
  [rPOI.reactPOI didTapAtPixel:map.lastTapPixel];
}

- (void)mapView:(MFMapView *)mapView didTapPOIWithPlaceID:(NSString *)placeID name:(NSString *)name location:(CLLocationCoordinate2D)location {
  RMFMapView* reactMapView = (RMFMapView*) mapView;
  [reactMapView didTapPOIWithPlaceID:placeID name:name location:location];
}

- (void)mapView:(MFMapView *)mapView didTapBuildingWithBuildingID:(NSString *)buildingID name:(NSString *)name location:(CLLocationCoordinate2D)location {
  RMFMapView* reactMapView = (RMFMapView*) mapView;
  [reactMapView didTapBuildingWithBuildingID:buildingID name:name location:location];
}

- (void)mapView:(MFMapView *)mapView didTapPlaceWithName:(NSString *)name location:(CLLocationCoordinate2D)location {
  RMFMapView* reactMapView = (RMFMapView*) mapView;
  [reactMapView didTapPlaceWithName:name location:location];
}

- (void)mapView:(MFMapView *)mapView didTapDirectionsRenderer:(MFDirectionsRenderer *)renderer routeIndex:(NSUInteger)routeIndex {
  RMFMapView* map = (RMFMapView*)mapView;
  RMFDirectionsRendererMap4d* rRenderer = (RMFDirectionsRendererMap4d*)renderer;
  [rRenderer.reactRenderer didTapAtPixel:map.lastTapPixel withRouteIndex:routeIndex];
}

//- (void)mapView:(MFMapView *)mapView didTapMyLocation:(CLLocationCoordinate2D)location {
//}

- (BOOL)didTapMyLocationButtonForMapView:(MFMapView *)mapView {
  RMFMapView* reactMapView = (RMFMapView*) mapView;
  return [reactMapView didTapMyLocationButton];
}

- (UIView *)mapView:(MFMapView *)mapView markerInfoWindow:(MFMarker *)marker {
  return nil;
}

@end
