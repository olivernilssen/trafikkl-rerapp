import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Color from '../../styles/Colors';
import Header from '../Header';
import { View } from 'react-native-ui-lib';
import SketchColorMenu from './sketchColorMenu';
import { ComponentButton, IconButtons } from '../buttons/headerButtons';
import PencilSizePopup from './SketchSizeMenu';

const SketchHeader = React.memo((props, navigation) => {
    const [isActive, setActive] = useState(0);
    const [prevActive, setPrevActive] = useState(0);

    const {
        pencil,
        undo,
        clear,
        eraser,
        onPencilColorChange,
        topMenuHidden,
        toggleRightMenuState,
    } = props;

    const focusedActiveButton = (value) => {
        if (value === null) {
            setPrevActive(prevActive);
        } else {
            setActive(value);
            setPrevActive(value);
        }
    };

    return (
        <View style={styles.toolBar}>
            <Header
                name={'ScreenName'}
                navigation={navigation}
                style={styles.header}>
                <IconButtons
                    iconName={'bars'}
                    buttonFnc={props.navigation.toggleDrawer}
                    buttonNum={null}
                    isActive={isActive}
                    focusedActiveButton={focusedActiveButton}
                    propsStyle={styles.spacedLeft}
                />

                <IconButtons
                    iconName={'trash'}
                    buttonFnc={clear}
                    buttonNum={null}
                    isActive={isActive}
                    focusedActiveButton={focusedActiveButton}
                    propsStyle={styles.spacedRight}
                />

                <SketchColorMenu
                    onPencilColorChange={onPencilColorChange}
                    iconSize={styles.buttonSize}
                    propsStyle={styles.spacedCenter}
                />

                <PencilSizePopup />

                <IconButtons
                    iconName={'pen'}
                    buttonFnc={pencil}
                    buttonNum={0}
                    isActive={isActive}
                    focusedActiveButton={focusedActiveButton}
                />
                <IconButtons
                    iconName={'eraser'}
                    buttonFnc={eraser}
                    buttonNum={1}
                    isActive={isActive}
                    focusedActiveButton={focusedActiveButton}
                />
                <IconButtons
                    iconName={'undo-alt'}
                    buttonFnc={undo}
                    buttonNum={null}
                    isActive={isActive}
                    focusedActiveButton={focusedActiveButton}
                />
                <ComponentButton
                    activeIconName={'box-open'}
                    inactiveIconName={'box'}
                    toggleRightMenuState={toggleRightMenuState}
                    topMenuHidden={topMenuHidden}
                />
            </Header>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonSize: {
        fontSize: 30,
    },
    header: {
        backgroundColor: Color.header,
    },
    toolBar: {
        width: '100%',
        elevation: 10,
    },
    spacedCenter: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacedLeft: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    spacedRight: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SketchHeader;
