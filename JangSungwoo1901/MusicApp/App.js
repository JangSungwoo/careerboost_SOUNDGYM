/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function App() {
  //재생/일시정지 상태변수 선언 
  const [isPlaying,setIsPlaying] = useState(false);
  //재생/일시정지 버튼
  function TogglePlaybackButton({ onPress }) {
    var icon = isPlaying
    ? require('./src/images/baseline_pause_black_48dp.png')
    : require('./src/images/baseline_play_arrow_black_48dp.png');
    return (
      <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
       <Image source={icon}></Image>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.controls}>
        <TogglePlaybackButton onPress={()=>setIsPlaying(!isPlaying)}></TogglePlaybackButton>
    </View>
  );
};

const styles = StyleSheet.create({
  controlButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
