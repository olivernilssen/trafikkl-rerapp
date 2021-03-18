/* eslint-disable prettier/prettier */
import React, {
    useRef,
    useState,
    useEffect,
    useCallback,
    useContext,
} from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
} from 'react-native';

import MainView from '../reusableComponents/MainView';
import SketchHeader from '../sketchHeader/SketchHeader';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { Colors } from '../../styles';

import DraggableWithEverything from '../draggable/DraggableWithEverything';
import BottomMenuAnimated from '../bottomMenuComponent/BottomMenuAnimated';

import AppContext from '../../AppContext';
/**
 * This is a big component that contains all the components that are visible
 * on the sketcharea screens.
 */
const SketchArea = React.memo((props) => {
    const appContext = useContext(AppContext);
    const sketchRef = useRef();
    const eraserSize = parseInt(appContext.eraserSize);
    const eraserColor = '#00000000';
    const defaultPencilColor = appContext.penColor;
    const defaultPencilSize = 5;

    const [pencilColor, setPencilColor] = useState(defaultPencilColor);
    const [chosenColor, setChosenColor] = useState('');
    // const [prevPencilColor, setPrevPencilColor] = useState('red');

    const [pencilSize, setPencilSize] = useState(defaultPencilSize);
    const [chosenPencilSize, setChosenPencilSize] = useState(null);
    // const [prevPencilSize, setPrevPencilSize] = useState(null);

    const [roadDesignChange, setRoadDesignChange] = useState(true);
    const [currentImg, setImage] = useState();
    const [topMenuHidden, setTopMenuHidden] = useState(true);
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [draggables, setDraggables] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [deletingItemId, setDeletingItemId] = useState(null);
    const [extensionType, setExtensionType] = useState('Vanlig');

    /**
     * useEffect that is triggered when currentImg is changed
     * Will clear the canvas and delete all objects on the screen
     */
    useEffect(() => {
        if (roadDesignChange) {
            clearCanvas();
        }
    }, [currentImg]);

    /**
     * Changes the pencil color according to user input
     * @param {String} color
     */
    const onPaletteColorChange = (color) => {
        setPencilColor(color);
    };

    /**
     * Changes the pencil color and size when switching between eraser and pencil
     */
    const onEraserPencilSwitch = useCallback(() => {
        if (pencilColor === eraserColor) {
            setPencilColor(chosenColor);
            setPencilSize(chosenPencilSize);
        } else {
            setPencilColor(pencilColor);
            setPencilSize(pencilSize);
        }
    }, [pencilColor]);

    /**
     * Function to change the pencil brush size
     * @param {int} newPencilSize
     */
    const onChangePencilSize = (newPencilSize) => {
        setPencilSize(newPencilSize);
        setChosenPencilSize(newPencilSize);
    };

    /**
     * Function to undo the previous action of the user
     * will remove strokes or draggables
     * Does not unto draggable movements
     */
    const undoChange = useCallback(() => {
        if (actionList.length == 0) return;

        const copyList = [...actionList];
        const lastItem = copyList.pop();

        if (lastItem.type == 'stroke') {
            sketchRef.current.undo();
        } else if (lastItem.type == 'draggable') {
            setDeletingItemId(lastItem.id);
        } else {
            console.warn('error occured with deleting');
        }

        setActionList(copyList);
    }, [actionList]);

    /**
     * When strokeEnded the added path/stroke
     * is added to actionList to keep track of undo actions
     */
    const onStrokeEnd = useCallback(() => {
        setActionList([...actionList, { type: 'stroke' }]);
    });

    /**
     * Function to clear the canvas and set draggables to empty list
     * Only clear canvas if roadDesignChange is true
     */
    const clearCanvas = useCallback(() => {
        // if (roadDesignChange) {
        sketchRef.current.clear();
        setDraggables([]);
        // }
    });

    /**
     * Function to set the pencil to an eraser
     */
    const eraser = () => {
        if (pencilColor != eraserColor) {
            setChosenColor(pencilColor);
            setChosenPencilSize(pencilSize);
            setPencilColor(eraserColor);
            setPencilSize(eraserSize);
        }
    };

    /**
     * Function to hide the bottomsheet when user starts
     * drawing on the canvas
     */
    const onStrokeStart = useCallback(() => {
        if (bottomSheetHidden == false)
            setBottomSheetHidden(!bottomSheetHidden);
    }, [bottomSheetHidden]);

    /**
     * Function to toggle the topmenu to hidden or not hidden
     */
    const toggleMenu = () => {
        setTopMenuHidden(!topMenuHidden);
    };

    return (
        <MainView>
            <View style={bottomSheetHidden ? styles.noOverlay : styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={() => setBottomSheetHidden(true)}>
                    <View style={{ flex: 1 }}></View>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.main}>
                <SketchHeader
                    onEraserPencilSwitch={onEraserPencilSwitch}
                    undoChange={undoChange}
                    clearCanvas={clearCanvas}
                    eraser={eraser}
                    onPaletteColorChange={onPaletteColorChange}
                    navigation={props.navigation}
                    name={props.name}
                    topMenuHidden={toggleMenu}
                    toggleRightMenuState={topMenuHidden}
                    onChangePencilSize={onChangePencilSize}
                    pencilColor={pencilColor}
                    pencilSize={pencilSize}
                    chosenColor={chosenColor}
                />
                <ImageBackground
                    resizeMode={'cover'}
                    style={styles.backgroundImage}
                    source={currentImg}>
                    <SketchCanvas
                        onStrokeStart={() => onStrokeStart()}
                        onStrokeEnd={() => onStrokeEnd()}
                        ref={sketchRef}
                        style={styles.sketchCanvas}
                        strokeColor={pencilColor}
                        strokeWidth={pencilSize}
                    />

                    <DraggableWithEverything
                        draggables={draggables}
                        setDraggables={setDraggables}
                        topMenuHidden={topMenuHidden}
                        deletingItemId={deletingItemId}
                        name={props.name}
                        setActionList={setActionList}
                        actionList={actionList}
                        extensionType={extensionType}
                        setExtensionType={setExtensionType}
                    />
                </ImageBackground>
            </View>

            <BottomMenuAnimated
                roadType={props.name}
                setImage={setImage}
                setRoadDesignChange={setRoadDesignChange}
                extensionType={extensionType}
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}
            />
        </MainView>
    );
});

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.sketchBackground,
        justifyContent: 'center',
    },

    sketchCanvas: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    noOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        // height: '100%',
        // width: '100%',
        zIndex: -100,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 10,
    },
    backgroundImage: {
        flex: 1, // Denne må fjernes hvis bildet ikke skal skalere opp
        // marginVertical: 100,
        width: '100%',
        height: '100%', // Må stå som 'undefined'
        // aspectRatio: 1752 / 2263,
        // alignSelf: 'center', // Må stå som 'stretch' hvis bildet ikke skal skalere opp
        backgroundColor: Colors.sketchBackground,
    },
});

export default SketchArea;
