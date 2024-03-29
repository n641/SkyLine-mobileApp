import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'

const OnboardingItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.Container, { width: width }]}>

            <Image source={item.image} style={[styles.image, { width: width, resizeMode: 'contain' }]} />

            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={{maxHeight:60}}>
                <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>

        </View>
    )
}

export default OnboardingItem

const styles = StyleSheet.create({
    Container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems:'center'
    },
    title: {
        fontFamily:'item',
        fontStyle: 'normal',
        fontweight: 400,
        color: "#ededed",
        fontSize: 41,
        marginBottom:10,
        textAlign:'center',
    },
    description: {
        fontFamily:'item',
        fontStyle: 'normal',
        fontweight: 400,
        color: "#ededed",
        fontSize: 16,
        paddingHorizontal: 50,
        textAlign:'center',
        
    }
})