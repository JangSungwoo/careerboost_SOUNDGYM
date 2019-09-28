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
  Text,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib';
import playlistData from './src/data/playlist.json';
import Player from './src/components/Player';

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

  //track 재생/일시정지 버튼 눌렀을때 동작
  async function togglePlayback() {
    // console.log("togglePlayback of App.js");
    //현재 track 가져오기 
    const currentTrack = await TrackPlayer.getCurrentTrack();
    //현재 track  
    //null : 초기화 후 재생
    //not null : 상태에 따른 재생/일시정지
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(playlistData);
      await TrackPlayer.play();
      setIsPlaying(true);
    } else{
      //TrackPlayer의 상태
      // STATE_PAUSED -> play() 
      // STATE_PLAY -> pause() 
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
        setIsPlaying(true);
      } else {
        await TrackPlayer.pause();
        setIsPlaying(false);
      }
    }
  }
  // console.log("App.js");
  return (
    <View>
      <Player
         isPlaying={isPlaying}
         onPrevious={_skipToPrevious}
         onNext={_skipToNext}
         onTogglePlayback={togglePlayback}
         />
    </View>
  );
};

//이전음악으로 이동
async function _skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

//다음음악으로 이동
async function _skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}
const styles = StyleSheet.create({

});
