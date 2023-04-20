import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React from 'react'
import { useRef, useState, useMemo, useCallback } from 'react';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import MainButton from '../MainButton';

import Colors from '../../Conestant/Colors';

const width = Dimensions.get('window').width;


export default function RoundTripScreen({ navigation }) {
    const [From, setFrom] = React.useState();
    const [to, setTo] = React.useState();
    const [Class, setClass] = useState();

    const [Adult, setAdult] = useState(0);
    const [Children, setChildren] = useState(0);
    const [infant, setinfant] = useState(0)
    const [TextOfPassenger, setTextOfPassenger] = useState("Click to choose passengers")

    const [dateDeparturn, setDateDeparturn] = useState(new Date())
    const [showdateDeparturn, setShowdateDeparturn] = useState(false);

    const [Returndate, setReturndate] = useState(new Date())
    const [showReturndate, setReturndateShow] = useState(false);
    const [mode, setMode] = useState('date');

    const [IsOpen, setIsOpen] = useState(false)


    const [CountriesFrom, setCountriesFrom] = useState([
        'Egypt/Cairo',
        'Egypt/Hurgada',
    ])

    const [CountriesTo, setCountriesTo] = useState([
        'Egypt/Cairo',
        'Egypt/Hurgada',
    ])

    const [Classes, setClasses] = useState([
        'First class',
        'Business',
        'economy'
    ])


    const HandledateDeparturn = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowdateDeparturn(!showdateDeparturn);
        setDateDeparturn(currentDate);
    };
    const HandleshowdateDeparturn = (currentMode) => {
        setShowdateDeparturn(!showdateDeparturn);
        setMode(currentMode);
    };

    const HandleReturndate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setReturndateShow(!showReturndate);
        setReturndate(currentDate);
    };
    const showModeReturndate = (currentMode) => {
        setReturndateShow(!showReturndate);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        HandleshowdateDeparturn('date');
    }

    const showDatepicker2 = () => {
        showModeReturndate('date')
    }

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ["25%", "48%"], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    }, []);

    const handleSheetChanges = useCallback((index) => {
        setTextOfPassenger(`Adults: ${Adult} , Children: ${Children} ,  infant: ${infant}`)
    }, [Adult, Children, infant]);

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.inputContainer}>
                <View
                    style={{ margin: 10 }}>

                    {/* //////////////////////////////////////////////////////// */}

                    <View style={{ marginBottom: -20 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginBottom: -10 }}>
                            <Text style={styles.label}>From</Text>
                            <Text style={styles.astrisk}>*</Text>
                        </View>

                        <SelectDropdown
                            data={CountriesFrom}

                            onSelect={(selectedItem, index) => {
                                setFrom(selectedItem)
                            }}
                            defaultButtonText={CountriesFrom[0]}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem;
                            }}
                            rowTextForSelection={(item, index) => {
                                return item;
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                    </View>

                    {/* //////////////////////////////////////////////////////// */}

                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                        width: (width - 120)
                    }} />
                    <MaterialCommunityIcons name="swap-vertical-bold" size={45} color="white" />
                </View>

                <View style={{ margin: 10 }} >

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginBottom: -10, margin: -20 }}>
                        <Text style={styles.label}>To</Text>
                        <Text style={styles.astrisk}>*</Text>
                    </View>

                    <SelectDropdown
                        data={CountriesTo}

                        onSelect={(selectedItem, index) => {
                            setTo(selectedItem)
                        }}
                        defaultButtonText={CountriesTo[0]}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                </View>
            </View>

            {/* //////////////////////////////////Date2/////////////////////////////////////////// */}

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                <TouchableOpacity style={styles.DateContainer2}
                    onPress={showDatepicker}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.label}>departure </Text>
                        <Text style={styles.astrisk}>*</Text>
                    </View>

                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 0 }}>
                            <Text style={styles.text}>  {dateDeparturn.toJSON().substring(0, 10)}</Text>
                            <AntDesign name="calendar" size={25} color="white" />
                        </View>
                    </View>
                    {showdateDeparturn &&
                        (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateDeparturn}
                                mode={mode}
                                is24Hour={true}
                                onChange={HandledateDeparturn}
                                disabled="spinner"
                                dateFormat='yyyy-mm-dd'
                            />
                        )
                    }
                </TouchableOpacity>

                {/* //////////////////////////////////Date/////////////////////////////////////////// */}

                <TouchableOpacity style={styles.DateContainer2}
                    onPress={showDatepicker2}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.label}>Return </Text>
                        <Text style={styles.astrisk}>*</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 0 }}>
                            <Text style={styles.text}>  {Returndate.toJSON().substring(0, 10)}</Text>
                            <AntDesign name="calendar" size={25} color="white" />
                        </View>
                    </View>
                    {showReturndate &&
                        (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={Returndate}
                                mode={mode}
                                is24Hour={true}
                                onChange={HandleReturndate}
                                disabled="spinner"
                                dateFormat='yyyy-mm-dd'
                            />
                        )
                    }
                </TouchableOpacity>

            </View>

            {/* //////////////////////////////////class////////////////////////////////// */}

            <View style={[styles.DateContainer]} >

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginBottom: -15, marginTop: 2 }}>
                    <Text style={styles.label}>Class</Text>
                    <Text style={styles.astrisk}>*</Text>
                </View>

                <SelectDropdown
                    data={Classes}
                    onSelect={(selectedItem, index) => {
                        setClass(selectedItem)
                    }}
                    defaultButtonText={Classes[0]}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'white'} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
            </View>

            <View style={{ margin: 20, marginBottom: 50 }}>
                <MainButton title='Search' onClick={() => { navigation.navigate("ResultTicketsScreen") }} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15,
        width: width - 70
    },
    DateContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        marginTop: 25,
        padding: 6,
        width: width - 70
    },
    DateContainer2: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        marginTop: 25,
        padding: 5,
        width: width / 2 - 50,
        marginHorizontal: 13

    },
    text: {
        fontFamily: 'item',
        fontSize: width / 25,
        color: '#fff'
    },
    titlePassengers: {
        fontFamily: 'item',
        fontSize: 30,
        textAlign: 'center',
        margin: 3
    },
    dropdown1BtnStyle: {
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        width: width - 100
    },
    dropdown1BtnTxtStyle: {
        textAlign: 'left',
        fontFamily: 'item',
        fontSize: 23,
        color: '#fff'
    },
    dropdown1DropdownStyle: {
        backgroundColor: 'black',
        justifyContent: 'center',
        borderRadius: 15,
    },
    dropdown1RowStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        borderBottomColor: 'black',

    },
    dropdown1RowTxtStyle: {
        color: 'white',
        textAlign: 'left',
        fontFamily: 'item',
        fontSize: 19,
    },
    label: {
        fontFamily: 'item',
        fontSize: 25,
        color: "gray",
        textAlign: 'left',
    },
    astrisk: {
        color: Colors.Google_logo,
        margin: 3
    },
})