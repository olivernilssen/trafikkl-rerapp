import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MainView } from '../components/reusableComponents/';
import { SketchArea } from '../components/sketchComponents/';

/**
 * Screen component for roundbaout screen / rundkjøring.
 * This screen is a sketch screen, and is using the big SketchArea component.
 * @namespace RoundaboutScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */
const RoundaboutScreen = React.memo(({ navigation }) => {
    return (
        <MainView>
            <View style={styles.sketchArea}>
                <SketchArea
                    navigate={navigation.navigate}
                    toggleDrawer={navigation.toggleDrawer}
                    name={'Rundkjoring'}
                />
            </View>
        </MainView>
    );
});

const styles = StyleSheet.create({
    sketchArea: {
        flex: 1,
        width: '100%',
    },
});

export default RoundaboutScreen;
