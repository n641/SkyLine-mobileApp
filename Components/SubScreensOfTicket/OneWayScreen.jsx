import { StyleSheet, Text, View, TextInput, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React from 'react'
import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
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


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function OneWayScreen({ navigation }) {
    const [From, setFrom] = React.useState();
    const [to, setTo] = React.useState();
    const [Class, setClass] = useState();

    const handleFrom = (text) => {
        setFrom(text)
        setShowFromList(true)
        setShowToList(false)
    }

    const handleTo = (text) => {
        setTo(text)
        setShowFromList(false)
        setShowToList(true)
    }

    const [Adult, setAdult] = useState(0);
    const [Children, setChildren] = useState(0);
    const [infant, setinfant] = useState(0)
    const [TextOfPassenger, setTextOfPassenger] = useState("Click to choose passengers")

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const HandleDate = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(!show);
        setDate(currentDate);
        console.log(currentDate)
    };
    const showMode = (currentMode) => {
        setShow(!show);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    }

    const [IsOpen, setIsOpen] = useState(false)
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "48%"], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            setIsOpen(true);
        }, 100);
    }, []);

    const handleSheetChanges = useCallback((index) => {
        setTextOfPassenger(`Adults: ${Adult} , Children: ${Children} ,  infant: ${infant}`)
    }, [Adult, Children, infant]);

    // /////////////////////////////////////////////////
    const [CountriesFrom, setCountriesFrom] = useState([
        'Cairo'
    ])

    const [CountriesTo, setCountriesTo] = useState([
        'Istanbul'
    ])

    const [Classes, setClasses] = useState([
        'First A',
        'Business',
        'Economy'
    ])

    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState([])



    const setDataforSearch = useCallback(() => {
        const from = new Set();
        const too = new Set();
        Data?.map((item) => {
            from.add(item.from)
            too.add(item.to)
        })
        setCountriesFrom(Array.from(from));
        setCountriesTo(Array.from(too))


    }, [Data])

    const fetchData = async () => {
        const resp = await fetch("https://skyline-backend.cyclic.app//api/v1/flights?fields=from,to");
        const data = await resp.json();
        setData(data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        setDataforSearch();
    }, []);

    useEffect(() => {
        setDataforSearch();
    }, [Data]);

    const [ShowFromList, setShowFromList] = useState(false)
    const [TicketsFrom, setTicketsFrom] = useState([])

    const filteredFroms = (text) => {
        if (text) {
            if (!From?.length) return;
            let temp = [];
            CountriesFrom.map((m) => {
                m.toUpperCase()
                    .includes(text.toUpperCase()) ? temp.push(m) : null
            })
            setTicketsFrom(temp);
        } else {
            setTicketsFrom(CountriesFrom)
        }
    }

    const [ShowToList, setShowToList] = useState(false)
    const [TicketsTo, setTicketsTo] = useState([])

    const filteredTo = (text) => {
        if (text) {
            if (!to?.length) return;
            let temp = [];
            temp.push("Every Thing")
            CountriesTo.map((m) => {
                m.toUpperCase()
                    .includes(text.toUpperCase()) ? temp.push(m) : null
            })
            setTicketsTo(temp);
        } else {
            setTicketsTo(CountriesTo)
        }
    }

    const renderItem = (array, string) => {
        return (
            <ScrollView style={{ backgroundColor: 'black', position: 'absolute', top: string == "from" ? height / 8 : height / 8, left: string == "from" ? 50 : 150, padding: 10, maxHeight: height / 6, width: width / 2.5 }}>
                <View style={{ justifyContent: 'flex-end' }}>
                    {array.map((e, i) => {
                        return (
                            <View key={i}>
                                <TouchableOpacity
                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        string == 'from' ? setFrom(e) : setTo(e)
                                        string == 'from' ? setShowFromList(false) : setShowToList(false)
                                    }}
                                >
                                    <Text style={{ color: 'white', fontFamily: 'item', fontSize: 25, textAlign: 'center' }}>{e}</Text>
                                </TouchableOpacity>

                                <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'center', width: width / 2.5, textAlign: 'center' }} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

            {loading &&
                <View style={{
                    width: width,
                    height: height,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size="large" color={'#00ff00'} />
                </View>
            }

            <View style={styles.inputContainer}>
                <View
                    style={{ margin: 10 }}>

                    {/* /////////////////////////////from countries ///////////////////////////////////// */}

                    <View style={{ marginBottom: -20 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginBottom: -10 }}>
                            <Text style={styles.label}>From</Text>
                            <Text style={styles.astrisk}>*</Text>
                        </View>

                        <View>
                            <TextInput
                                style={[{
                                    width: width - 90,
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: 25,
                                    margin: 10
                                }]}
                                onChangeText={handleFrom}
                                value={From}
                                placeholder='Enter your location'
                                placeholderTextColor={'gray'}
                                onChange={() => {
                                    filteredFroms(From)
                                }}
                                onFocus={() => {
                                    setShowFromList(true)
                                    setShowToList(false)
                                }}
                                onKeyPress={() => {
                                    setShowFromList(false)
                                }}
                            />

                        </View>
                    </View>

                    {/* /////////////////////////////////////to countries//////////////////////////////////////// */}

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

                <View style={{

                    margin: 10
                }} >

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 3, marginBottom: -10, margin: -20 }}>
                        <Text style={styles.label}>To</Text>
                        <Text style={styles.astrisk}>*</Text>
                    </View>

                    <View>
                        <TextInput
                            style={[{
                                width: width - 90,
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: 25,
                                margin: 10
                            }]}
                            onChangeText={handleTo}
                            value={to}
                            placeholder='Enter your destination'
                            placeholderTextColor={'gray'}
                            onChange={() => {
                                filteredTo(to)
                            }}
                            onFocus={() => {
                                setShowToList(true)
                                setShowFromList(false)

                            }}
                            onKeyPress={() => {
                                setShowToList(false)
                            }}
                        />

                    </View>

                </View>
            </View>



            {/* //////////////////////////////////Date/////////////////////////////////////////// */}

            <TouchableOpacity style={styles.DateContainer}
                // onPress={showDatepicker}
                onPress={() => {
                    showDatepicker()
                    setShowFromList(false)
                    setShowToList(false)
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.label}>departure </Text>
                    <Text style={styles.astrisk}>*</Text>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={styles.text}>  {date.toJSON().substring(0, 10)}</Text>
                        <AntDesign name="calendar" size={30} color="white" />
                    </View>
                </View>
                {show &&
                    (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={HandleDate}
                            disabled="spinner"
                            dateFormat='yyyy-mm-dd'
                        />
                    )
                }
            </TouchableOpacity>


            {ShowFromList && TicketsFrom?.length != 0 &&
                renderItem(TicketsFrom, "from")

            }

            {ShowToList && TicketsTo?.length != 0 &&
                renderItem(TicketsTo, "to")
            }

            {/* //////////////////////////////////class////////////////////////////////// */}

            <View style={[styles.DateContainer]} onPress={() => {
                setShowFromList(false)
                setShowToList(false)
            }} >

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

            {/* ////////////////////////////passengers////////////////////////////// */}

            {/* <View style={[styles.DateContainer]} >

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginStart: 10, marginBottom: -10 }}
                >
                    <Text style={styles.label}>Passengers</Text>
                    <Text style={styles.astrisk}>*</Text>
                </View>


                <TouchableOpacity
                    onPress={() => { handlePresentModalPress() }}
                    style={{ margin: 10, marginLeft: 25 }}>
                    <Text style={styles.text}>{TextOfPassenger}</Text>
                </TouchableOpacity>
            </View> */}

            <View style={{ margin: 20, marginBottom: 50 }}>
                <MainButton title='Search' onClick={() => {
                    navigation.navigate("ResultTicketsScreen",
                        { from: From, to: to, classes: Class, date: date.toJSON().substring(0, 10) })
                }} />
            </View>

            {/* <BottomSheetModalProvider>
                <Animated.View style={styles.container}>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        onDismiss={() => {
                            handleSheetChanges()
                            setIsOpen(false)
                        }}
                    >
                        <Animated.View style={styles.contentContainer}>
                            <Text style={styles.titlePassengers}> Passengers</Text>
                            <View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                                    <Text style={{ fontSize: 19 }} >Adults</Text>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <AntDesign name="minuscircle" size={24} color="black" onPress={() => { Adult <= 0 ? null : setAdult(Adult - 1) }} />
                                    </View>
                                    <Text style={{ fontSize: 19 }}>{Adult}</Text>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <AntDesign name="pluscircle" size={24} color="black" onPress={() => { setAdult(Adult + 1) }} />
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                                    <Text style={{ fontSize: 19 }} >Children</Text>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <AntDesign name="minuscircle" size={24} color="black" onPress={() => { Children <= 0 ? null : setChildren(Children - 1) }} />
                                    </View>
                                    <Text style={{ fontSize: 19 }}>{Children}</Text>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <AntDesign name="pluscircle" size={24} color="black" onPress={() => { setChildren(Children + 1) }} />
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                                    <Text style={{ fontSize: 19 }} >infant</Text>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <AntDesign name="minuscircle" size={24} color="black" onPress={() => { infant <= 0 ? null : setinfant(infant - 1) }} />
                                    </View>
                                    <Text style={{ fontSize: 19 }}>{infant}</Text>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <AntDesign name="pluscircle" size={24} color="black" onPress={() => { setinfant(infant + 1) }} />
                                    </View>
                                </View>

                            </View>
                        </Animated.View>
                    </BottomSheetModal>
                </Animated.View>
            </BottomSheetModalProvider> */}


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
        padding: 4,
        width: width - 70

    },
    text: {
        fontFamily: 'item',
        fontSize: 22,
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