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
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';
import {
  usePlaybackState,
  useTrackPlayerEvents
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

  //track 정보 
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  
  //track 변경 시 동작 
  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      //변경된 track의 정보를 가져온다.
      const track = await TrackPlayer.getTrack(event.nextTrack);
      //track의 정보를 변수에 설정한다.
      setTrackTitle(track.title);
      setTrackArtist(track.artist);
      setTrackArtwork(track.artwork);
    }
  });

  //track 재생/일시정지 버튼 눌렀을때 동작
  async function togglePlayback() {
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
    <View style={styles.card}>
      <Image style={styles.cover} source={{uri:trackArtwork}}></Image>
      <Text style={styles.title}>{trackTitle}</Text>
      <Text style={styles.artist}>{trackArtist}</Text>
        <View style={styles.controls}>
          <PreviousButton onPress={_skipToPrevious} ></PreviousButton>
          <TogglePlaybackButton onPress={togglePlayback}></TogglePlaybackButton>
          <NextButton onPress={_skipToNext}></NextButton>
        </View>
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
  card: {
    width: "100%",
    height: "100%",
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: "center",
    shadowColor: "black",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 }
  },
  controlButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cover: {
    width: 300,
    height: 300,
    marginTop: 20,
    backgroundColor: "grey",
  },
  title: {
    marginTop: 10
  },
  artist: {
    fontWeight: "bold"
  },
});
