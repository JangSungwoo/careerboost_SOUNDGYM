import React, { useState } from 'react';
import PropTypes from "prop-types";
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
import TogglePlaybackButton from './TogglePlaybackButton';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import MusicSlider from './MusicSlider';

// var isPlaying = false;
Player.proptypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onTogglePlayback: PropTypes.func.isRequired,
}

export default function Player(props) {
    // console.log("Player");    

    //track 정보 
    const [trackTitle, setTrackTitle] = useState("");
    const [trackArtwork, setTrackArtwork] = useState("https://drive.google.com/uc?export=download&id=1d_tJkmpMmXQxrGzVYvzWuI9PkWpXIpTb");
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
  
    const { isPlaying, onPrevious, onNext, onTogglePlayback } = props;

    return (
        <View style={styles.card}>
            <Image style={styles.cover} source={{ uri: trackArtwork }} />
            <Text style={styles.title}>{trackTitle}</Text>
            <Text style={styles.artist}>{trackArtist}</Text>
            <MusicSlider></MusicSlider>
            <View style={styles.controls}>
                <PreviousButton onPress={onPrevious} />
                <TogglePlaybackButton isPlaying={isPlaying} onPress={onTogglePlayback} />
                <NextButton onPress={onNext} />
            </View>
        </View>
    );
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
        justifyContent: 'center',
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
