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
import { Router,Stack,Scene } from 'react-native-router-flux';
import PlayListScreen from './src/screens/PlayListScreen.js';
import PlayerScreen from './src/screens/PlayerScreen';

export default function App() {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Scene key="playerScreen" component={PlayerScreen} initial/>
        <Scene key="playlistScreen" component={PlayListScreen} />
      </Stack>
    </Router>
    );
};

const styles = StyleSheet.create({

});
