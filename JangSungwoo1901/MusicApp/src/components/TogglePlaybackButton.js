import React from 'react';
import PropTypes from "prop-types";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

TogglePlaybackButton.proptypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
}
//재생/일시정지 버튼
export default function TogglePlaybackButton({isPlaying, onPress }) {
    var icon = isPlaying
        ? require('../images/baseline_pause_black_48dp.png')
        : require('../images/baseline_play_arrow_black_48dp.png');
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Image source={icon}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    controlButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
});   