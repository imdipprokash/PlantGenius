import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, Size} from '../utils/Utils';

type Props = {};

const CustomBottom = ({
  btnTitle,
  btnIcon,
  onPress,
  disable,
}: {
  btnTitle: string;
  btnIcon: ImageSourcePropType | undefined;
  onPress: () => void;
  disable?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: disable ? 'gray' : Colors.btnColor,
        paddingHorizontal: Size.mediumSize,
        paddingVertical: Size.minSize,
        borderRadius: 20,
        shadowColor: '#333',
        elevation: 3,
      }}>
      <Image source={btnIcon} style={{width: 30, height: 30}} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          fontStyle: 'italic',
          color: '#333',
        }}>
        {btnTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomBottom;

const styles = StyleSheet.create({});
