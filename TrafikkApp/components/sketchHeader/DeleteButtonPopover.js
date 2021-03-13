import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native-ui-lib';
import {
    Menu,
    MenuOptions,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';

import { Colors, Typography, Buttons } from '../../styles';

const { Popover } = renderers;

const DeleteButtonPopover = React.memo((props) => {
    const [isOpened, setOpened] = useState(false);

    const { propsStyle, clearCanvas } = props;

    /**
     * Clear canvas and close the "popover" modal
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
                    anchorStyle: { backgroundColor: Colors.colorPaletteMenu },
                }}
                opened={isOpened}
                onBackdropPress={() => {
                    setOpened(false);
                }}>
                <MenuTrigger
                    onPress={() => {
                        setOpened(true);
                    }}
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
                            <Text style={{ color: Colors.textLight }}>
                                Slett alt
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
        ...Typography.large,
    },
    buttonActive: {
        backgroundColor: Colors.deleteButtonActive,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Buttons.round,
        ...Typography.large,
    },
    buttonInactive: {
        color: Colors.icons,
        backgroundColor: Colors.header,
        paddingVertical: 12,
        paddingHorizontal: 16,
        ...Typography.large,
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
