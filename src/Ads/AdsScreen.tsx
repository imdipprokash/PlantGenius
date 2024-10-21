import {StyleSheet, Text, View} from 'react-native';
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import React from 'react';

type Props = {
  ADS_ID?: string;
};

const AdsScreen = ({ADS_ID}: Props) => {
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-3346761957556908/5379108395';
  return (
    <GAMBannerAd
      unitId={adUnitId}
      sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {}}
      onAdFailedToLoad={error => {}}
    />
  );
};

export default AdsScreen;
