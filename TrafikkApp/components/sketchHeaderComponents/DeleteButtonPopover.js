import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

import { Colors, Typography, Buttons } from '../../styles';

const { Popover } = renderers;

/** A button for clearing the sketch screen, drops down a button for confirmation
 * @namespace DeleteButtonPopover
 * @memberof sketchHeaderComponents
 * @prop {object} propsStyle StyleSheet
 * @prop {function} clearCanvas Clears the canvas
 */

const DeleteButtonPopover = React.memo((props) => {
    const [isOpened, setOpened] = useState(false);

    const { propsStyle, clearCanvas } = props;

    /** Clear canvas and close the "popover" modal
     * @memberof sketchHeaderComponents.DeleteButtonPopover
     */
    const clearButtonPressed = () => {
        clearCanvas();
        setOpened(false);
    };

    return (
        <View style={propsStyle}>
            <Menu
                renderer={Popover}
                rendererProps={{
                    preferredPlacement: 'bottom',
                    anchorStyle: {
                        backgroundColor: Colors.colorPaletteMenu,
                    },
                }}
                opened={isOpened}
                onBackdropPress={() => {
                    setOpened(false);
                }}>
                <MenuTrigger
                    onPress={() => {
                        setOpened(true);
                    }}>
                    <View
                        style={
                            isOpened
                                ? [styles.buttonSize, styles.buttonActive]
                                : [styles.buttonSize, styles.buttonInactive]
                        }>
                        <Icon
                            name={'trash'}
                            size={30}
                            solid
                            color={Colors.textLight}
                        />
                    </View>
                </MenuTrigger>

                <MenuOptions optionsContainerStyle={styles.menuOptions}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 20,
                        }}>
                        <TouchableOpacity
                            style={styles.deleteAllButton}
                            onPress={clearButtonPressed}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: Colors.textLight,
                                }}>
                                Slett
                            </Text>
                        </TouchableOpacity>
                    </View>
                </MenuOptions>
            </Menu>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        height: 62,
        width: 62,
        ...Buttons.round,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: Colors.deleteButtonActive,
        paddingVertical: 16,
        paddingHorizontal: 16,
        // ...Typography.large,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.header,
        paddingVertical: 16,
        paddingHorizontal: 16,
        // ...Typography.large,
    },
    deleteAllButton: {
        backgroundColor: Colors.deleteButtonActive,
        padding: 10,
        borderRadius: 10,
    },
    menuOptions: {
        height: 80,
        width: 100,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colors.colorPaletteMenu,
        // overflow: 'hidden',
    },
});

export default DeleteButtonPopover;
