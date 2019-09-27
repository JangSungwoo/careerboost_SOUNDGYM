import React from 'react';
import PropTypes from "prop-types";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

PreviousButton.proptypes = {
    onPress: PropTypes.func.isRequired
}
//이전음악으로 이동버튼
export default function PreviousButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Image source={require('../images/baseline_skip_previous_black_48dp.png')}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    controlButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
});