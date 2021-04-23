import React, { useState } from 'react';
import { 
    Alert,
    StyleSheet,    
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity

} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core';
import DateTimerPicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../lib/storage';
import { useNavigation } from '@react-navigation/core';

import waterdropImg from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
    plant: PlantProps
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

    const { params } = useRoute();
    const { plant } = params as Params;

    const { navigate } = useNavigation();

    function handlerChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS === 'android') {
            setShowDatePicker(oldValue => !oldValue);
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }

        if (dateTime) {
          setSelectedDateTime(dateTime);
        }
    }

    function handlerOpenDatePickerForAndroid() {
        setShowDatePicker(oldValue => !oldValue);
    }

    async function handleSave() {        
        try {
           await savePlant({
               ...plant,
               dateTimeNotification: selectedDateTime
           });

           navigate('Confirmation', {
            title: 'Tudo certo',
            subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
            buttonTitle: 'Muito Obrigado :D',
            icon: 'hug',
            nextScreen: 'MyPlants',
        });


        } catch {
            Alert.alert('Não foi possível salvar. 😥')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollListContainer}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controller}>
                        <View style={styles.tipContainer}>
                            <Image source={waterdropImg}
                                style={styles.tipImage} 
                            />
                            <Text style={styles.tipText}>
                                {plant.water_tips}
                            </Text>                    
                        </View>

                        <Text style={styles.alertLabe}>
                            Escolha o melhor horário para ser lembrado:
                        </Text>

                    {
                        showDatePicker && (
                                <DateTimerPicker
                                    value={selectedDateTime}
                                    mode="time"
                                    display="spinner"
                                    onChange={handlerChangeTime}
                                />
                        )}

                        {
                            Platform.OS === 'android' && (
                                <TouchableOpacity
                                    style={styles.dateTimePickerButton}
                                    onPress={handlerOpenDatePickerForAndroid}
                                >
                                <Text style={styles.dateTimePickerText}>
                                        {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                                </TouchableOpacity>
                            )
                        }

                        <Button 
                            title="Cadastrar planta"
                            onPress={handleSave}
                        />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.shape
    },    
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal:20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },   
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: "justify"

    },
    alertLabe: {
        textAlign: 'center',
        fontFamily: fonts.completement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    }
})