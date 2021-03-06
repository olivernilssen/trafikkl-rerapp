import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles';
import objectPaths from '../draggable/draggableObjectPaths';

import Carousel from '../Carousel';

/**
 * Component for the items that are in the draggable top menu
 */
const DraggableComponents = React.memo(({ onNewDraggable }) => {
    const objects = Object.keys(objectPaths);

    /**
     * Get's the image source of the draggable
     * and creates a new draggable item
     * @param {int} source
     */
    const onElementPress = (source) => {
        onNewDraggable(objectPaths[source]);
    };

    /**
     * Displayes the available draggable images that can be used
     * @return all the images that are in the "objects" array
     */
    const images = objects.map((source, i) => {
        return (
            <View key={i} style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageButton}
                    activeOpacity={0.4}
                    onPress={() => onElementPress(source)}>
                    <Image
                        source={objectPaths[source]}
                        style={styles.image}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        );
    });

    return (
        <Carousel objectArray={images} itemsPerSlide={9}>
            {images}
            {images}
        </Carousel>
    );
});

const styles = StyleSheet.create({
    imageContainer: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    imageButton: {
        paddingHorizontal: 5,
    },
    image: {
        height: 40,
        width: 40,
    },
    bullets: {
        flexDirection: 'row',
    },
    bullet: {
        paddingHorizontal: 10,
        fontSize: 25,
    },
});

export default DraggableComponents;
