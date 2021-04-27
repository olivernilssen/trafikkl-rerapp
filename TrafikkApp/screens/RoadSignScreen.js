import React, { useState, useEffect, useRef } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    BottomMenuAnimated,
    Header,
    MainView,
} from '../components/reusableComponents/';
import { Colors, Typography } from '../styles';
import RoadSignModal from '../components/roadSignComponents/RoadSignModal';
import RoadSignMenuContent from '../components/roadSignComponents/RoadSignMenuContent';
import { fareSkilt } from '../assets/sign_descriptions/';

const numColumns = 4;

/**
 * Screen component for sign screen
 * Displays a list of roadsigns as images, when pressed these images will open up a
 * modal with a bigger versjon of the pressed image and the possibility of showing a description of said sign.
 * There are multiple signtypes, and it is possible to switch between these using the bottomSheetMenu
 * @namespace RoadSignScreen
 * @category Screens
 * @prop {object} navigation Used for navigation between the different screens
 */

const RoadSignScreen = React.memo(({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [bottomSheetHidden, setBottomSheetHidden] = useState(false);
    const [signType, setSignType] = useState(fareSkilt);
    const [signObjectKeys, setSignObjectKeys] = useState(Object.keys(signType));
    const [selectedSign, setSelectedSign] = useState(signObjectKeys[0]);
    const [activeSignTypeName, setActiveSignTypeName] = useState('Fareskilt');

    const ITEM_HEIGHT = 200;
    const flatListRef = useRef();

    /**
     * Handles the state of the modal, and sets the selectedSign state to the sign that has been presse.
     *@memberof RoadSignScreen
     * @param {string} item signcode used for identifying the sign
     */
    const handleModal = (item) => {
        setModalVisible(!modalVisible);
        setSelectedSign(item);
    };

    /**
     * Used for closing the RoadSignModal
     * @memberof RoadSignScreen
     */
    const closeModal = () => {
        setModalVisible(false);
    };

    /**
     * Handles the change from one signtype to another
     * @memberof RoadSignScreen
     * @param {object} signTypeName Object that contains sign- name, description and image source
     */
    const handleSignType = (signTypeName) => {
        setSignType(signTypeName);
        setSelectedSign(Object.keys(signTypeName)[0]);
    };

    /**
     * Shows or hides the bottom menu
     * @memberof RoadSignScreen
     * @param {boolean} value if true the menu will be hidden
     */
    const handleBottomSheet = (value) => {
        setBottomSheetHidden(value);
    };

    /**
     * Handles the state of activeSignTypeName, is used for displaying the name of the chosen sign type
     * @memberof RoadSignScreen
     * @param {string} headerName The name of the chosen signtype
     */
    const handleHeaderName = (headerName) => {
        setActiveSignTypeName(headerName);
    };

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    };

    const keyExtractor = (item, index) => item + index.toString();

    /**
     * Used as a template for Flattlist, every item in the data it receives is passed on to this method
     * @param {string} param0 the sign code (example: 100_1)
     * @returns an image that will open a modal when pressed
     */
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        handleModal(item);
                        handleBottomSheet(true);
                    }}>
                    <View
                        style={{
                            backgroundColor: Colors.sketchBackground,
                            width: '100%',
                            height: '100%',
                            borderWidth: 1,
                            borderColor: Colors.dividerPrimary,
                        }}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={signType[item].thumbnail}
                            resizeMode={'contain'}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const getItemLayout = (data, index) => ({
        length: Dimensions.get('screen').height / 7.5,
        offset: (Dimensions.get('screen').height / 7.5) * index,
        index,
    });

    return (
        <MainView>
            <TouchableWithoutFeedback onPress={() => closeModal()}>
                <View>
                    <RoadSignModal
                        closeModal={closeModal}
                        modalVisible={modalVisible}
                        selectedSign={signType[selectedSign]}
                        selectedSignCode={selectedSign}
                        handleBottomSheet={handleBottomSheet}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Header navigation={navigation} style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.siteHeading}>Trafikkskilt</Text>
                        <View style={styles.subHeadingContainer}>
                            <Text style={styles.subHeading}>
                                {activeSignTypeName}
                            </Text>
                        </View>
                    </View>
                </Header>
            </View>
            <FlatList
                ref={flatListRef}
                data={Object.keys(signType)}
                extraData={signType}
                style={styles.imageContainer}
                keyExtractor={keyExtractor}
                // maxToRenderPerBatch={10}
                initialNumToRender={24}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                numColumns={4}></FlatList>
            <BottomMenuAnimated
                bottomSheetHidden={bottomSheetHidden}
                setBottomSheetHidden={setBottomSheetHidden}
                chevronColor={Colors.icons}>
                <RoadSignMenuContent
                    handleSignType={handleSignType}
                    setBottomSheetHidden={setBottomSheetHidden}
                    handleHeaderName={handleHeaderName}
                    scrollToTop={scrollToTop}
                />
            </BottomMenuAnimated>
        </MainView>
    );
});

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.dividerPrimary,
        elevation: 10,
    },
    headerContent: {
        // flex: 1,
        height: '100%',
        width: '93%',
        flexDirection: 'row',
    },
    imageContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: Colors.sketchBackground,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        width: Dimensions.get('screen').width / numColumns - 3,
        height: Dimensions.get('screen').height / 7.5,
    },
    mainHeading: {
        flex: 1,
        textAlignVertical: 'bottom',
        color: Colors.icons,
        ...Typography.heading,
    },
    modalItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    siteHeading: {
        flex: 1,
        color: Colors.icons,
        textAlignVertical: 'center',
        ...Typography.heading,
    },
    subHeading: {
        flex: 1,
        textAlignVertical: 'center',
        color: Colors.icons,
        opacity: 0.7,
        ...Typography.heading,
    },
    subHeadingContainer: {
        // flex: 1,
        alignItems: 'flex-end',
    },
});

export default RoadSignScreen;
