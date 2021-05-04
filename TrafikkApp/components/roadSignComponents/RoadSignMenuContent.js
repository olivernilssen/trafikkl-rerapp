import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { Colors, Typography } from '../../styles';

import {
    fareSkilt,
    forbudsSkilt,
    markeringsSkilt,
    opplysningsSkilt,
    påbudsSkilt,
    serviceSkilt,
    underSkilt,
    veivisningsSkilt,
    vikepliktsSkilt,
} from '../../assets/sign_descriptions/';

// may very well be the ugliest array in existence...
const signTypeArray = [
    {
        typeName: 'Fareskilt',
        typeObject: fareSkilt,
        buttonID: 0,
    },
    {
        typeName: 'Forbudsskilt',
        typeObject: forbudsSkilt,
        buttonID: 1,
    },
    {
        typeName: 'Markeringsskilt',
        typeObject: markeringsSkilt,
        buttonID: 2,
    },
    {
        typeName: 'Opplysningsskilt',
        typeObject: opplysningsSkilt,
        buttonID: 3,
    },
    {
        typeName: 'Påbudsskilt',
        typeObject: påbudsSkilt,
        buttonID: 4,
    },
    {
        typeName: 'Serviceskilt',
        typeObject: serviceSkilt,
        buttonID: 5,
    },
    {
        typeName: 'Underskilt',
        typeObject: underSkilt,
        buttonID: 6,
    },
    {
        typeName: 'Veivisningsskilt',
        typeObject: veivisningsSkilt,
        buttonID: 7,
    },
    {
        typeName: 'Vikeplikt- og forkjørsskilt',
        typeObject: vikepliktsSkilt,
        buttonID: 8,
    },
];

/**
 * @namespace RoadSignMenuContent
 * @category RoadSignComponents
 * @prop {function} handleSignType Handles the change from one signType to another
 * @prop {function} setBottomSheetHidden Sets the state of bottomSheetHidden
 * @prop {function} handleHeaderName Handles the headername when signType changes
 * @returns Buttons for each signType
 */
const RoadSignMenuContent = (props) => {
    const [activeTypeID, setActiveTypeID] = useState(0);

    const {
        handleSignType,
        setBottomSheetHidden,
        handleHeaderName,
        scrollToTop,
    } = props;

    /**
     * Handles the state for the active button
     * @memberof RoadSignMenuContent
     * @param {number} value
     */
    const handleActiveButton = (value) => {
        setActiveTypeID(value);
    };

    /**
     * Function to change which sign type the
     * user is browsing
     * @memberof RoadSignMenuContent
     * @param {object} value The object of the chosen signType, contains name, description and image source
     */
    const handleBottomMenuPress = (value) => {
        handleSignType(value);
        setBottomSheetHidden(true);
    };

    return (
        <View style={styles.container}>
            {signTypeArray.map((value, index) => {
                return (
                    <View key={index} style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => {
                                scrollToTop();
                                handleBottomMenuPress(value.typeObject);
                                handleActiveButton(value.buttonID);
                                handleHeaderName(value.typeName);
                            }}
                            style={[
                                styles.button,
                                activeTypeID === value.buttonID
                                    ? styles.buttonActive
                                    : styles.buttonInActive,
                            ]}>
                            <Text
                                style={[
                                    styles.textStyle,
                                    activeTypeID === value.buttonID
                                        ? styles.activeText
                                        : styles.inActiveText,
                                ]}>
                                {value.typeName}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '2%',
    },
    buttonView: {
        width: '32%',
        height: '30%',
        alignItems: 'center',
        padding: '1%',
    },
    activeText: {
        color: Colors.secSlideTextActive,
    },
    inActiveText: {
        color: Colors.secSlideTextInactive,
        opacity: 0.9,
    },
    textStyle: {
        textAlign: 'center',
        padding: '6%',
        ...Typography.button,
    },
    button: {
        borderRadius: 10,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonActive: {
        backgroundColor: Colors.startScreenLinkTheory,
        elevation: 8,
    },
    buttonInActive: {
        backgroundColor: Colors.bottomMenyButtons,
        borderColor: Colors.bottomMenyButtons,
        borderWidth: 2,
    },
});

export default RoadSignMenuContent;
