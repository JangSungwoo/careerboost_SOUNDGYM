import React, { useState } from 'react';
import PropTypes from "prop-types";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView
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

    //이미지 클릭시 가사를 띄우기위한 플래그
    const [isClicked, setIsClicked] = useState(false);

    //track 정보 
    const [trackTitle, setTrackTitle] = useState("");
    const [trackArtwork, setTrackArtwork] = useState("https://drive.google.com/uc?export=download&id=1d_tJkmpMmXQxrGzVYvzWuI9PkWpXIpTb");
    const [trackArtist, setTrackArtist] = useState("");
    const [trackDescription, setTrackDescription] = useState("");

    //track 변경 시 동작 
    useTrackPlayerEvents(["playback-track-changed"], async event => {
        if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
            //변경된 track의 정보를 가져온다.
            const track = await TrackPlayer.getTrack(event.nextTrack);
            //track의 정보를 변수에 설정한다.
            setTrackTitle(track.title);
            setTrackArtist(track.artist);
            setTrackArtwork(track.artwork);
            setTrackDescription(track.description);
        }
    });

    const { isPlaying, onPrevious, onNext, onTogglePlayback } = props;

    function Description() {
        return (
            <View style={styles.description}>
                <View style={styles.descriptionToolbar}>
                    <TouchableOpacity onPress={() => setIsClicked(false)}>
                        <Image
                            style={styles.arrow}
                            source={require('../images/ic_arrow_down.png')}></Image>
                    </TouchableOpacity>
                    <View style={styles.descriptionToolbarTitle}>
                        <Text style={styles.title}>{trackTitle}</Text>
                        <Text style={styles.artist}>{trackArtist}</Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={styles.descriptionText}>{trackDescription}</Text>
                </ScrollView>
            </View>
        );
    }

    function AlbumMain() {
        return (
            <View>
                <TouchableOpacity onPress={() => setIsClicked(true)}>
                    <Image style={styles.cover} source={{ uri: trackArtwork }} />
                </TouchableOpacity>
                <Text style={styles.title}>{trackTitle}</Text>
                <Text style={styles.artist}>{trackArtist}</Text>
            </View>
        );
    }

    function AlbumInfo() {
        return (
            isClicked ? <Description /> : <AlbumMain />
        );
    }
    return (
        <View style={styles.card}>
            <AlbumInfo />
            <MusicSlider />
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
        borderRadius: 5,
        shadowRadius: 2,
        shadowOpacity: 0.1,
        alignItems: "center",
        justifyContent: 'space-between',
        shadowColor: "black",
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 1 },
        paddingTop: 20
    },
    controlButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 50,
    },
    cover: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 30,
        borderColor: '#f0f0f0',
        borderWidth: 3,
        backgroundColor: "grey",
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    artist: {
        fontSize: 12,
        textAlign: 'center',
    },
    description: {
        width: "90%",
        height: "70%",
    },
    descriptionToolbar: {
        flexDirection: 'row',
        paddingBottom: 18
    },
    descriptionToolbarTitle: {
        flexDirection: 'column',
        width: "70%",
        textAlign: 'center',
    },
    arrow: {
        width: 30,
        height: 30,
        margin: 15,
    },
    descriptionText: {
        textAlign: 'center',
    }
});
