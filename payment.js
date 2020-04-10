


import React, { Component, Fragment,PureComponent } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    TextInput,
    Text,
    StatusBar,
    FlatList,
    Image,
    ImageBackground,
    Dimensions, AsyncStorage,
} from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';


import LinearGradient from 'react-native-linear-gradient';
import {Appintro, LoginController} from './App';
import Icon from 'react-native-vector-icons/AntDesign';
import {createStackNavigator} from 'react-navigation-stack';
import Homepage from './homepage';
import {createAppContainer} from 'react-navigation';
import axios from 'react-native-axios';
import Storage from 'react-native-storage';
import PTRView from 'react-native-pull-to-refresh';
import Carousel from 'react-native-snap-carousel';

const storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,

    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired data was found,
    // the corresponding sync method will be invoked returning
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});


let deviceWidth = Dimensions.get('window').width

let deviceHeight = Dimensions.get('window').height


import user from './homepage'
import {Getstarted} from './getstarted';
import Update from './update';
import stripe from 'tipsi-stripe'
import Button from './components/Button'
stripe.setOptions({
    publishableKey:'pk_test_5obtG2GfxhMVJK9z8lMSGc1I00sRuOzcRM'
})

export default class CardFormScreen extends PureComponent {
    static title = 'Card Form'

    state = {
        loading: false,
        token: null,
    }

    handleCardPayPress = async () => {
        try {
            this.setState({ loading: true, token: null })
            const token = await stripe.paymentRequestWithCardForm({
                // Only iOS support this options
                smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: 'Gunilla Haugeh',
                        line1: 'Canary Place',
                        line2: '3',
                        city: 'Macon',
                        state: 'Georgia',
                        country: 'US',
                        postalCode: '31217',
                        email: 'ghaugeh0@printfriendly.com',
                    },
                },
            })

            this.setState({ loading: false, token })
        } catch (error) {
            this.setState({ loading: false })
        }
    }

    makePayment=()=>{
        this.setState({loading:true}),

            axios({
                method:'POST',
                url:'https://us-central1-e2lpython.cloudfunctions.net/completePaymentWithStripe',
                data:{
                    amount:100,
                    currency:'inr',
                    token:this.state.token,
                },
            }).then(response=>{
                console.log(response)
                this.setState({loading:false})
            })
    }
    render() {
        const { loading, token } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Card Form Example
                </Text>
                <Text style={styles.instruction}>
                    Click button to show Card Form dialog.
                </Text>
                <Button
                    text="Enter you card and pay"
                    loading={loading}
                    onPress={this.handleCardPayPress}
                />
                <View
                    style={styles.token}
                  >
                    {token &&(
                        <View>
                    <Text style={styles.instruction}>
                        Token: {token.tokenId}
                    </Text>
                        <Button text=" make Pay" loading={loading} onPress={()=>this.makePayment()}/>
                        </View>

                    )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instruction: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    token: {
        height: 20,
    },
})
