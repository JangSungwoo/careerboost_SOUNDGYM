import React, { useState } from 'react';
import PropTypes from "prop-types";
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
    useTrackPlayerEvents,
    useTrackPlayerProgress
} from 'react-native-track-player/lib';
import moment from 'moment';

var isPlaying = false;
Player.proptypes={
    onPrevious : PropTypes.func.isRequired,
    onNext : PropTypes.func.isRequired,
    onTogglePlayback : PropTypes.func.isRequired,
}
export default function Player(props) {

    //track 상태 확인 
    const playbackState = usePlaybackState();

    //재생/일시정지 상태변수 선언 
    // const [isPlaying, setIsPlaying] = useState(false);
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

    const { onPrevious, onNext, onTogglePlayback } = props;

    isPlaying = false;
    if (playbackState === TrackPlayer.STATE_PLAYING ||
        playbackState === TrackPlayer.STATE_BUFFERING) {
        isPlaying = true;
    }

    return (
        <View style={styles.card}>
            <Image style={styles.cover} source={{ uri: trackArtwork }}></Image>
            <Text style={styles.title}>{trackTitle}</Text>
            <Text style={styles.artist}>{trackArtist}</Text>
            <MusicSlider></MusicSlider>
            <View style={styles.controls}>
                <PreviousButton onPress={onPrevious} ></PreviousButton>
                <TogglePlaybackButton onPress={onTogglePlayback}></TogglePlaybackButton>
                <NextButton onPress={onNext}></NextButton>
            </View>
        </View>
    )
}

TogglePlaybackButton.proptypes = {
    onPress: PropTypes.func.isRequired
}
//재생/일시정지 버튼
function TogglePlaybackButton({ onPress }) {
    var icon = isPlaying
        ? require('../images/baseline_pause_black_48dp.png')
        : require('../images/baseline_play_arrow_black_48dp.png');
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Image source={icon}></Image>
        </TouchableOpacity>
    );
}

PreviousButton.proptypes = {
    onPress: PropTypes.func.isRequired
}
//이전음악으로 이동버튼
function PreviousButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Image source={require('../images/baseline_skip_previous_black_48dp.png')}></Image>
        </TouchableOpacity>
    );
}

PreviousButton.propTypes = {
    onPress: PropTypes.func.isRequired
}
//다음음악으로 이동버튼
function NextButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Image source={require('../images/baseline_skip_next_black_48dp.png')}></Image>
        </TouchableOpacity>
    );
}

//재생위치 변경
_seekTo = async (value) => {
    try {
        await TrackPlayer.seekTo(value);
    } catch (_) { }
}

//음악 슬라이더
function MusicSlider() {
    const progress = useTrackPlayerProgress()
    var positionTime = moment(progress.position * 1000).format('mm:ss')
    var durationTime = moment(progress.duration * 1000).format('mm:ss')
    return (
        <View style={styles.progress}>
            <Slider
                style={{ width: "100%" }}
                maximumValue={progress.duration}
                minimumValue={0}
                value={progress.position}
                step={1}
                onSlidingComplete={(val) => _seekTo(val)}
            ></Slider>
            <View style={styles.trackTime}>
                <Text>{positionTime}</Text>
                <Text>{durationTime}</Text>
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
    progress: {
        // height: ,
        width: "90%",
        marginTop: 10,
        flexDirection: "column"
    },
    trackTime: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
