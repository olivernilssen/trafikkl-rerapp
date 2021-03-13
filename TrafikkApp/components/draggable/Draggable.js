import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

import Popout from './Popout/Popout';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const colors = [
    '#000000',
    '#e09f3e',
    '#9e2a2b',
    '#284b63',
    '#3a5a40',
    'reset',
    '#DDDDDD',
];

import Gestures from 'react-native-easy-gestures';
import { useCallback } from 'react';

const ITEM_SIZE = 100;
const radius = (ITEM_SIZE * 2) / 2;
const buttonSize = 25;

/**
 * The component which is draggable
 * Can be moved freely around the view it belongs too
 */
const Draggable = React.memo((props) => {
    //States
    const { source } = props;
    const [imgScale, setimgScale] = useState(new Animated.Value(1));
    const [tintColor, setTintColor] = useState(props.tintColor);
    const [popoutActive, setPopoutActive] = useState(false);

    /**
     * useEffect that is triggered when tintColor is changed
     * Will make the popout inactive
     */
    useEffect(() => {
        setPopoutActive(!popoutActive);
    }, [tintColor]);

    /**
     * When user starts dragging the object, this is triggered
     * will remove the popout if it is active
     * and make the item hover as a feedback that the dragging has
     * started
     * @param {Event} gesture
     */
    const onDragStart = (gesture) => {
        //Start spring animation (user feedback)
        setPopoutActive(false);

        Animated.spring(imgScale, {
            toValue: 1.2,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    /**
     * When dragging event has ended, the
     * hoved animation will end and pop back to it's
     * original size
     * @param {Event} gesture
     */
    const onDragEnd = (gesture) => {
        Animated.spring(imgScale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    /**
     * Helper function so useEffects are triggered
     * when the user stops dragging the element on top of
     * the trashcan. This will initate the removal of the item
     */
    const removeItem = useCallback(() => {
        props.onRemoveItem(props.id);
    });

    return (
        <Gestures
            draggable={true}
            scalable={true}
            rotatable={true}
            style={styles.container}
            onEnd={(event) => onDragEnd(event)}
            onStart={(event) => onDragStart(event)}>
            <View>
                <TouchableWithoutFeedback
                    onLongPress={() => setPopoutActive(!popoutActive)}
                    accessibilityRole={'image'}>
                    <View>
                        <Animated.Image
                            source={source}
                            resizeMode={'contain'}
                            style={[
                                styles.item,
                                tintColor === null
                                    ? null
                                    : { tintColor: tintColor },
                                {
                                    transform: [{ scale: imgScale }],
                                },
                            ]}
                        />
                        <Popout
                            radius={radius}
                            array={colors}
                            setPopoutActive={setPopoutActive}
                            popoutActive={popoutActive}
                            removeButtonPos={colors.length - 1}
                            setTintColor={setTintColor}
                            buttonSize={buttonSize}
                            itemSize={ITEM_SIZE}
                            removeItem={removeItem}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Gestures>
    );
});

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: '100%',
    },
    itemNoTint: {
        width: '100%',
        height: '100%',
    },
    container: {
        position: 'absolute',
        top: windowHeight / 2,
        left: windowWidth / 2,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        justifyContent: 'center',
        // zIndex: -1,
    },
});

export default Draggable;
