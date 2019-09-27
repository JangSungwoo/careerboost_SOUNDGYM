/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {
  usePlaybackState
} from 'react-native-track-player/lib';
import playlistData from './src/data/playlist.json';

export default function App() {

  //playback 상태 정보를 사용하기위한 선언 
  const playbackState = usePlaybackState();

  //재생/일시정지 상태변수 선언 
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    //TrackPlayer 설정
    TrackPlayer.setupPlayer();
    //TrackPlayer의 remote 설정
    TrackPlayer.updateOptions({
      stopWithApp: false,
      //기본모드에서의 설정
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      //최소화되었을때의 설정
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ]
    });
  }, []);

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
      <PreviousButton onPress={_skipToPrevious}></PreviousButton>
      <TogglePlaybackButton onPress={() => setIsPlaying(!isPlaying)}></TogglePlaybackButton>
      <NextButton onPress={_skipToNext}></NextButton>
    </View>
  );
};

//이전음악으로 이동버튼
function PreviousButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Image source={require('./src/images/baseline_skip_previous_black_48dp.png')}></Image>
    </TouchableOpacity>
  );
}

//다음음악으로 이동버튼
function NextButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Image source={require('./src/images/baseline_skip_next_black_48dp.png')}></Image>
    </TouchableOpacity>
  );
}

//이전음악으로 이동
function _skipToPrevious() {

}

//다음음악으로 이동
function _skipToNext() {

}
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
