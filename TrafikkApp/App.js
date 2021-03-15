import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import Navigator from './components/drawerComponents/Navigator';
import USER_KEYS from './components/helpers/storageKeys';
import { readData, saveData } from './components/helpers/useAsyncStorage';
import AppContext from './AppContext';

const App = () => {
    const [theme, setTheme] = useState('');
    const [penColor, setPenColor] = useState('');
    const [draggableColor, setDraggableColor] = useState('');
    const [deleteOnChange, setDeleteOnChange] = useState('');
    const [eraserSize, setEraserSize] = useState('');

    useEffect(() => {
        readData(USER_KEYS.THEME_KEY, setTheme, 'Mørk');
        readData(USER_KEYS.PEN_COLOR_KEY, setPenColor, '#20303C');
        readData(USER_KEYS.DRAGGABLE_COLOR_KEY, setDraggableColor, '#e09f3e');
        readData(USER_KEYS.DELETE_KEY, setDeleteOnChange, 'Ja');
        readData(USER_KEYS.ERASER_SIZE_KEY, setEraserSize, '80');
    }, []);

    const saveNewSettings = (value, setValue, key) => {
        saveData(key, value);
        setValue(value);
    };

    const userSettings = {
        theme: theme,
        penColor: penColor,
        draggableColor: draggableColor,
        deleteOnChange: deleteOnChange,
        eraserSize: eraserSize,
        saveNewSettings,
        setTheme,
        setPenColor,
        setDraggableColor,
        setDeleteOnChange,
        setEraserSize,
    };

    return (
        <AppContext.Provider value={userSettings}>
            <MenuProvider>
                <NavigationContainer>
                    <Navigator />
                </NavigationContainer>
            </MenuProvider>
        </AppContext.Provider>
    );
};

export default App;
