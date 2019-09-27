import React from 'react';
import PropTypes from "prop-types";
import {
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

NextButton.propTypes = {
    onPress: PropTypes.func.isRequired
}
//다음음악으로 이동버튼
export default function NextButton({ onPress }) {
    return (
        <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
            <Image source={require('../images/baseline_skip_next_black_48dp.png')}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    controlButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
});