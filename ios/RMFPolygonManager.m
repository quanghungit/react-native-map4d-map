//
//  RMFPolygonManager.m
//  Map4dMap
//
//  Created by Huy Dang on 10/7/20.
//  Copyright © 2020 IOTLink. All rights reserved.
//

#import "RMFPolygonManager.h"
#import "RMFPolygon.h"
#import "RCTConvert+Map4dMap.h"
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <Foundation/Foundation.h>

@implementation RMFPolygonManager

RCT_EXPORT_MODULE(RMFPolygon)

- (UIView *)view {
  RMFPolygon* polygon = [[RMFPolygon alloc] init];
  return polygon;
}

RCT_EXPORT_VIEW_PROPERTY(coordinates, RMFCoordinateArray)
RCT_EXPORT_VIEW_PROPERTY(holes, RMFCoordinateArrayArray)
RCT_EXPORT_VIEW_PROPERTY(fillColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(strokeColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(strokeWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(zIndex, float)
RCT_EXPORT_VIEW_PROPERTY(visible, BOOL)
RCT_EXPORT_VIEW_PROPERTY(userData, NSDictionary)

RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)


RCT_EXPORT_METHOD(setCoordinates:(nonnull NSNumber *)reactTag
                  withCoordinates:(id)coordinates)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFPolygon class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFPolygon, got: %@", view);
    } else {
      RMFPolygon *polygon = (RMFPolygon *)view;
      [polygon setCoordinates:[RCTConvert RMFCoordinateArray:coordinates]];
    }
  }];
}

RCT_EXPORT_METHOD(setHoles:(nonnull NSNumber *)reactTag
                  withHoles:(id)holes)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFPolygon class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFPolygon, got: %@", view);
    } else {
      RMFPolygon *polygon = (RMFPolygon *)view;
      [polygon setHoles:[RCTConvert RMFCoordinateArrayArray:holes]];
    }
  }];
}

RCT_EXPORT_METHOD(setFillColor:(nonnull NSNumber *)reactTag
                  color:(id)json)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFPolygon class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFPolygon, got: %@", view);
    } else {
      RMFPolygon *polygon = (RMFPolygon *)view;
      UIColor* color = [RCTConvert UIColor:json];
      if (color != nil) {
        [polygon setFillColor:color];
      }
    }
  }];
}

RCT_EXPORT_METHOD(setStrokeColor:(nonnull NSNumber *)reactTag
                  color:(id)json)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFPolygon class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFPolygon, got: %@", view);
    } else {
      RMFPolygon *polygon = (RMFPolygon *)view;
      UIColor* color = [RCTConvert UIColor:json];
      if (color != nil) {
        [polygon setStrokeColor:color];
      }
    }
  }];
}

RCT_EXPORT_METHOD(setStrokeWidth:(nonnull NSNumber *)reactTag
                  width:(CGFloat)width)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFPolygon class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFPolygon, got: %@", view);
    } else {
      RMFPolygon *polygon = (RMFPolygon *)view;
      [polygon setStrokeWidth:width];
    }
  }];
}

RCT_EXPORT_METHOD(setVisible:(nonnull NSNumber *)reactTag
                  visible:(BOOL)visible)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFPolygon class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFPolygon, got: %@", view);
    } else {
      RMFPolygon *polygon = (RMFPolygon *)view;
      [polygon setVisible:visible];
    }
  }];
}

RCT_EXPORT_METHOD(setUserData:(nonnull NSNumber *)reactTag
                  userData:(id)json)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if (![view isKindOfClass:[RMFPolygon class]]) {
      RCTLogError(@"Invalid view returned from registry, expecting RMFPolygon, got: %@", view);
    } else {
      RMFPolygon *polygon = (RMFPolygon *)view;
      [polygon setUserData:[RCTConvert NSDictionary:json]];
    }
  }];
}

@end
