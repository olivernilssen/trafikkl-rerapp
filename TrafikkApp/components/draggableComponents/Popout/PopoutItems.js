import React, { useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../../../styles';

/**
 * Component for the items inside the animated popout menu
 * @namespace PopoutItems
 * @category Draggable
 * @subcategory Popout
 * @prop {int} radius radius of popout item
 * @prop {array[]} array array of colors or items in popout menu
 * @prop {function} setTintColor function to set the tintcolor of draggable
 * @prop {int} buttonSize size of buttons in popout menu
 * @prop {function} removeItem function to delete draggable
 */
const PopoutItems = React.memo((props) => {
    const {
        radius,
        array,
        setTintColor,
        buttonSize,
        removeItem,
        setPopoutActive,
    } = props;

    /**
     * Function to calculate the x and y coordinates as a half circle
     * around an object. depending on which position the item has in
     * the array it is placed in
     * @memberof PopoutItems
     * @param {int} index index of a popout item
     * @returns {int} the x position of the circle
     * @returns {int} the y position of the circle
     */
    const calculateXY = useCallback((index) => {
        const so = 0; //start offset
        const rx = radius; //radius along x
        const ry = radius; //radius along y
        const n = array.length; //length of items
        const maxCircle = 180;

        const x =
            ry +
            ry * -Math.sin((150 / n / maxCircle) * (index + 1 + so) * Math.PI);
        const y =
            rx +
            -rx * Math.cos((150 / n / maxCircle) * (index + 1 + so) * Math.PI);

        return { x, y };
    });

    /**
     * Check what button is pressed
     * and change either tintcolor, remove it or delete item
     * @memberof PopoutItems
     * @param {hex} color color of selected tint
     * @param {boolean} isRemoveButton if button is the remove button
     * @param {boolean} isExitButton if the button is the reset button (not working)
     */
    const onPressOption = (color, isRemoveButton, isExitButton) => {
        isRemoveButton
            ? removeItem()
            : !isExitButton
            ? setTintColor(color)
            : setPopoutActive(false); //ERROR THIS ONE DOES NOT WORK, makes the image invisible
    };

    /**
     * This returns each object that is in the array
     * as a small circle placed according to the function calculateXY
     */
    return array.map((color, i) => {
        const isExitButton = color == 'exit';
        const isRemoveButton = color == 'delete';
        color = isExitButton
            ? '#DDDDDD' || '#dddddd'
            : isRemoveButton
            ? Colors.deleteButtonActive
            : color;

        const coords = calculateXY(i);
        return (
            <Animated.View
                key={color + i}
                style={[
                    styles.button,
                    {
                        top: coords.y - buttonSize / 2,
                        right: coords.x - buttonSize / 2,
                        height: buttonSize,
                        width: buttonSize,
                    },
                ]}>
                <TouchableWithoutFeedback
                    color={color}
                    onPressOut={() =>
                        onPressOption(color, isRemoveButton, isExitButton)
                    }>
                    <Animated.View
                        style={[
                            styles.circleInTouchable,
                            {
                                width: buttonSize,
                                height: buttonSize,
                                backgroundColor: color,
                                borderRadius: buttonSize,
                            },
                        ]}>
                        {isRemoveButton && (
                            <Icon
                                name={'trash-alt'}
                                solid
                                size={buttonSize - 10}
                                color={Colors.textPrimary}
                            />
                        )}
                        {isExitButton && (
                            <Icon
                                name={'times'}
                                solid
                                size={buttonSize - 10}
                                color={'black'}
                            />
                        )}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    });
});

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        position: 'absolute',
        elevation: 10,
        alignItems: 'center',
        padding: 5,
        zIndex: 999,
    },
    circleInTouchable: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PopoutItems;