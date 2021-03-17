import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import USER_KEYS from '../helpers/storageKeys';
import AppContext from '../../AppContext';
import { Colors, Typography } from '../../styles/index';
// import ButtonToggleGroup from 'react-native-button-toggle-group';
import ButtonGroup from '../reusableComponents/ButtonGroup';

const SettingsView = () => {
    const myContext = useContext(AppContext);
    const onDelChangeValues = ['Ja', 'Nei'];
    const penColorValues = [
        '#20303C',
        '#3182C8',
        '#00AAAF',
        '#00A65F',
        '#E2902B',
        '#D9644A',
        '#CF262F',
        '#8B1079',
    ];
    const eraserSizeValues = ['50', '60', '70', '80', '90', '100'];
    const draggableColorValues = [
        '#000000',
        '#e09f3e',
        '#9e2a2b',
        '#284b63',
        '#3a5a40',
    ];
    const themeValues = ['Mørk', 'Lys'];

    const onChangeValue = (value, setValue, key) => {
        myContext.saveNewSettings(value, setValue, key);
    };

    return (
        <View style={styles.view}>
            {/* CHANGE THEME COLORS */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>
                    Slette alt ved illustrasjonsbytte:
                </Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.theme}
                        values={themeValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                newValue,
                                myContext.setTheme,
                                USER_KEYS.THEME_KEY
                            )
                        }
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                    />
                </View>
            </View>

            {/* STANDARD SIZE OF ERASER */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Viskelær størrelse: </Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.eraserSize}
                        values={eraserSizeValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                newValue,
                                myContext.setEraserSize,
                                USER_KEYS.ERASER_SIZE_KEY
                            )
                        }
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                    />
                </View>
            </View>

            {/* DELETE EVERYTHING ON ILLUSTRASTION CHANGE */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>
                    Slette alt ved illustrasjonsbytte:
                </Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.deleteOnChange}
                        values={onDelChangeValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                newValue,
                                myContext.setDeleteOnChange,
                                USER_KEYS.DELETE_KEY
                            )
                        }
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                    />
                </View>
            </View>

            {/* PEN INITAL COLOR */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>Innledende farge på pen:</Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.penColor}
                        values={penColorValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                newValue,
                                myContext.setPenColor,
                                USER_KEYS.PEN_COLOR_KEY
                            )
                        }
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                        isColorOptions={true}
                    />
                </View>
            </View>

            {/* DRAGGABLE INITAL COLOR */}
            <View style={styles.rowView}>
                <Text style={styles.leftColumn}>
                    Innledende farge på drabare elementer:
                </Text>
                <View style={styles.rightColumn}>
                    <ButtonGroup
                        selectedValue={myContext.draggableColor}
                        values={draggableColorValues}
                        onSelect={(newValue) =>
                            onChangeValue(
                                newValue,
                                myContext.setDraggableColor,
                                USER_KEYS.DRAGGABLE_COLOR_KEY
                            )
                        }
                        groupWidth={300}
                        highlightBackgroundColor={Colors.slideActiveBg}
                        highlightTextColor={Colors.slideTextActive}
                        inactiveBackgroundColor={Colors.slideInactiveBg}
                        inactiveTextColor={Colors.slideTextInactive}
                        isColorOptions={true}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 30,
        borderColor: 'black',
        justifyContent: 'space-evenly',
    },
    rowView: {
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: 'gray',
        color: 'white',
        fontSize: 25,
        width: '100%',
    },
    leftColumn: {
        color: Colors.textLight,
        justifyContent: 'flex-start',
        flex: 1,
        fontSize: 25,
        fontWeight: '300',
    },
    rightColumn: {
        flex: 0,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
});

export default SettingsView;