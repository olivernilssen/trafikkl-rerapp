import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';
import { Buttons, Colors, Icons } from '../../styles';

/**
 * This is the button component for the
 * box that is either open or closed on the sketchheader
 * @param {props} props
 */
const BoxButton = (props) => {
    const { topMenuHidden, toggleRightMenuState } = props;
    return (
        <View>
            <TouchableOpacity
                onPress={() => topMenuHidden()}
                style={{
                    flex: 1,
                    justifyContent: 'space-around',
                }}>
                <Icon
                    name={!toggleRightMenuState ? 'box-open' : 'box'}
                    size={Icons.small}
                    style={
                        !toggleRightMenuState
                            ? styles.buttonActive
                            : [styles.buttonSize, styles.buttonInactive]
                    }
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonSize: {
        // fontSize: 30,
        // justifyContent: 'center',
        // alignItems: 'center',
        // ...Typography.medium,
    },
    buttonActive: {
        color: Colors.textLight,
        backgroundColor: Colors.iconActive,
        paddingVertical: 12,
        paddingHorizontal: 14,
        ...Buttons.round,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.header,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
});

export default BoxButton;
