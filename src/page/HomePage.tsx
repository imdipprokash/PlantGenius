import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, ScreenHeight, ScreenWidth, Size} from '../utils/Utils';
import CustomBottom from '../components/CustomBottom';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GetInformationFormImage} from '../apis/AIInformation';
import AdsScreen from '../Ads/AdsScreen';
type Props = {};

const HomePage = (props: Props) => {
  const [image, setImage] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState<any>();
  const [isNotAPlant, setIsNotAPlant] = useState<any>();

  const GetPlantInfoHandler = async (file: any) => {
    setImageInfo(null);
    setIsNotAPlant(null);
    try {
      const response = await GetInformationFormImage(file);

      const text =
        response?.data?.response?.candidates[0]?.content?.parts[0].text || '{}';

      const cleanedString = text.replace(/```json|```/g, '').trim();
      try {
        const jsonObject = JSON.parse(cleanedString);
        setImageInfo(jsonObject);
        setLoading(false);
      } catch (error) {
        setIsNotAPlant(text);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadHandler = async () => {
    setImageInfo(null);
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.assets?.length) {
        setImage(result.assets[0]);
        GetPlantInfoHandler(result.assets[0]);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cameraHandler = async () => {
    try {
      const result = await launchCamera({
        cameraType: 'back',
        mediaType: 'photo',
      });
      if (result.assets?.length) {
        setImage(result.assets[0]);
        GetPlantInfoHandler(result.assets[0]);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.mainContainerStyle}>
      <Text style={styles.headingTextStyle}>Plant genius</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <CustomBottom
          disable={loading}
          btnTitle={'Upload'}
          btnIcon={require('../assets/UploadIcon.png')}
          onPress={uploadHandler}
        />
        <CustomBottom
          btnTitle={'Camera'}
          btnIcon={require('../assets/CameraIcon.png')}
          onPress={cameraHandler}
        />
      </View>
      <View style={{alignSelf: 'center'}}>
        <AdsScreen />
      </View>
      {image && (
        <View>
          <Image
            source={{
              //@ts-ignore
              uri: image?.uri,
            }}
            resizeMode="cover"
            style={{
              width: 400, //image?.width * 0.6 ||
              height: 400, //image?.heigh * 0.4 ||

              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
        </View>
      )}
      {loading && <ActivityIndicator size={30} />}
      {isNotAPlant && (
        <Text
          style={{
            fontSize: 20,
            fontStyle: 'italic',
            color: '#333',
            paddingHorizontal: Size.largeSize,
          }}>
          {isNotAPlant}
        </Text>
      )}

      {imageInfo &&
        Object.keys(imageInfo).map(item => (
          <Text
            key={item}
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              color: '#333',
              paddingHorizontal: Size.largeSize,
            }}>
            <Text style={{fontWeight: '800'}}>{item}: </Text>
            {imageInfo[item]}
          </Text>
        ))}
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  mainContainerStyle: {
    paddingHorizontal: Size.mediumSize,
    // backgroundColor: Colors.bgColor,
    paddingVertical: Size.extraLargeSize,
    rowGap: Size.largeSize,
    // flex: 1,
  },
  headingTextStyle: {
    fontSize: 30,
    fontWeight: '800',
    fontStyle: 'italic',
    alignSelf: 'center',
    color: '#333',
  },
});
