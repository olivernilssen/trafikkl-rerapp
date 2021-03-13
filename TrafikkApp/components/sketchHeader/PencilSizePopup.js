import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

import { Colors } from '../../styles';

const PencilSizePopup = (props) => {
    // const pencilSizeButton = (pencilThickness) => {
    return (
        <View style={styles.iconPlacement}>
            <View
                style={{
                    width: 50,
                    height: props.pencilThickness,
                    backgroundColor: Colors.pencilThicknessBox,
                }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconPlacement: {
        height: 60,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
<<<<<<< HEAD
=======
    iconSmall: {
        height: 5,
        width: 32,
        backgroundColor: Colors.pencilThicknessBox,
    },
    iconMedium: {
        height: 8,
        width: 32,
        backgroundColor: Colors.pencilThicknessBox,
    },
    iconBig: {
        height: 11,
        width: 32,
        backgroundColor: Colors.pencilThicknessBox,
    },
>>>>>>> b8f0cbe7c1b9c2eb992538d173e16a7948974dad
});

export default PencilSizePopup;
