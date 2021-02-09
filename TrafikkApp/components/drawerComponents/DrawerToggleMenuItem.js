import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../styles/Colors';

const DrawerToggleMenuItem = ({ navigation, icon }) => (
    <TouchableOpacity
        style={[{ paddingBottom: 20 }, styles.menuItem]}
        activeOpacity={0.8}
        onPress={() => navigation.toggleDrawer()}>
        <Icon
            name={icon}
            size={35}
            color={Color.drawerInactiveText}
            style={{ marginTop: 10, marginLeft: 10 }}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        marginBottom: 15,
    },
});

export default DrawerToggleMenuItem;
