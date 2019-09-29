import React from 'react';
import {
    StyleSheet,
    View,
    Text,
}from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer from 'react-native-track-player';
import {
    useTrackPlayerProgress
} from 'react-native-track-player/lib';
import moment from 'moment';

//재생위치 변경
_seekTo = async (value) => {
    try {
        await TrackPlayer.seekTo(value);
    } catch (_) { }
}

//음악 슬라이더
export default function MusicSlider() {
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
            />
            <View style={styles.trackTime}>
                <Text>{positionTime}</Text>
                <Text>{durationTime}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    progress: {
        // height: ,
        width: "90%",
        marginTop: 10,
        flexDirection: "column",
    },
    trackTime: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});