import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Buttons } from '../../styles';

/**
 * This component is used to display a clickable external link on the StartScreen.
 * @namespace ExternalLink
 * @category StartScreenComponents
 * @prop {string} text The text of the link
 * @prop {function} onPress Function to be triggered when clicking the link
 */
const ExternalLink = React.memo((props) => {
    const { text, onPress } = props;

    return (
        <View>
            <TouchableOpacity
                style={styles.linkContainer}
                activeOpacity={0.6}
                onPress={onPress}>
                <Text style={styles.linkText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    linkContainer: {
        // margin: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2%',
        justifyContent: 'center',
        // backgroundColor: 'blue',
        // borderLeftWidth: 2,
        // borderRightWidth: 2,
        borderColor: Colors.dividerPrimary,
    },
    linkText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Colors.links,
        // flexWrap: 'wrap',
        textDecorationLine: 'underline',
        ...Typography.body,
    },
});

export default ExternalLink;
