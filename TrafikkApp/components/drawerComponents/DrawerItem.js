import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors, Typography, Icons } from '../../styles';

/**
 * Components item that are shown in the navigation drawer
 */
const DrawerItem = React.memo(
    ({ navigation, screenIndex, screenName, params }) => {
        const { icon, value, title } = params;
        return (
            <TouchableOpacity
                style={[
                    styles.menuItem,
                    {
                        backgroundColor:
                            screenIndex == value
                                ? Colors.iconActive
                                : Colors.background,
                    },
                ]}
                activeOpacity={0.2}
                onPress={() =>
                    navigation.navigate(`${screenName}`, {
                        isStatusBarHidden: false,
                    })
                }>
                <Icon
                    name={icon}
                    size={Icons.small}
                    color={
                        screenIndex == value ? Colors.textLight : Colors.icons
                    }
                    style={{ margin: 15 }}
                />
                <Text
                    style={[
                        styles.menuItemText,
                        {
                            color:
                                screenIndex == value
                                    ? Colors.textLight
                                    : Colors.icons,
                        },
                    ]}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
        color: Colors.icons,
        borderRadius: 10,
    },
    menuItemText: {
        // fontSize: 20,
        fontWeight: '300',
        margin: 12,
        textAlign: 'center',
        ...Typography.medium,
    },
});

export default DrawerItem;
