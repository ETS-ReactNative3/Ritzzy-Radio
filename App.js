

































import React, { Component, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
    TouchableOpacity,
  Image,
  ImageBackground,Dimensions,
  AsyncStorage,
} from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { NavigationContainer } from '@react-navigation/native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Homepage from './homepage';


import Storage from 'react-native-storage';
import AppIntroSlider from 'react-native-app-intro-slider';


import Icon from 'react-native-vector-icons/AntDesign';
import Getstarted from './getstarted';
import axios from 'react-native-axios';

let forward=false
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


export class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
      name:'',
      imagelink:'',
      email:'',
      userInfo:[],
      splash:0,
        isVisible: true,

    }
  }

  static navigationOptions = {
    header: null,
    headerMode: 'none'
  }



  splashscreen=()=>{
    setInterval(() => {

    this.setState({splash:false})


    }, 3000);


  }



  componentDidMount() {
      var that = this;


      setTimeout(function () {

          that.Hide_Splash_Screen();

      }, 2000);
      storage
          .load({
              key: 'loginState',

              // autoSync (default: true) means if data is not found or has expired,
              // then invoke the corresponding sync method
              autoSync: true,

              // syncInBackground (default: true) means if data expired,
              // return the outdated data first while invoking the sync method.
              // If syncInBackground is set to false, and there is expired data,
              // it will wait for the new data and return only after the sync completed.
              // (This, of course, is slower)
              syncInBackground: true,

              // you can pass extra params to the sync method
              // see sync example below
              syncParams: {
                  extraFetchOptions: {
                      // blahblah
                  },
                  someFlag: true
              }
          })
          .then(ret => {
              this.setState({loggedIn:ret.Login,name:ret.name,email:ret.email,imagelink:ret.image})



          })
          .catch(err => {
              // any exception including data not found
              // goes to catch()
              console.warn(err.message);
              switch (err.name) {
                  case 'NotFoundError':
                      // TODO;
                      break;
                  case 'ExpiredError':
                      // TODO
                      break;
              }
          });





















    GoogleSignin.configure({
      webClientId: '299091212616-t4opr5tgnn51nh74kfdvjkusifjsku1m.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceConsentPrompt: true,
    });







  }









  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();


      this.setState({ userInfo: userInfo, loggedIn: true });



      storage.save({
        key: 'loginState', // Note: Do not use underscore("_") in key!
        data: {
          Login:this.state.loggedIn,
          name:this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name,
          email:this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email,
          image:this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.photo,
        },

        // if expires not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: null
      });


      this.props.navigation.navigate('Appintro')




// load






    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({ loggedIn: false });
      } else {
        // some other error
        this.setState({ loggedIn: false });
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null, loggedIn: false });
     // Remember to remove the user from your app's state as well
    } catch (error) {
      navigation.navigate('Details')
    }
  };





    Hide_Splash_Screen = () => {

        this.setState({
            isVisible: false,

        });

    };







  render()




  {







      let Splash_Screen = (

          <View style={{
              justifyContent: 'center',
              flex: 1,
              margin: 10,
              position: 'absolute',
              width: '100%',
              height: '100%',
          }}>

              <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  flex: 1,
                  margin: 20,
              }}>

                  {/* Put all your components Image and Text here inside Child view which you want to show in Splash Screen. */}

                  <Image source={require('./images/splash.jpg')}
                         style={{
                             width: '100%',
                             height: '100%',
                             alignSelf: 'center',
                             resizeMode: 'contain',
                             flex: 1,
                         }}/>

              </View>


          </View>);


      if (this.state.isVisible === true) {
          return (
              <View style={{flex: 1, backgroundColor: '#fff'}}>


                  {
                      (this.state.isVisible === true) ? Splash_Screen : Splash_Screen
                  }


              </View>
          );
      }


      if (!this.state.loggedIn) {
          return (
             <View style={{flex: 1}}>



                    <View style={{flex: 1}}>
                      <View style={{flex: .65}}>
                        <View style={{justifyContent: 'center', margin: 15, alignSelf: 'center', flex: .9}}>
                          <Image source={require('./images/ritzzyradio.png')} style={{alignSelf: 'center',}}/>
                        </View>
                        <Text style={{alignSelf: 'center', fontSize: 25, fontWeight: 'bold'}}>Sign Up</Text>

                      </View>
                      <View style={{flex: .35, alignSelf: 'center'}}>
                        {/*<GoogleSigninButton*/}
                        {/*   style={{ width: 250, height: 58 }}*/}
                        {/*   size={GoogleSigninButton.Size.Wide}*/}
                        {/*   color={GoogleSigninButton.Color.Dark}*/}
                        {/*   onPress={this._signIn}*/}
                        {/*   disabled={this.state.isSigninInProgress} />*/}


                        <TouchableOpacity style={{
                          height: 70,
                          width: deviceWidth - 60,
                          borderRadius: 15,
                          backgroundColor: '#EF1A4C',
                          justifyContent: 'center'
                        }} onPress={() => this._signIn()}>

                          <Text style={{textAlign: 'center', color: 'white'}}>Sign in with Google</Text>
                        </TouchableOpacity>


                      </View>

                      <View>
                        {this.state.loggedIn && <Button onPress={this.signOut}
                                                        title="Signout"
                                                        color="#841584">
                        </Button>}
                      </View>

                    </View>







              </View>






    );
  }

   else {
       return (
           this.props.navigation.navigate('Details')

       )

      }
   }

}





export  class Appintro extends React.Component {
  static navigationOptions = {
    header: null,

  }

  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      loggedIn: false,
      name:'',
      imagelink:'',
      email:'',
      url:[]
      //To show the main page of the app
    };
  }

  componentDidMount(): void {


    storage
        .load({
          key: 'loginState',

          // autoSync (default: true) means if data is not found or has expired,
          // then invoke the corresponding sync method
          autoSync: true,

          // syncInBackground (default: true) means if data expired,
          // return the outdated data first while invoking the sync method.
          // If syncInBackground is set to false, and there is expired data,
          // it will wait for the new data and return only after the sync completed.
          // (This, of course, is slower)
          syncInBackground: true,

          // you can pass extra params to the sync method
          // see sync example below
          syncParams: {
            extraFetchOptions: {
              // blahblah
            },
            someFlag: true
          }
        })
        .then(ret => {
          this.setState({loggedIn:ret.Login,name:ret.name,email:ret.email,imagelink:ret.image})

        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // TODO;
              break;
            case 'ExpiredError':
              // TODO
              break;
          }
        });



  }

  postdata=()=>{




    fetch('http://3.7.73.13:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },


      body: JSON.stringify({
       name:this.state.name,
       email:this.state.email
      })

    }).then((response) => {


      this.getuser()

      return response.json()



    }).then((jsondata) => {
      this.setState({data: jsondata})
    }).done()



  }

  getuser=()=>
  {
    axios.get(`http://3.7.73.13:3000/getuser/`+this.state.email)
        .then((res)=>{
          const url=res.data
          this.setState({url})


        })




  }

  _onDone = () => {
    // After user finished the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({showRealApp: true});
      this.postdata()
      this.props.navigation.navigate('getstarted')



    })


    storage.save({
      key: 'splash', // Note: Do not use underscore("_") in key!
      data: {
        splash:true,

      },

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    });



  }


  _onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({showRealApp: true});
      this.postdata()


      this.props.navigation.navigate('getstarted')
    })

      storage.save({
          key: 'splash', // Note: Do not use underscore("_") in key!
          data: {
              splash:true,

          },

          // if expires not specified, the defaultExpires will be applied instead.
          // if set to null, then it will never expire.
          expires: null
      });
  }

  _renderNextButton = () => {
    return (
        <View style={styles.buttonCircle}>
          <Icon name="stepforward" size={17} color="black"/>

        </View>
    );
  };
  _renderDoneButton = () => {
    return (
        <View style={styles.buttonCircle}>
          <Icon name="check" size={17} color="black"/>

        </View>
    );
  };

  _renderskipButton = () => {
    return (
        <View style={styles.buttonCircle}>
          <Icon name="doubleright" size={17} color="black"/>
        </View>

    )
  }


  render() {

    return (


        <AppIntroSlider
            style={{backgroundColor: '#f3f3f3', color: '#111'}}
            slides={slides1}
            //comming from the JsonArray below
            onDone={() => this._onDone()}
            //Handler for the done On last slide
            showSkipButton={true}
            onSkip={() => this._onSkip()}
            renderSkipButton={this._renderskipButton}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}


        />


    )


  }
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,





  },
  text: {
    color: '#111',
    fontSize: 20,
    padding:15,justifyContent:'center',alignSelf:'center',alignItems:'center',

  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111',
    backgroundColor: 'transparent',
    padding:15,

  },
  MainContainer:
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:  20,

      },

  SplashScreen_RootView:
      {
        justifyContent: 'center',
        flex:1,
        margin: 10,
        position: 'absolute',
        width: '100%',
        height: '100%',

      },

  SplashScreen_ChildView:
      {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flex:1,
        margin: 20,
      },

  TouchableOpacity_Style:{

    width:25,
    height: 25,
    top:9,
    right:9,
    position: 'absolute'

  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#C3C3C3',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

});






const slides1 = [
  {
    key: 's1',
    text: 'Best Content offers here!!!',
    title: 'Fitness Guide',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: {
      uri:"https://firebasestorage.googleapis.com/v0/b/e2lpython.appspot.com/o/intro1.gif?alt=media&token=49172c7c-a280-466e-97e8-b51da91b801f"
    }
         ,
    imageStyle: styles.image,


    justifyContent:"flex-start",

    alignSelf: 'center',


  },
  {
    key: 's2',
    title: 'Enjoy all of our services',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/e2lpython.appspot.com/o/oie_2521337BXWPfP3c.gif?alt=media&token=1d7b15c3-f718-4ab9-8e79-45175c8edb38"},
    imageStyle: styles.image,
    justifyContent:"flex-start",

    alignSelf: 'center',

  },





  {
    key: 's3',
    title: 'Feel the Nirvana',
    titleStyle: styles.title,
    textStyle: styles.text,
    text: 'We are here for you',
    image: {
      uri: "https://firebasestorage.googleapis.com/v0/b/e2lpython.appspot.com/o/third.gif?alt=media&token=e9499a4d-6584-49c2-a5af-86b922fc8357" },
    imageStyle: styles.image,
    justifyContent:"flex-start",

    alignSelf: 'center',

  },

];

























const RootStack = createStackNavigator(
    {
      Apps:LoginController,
      Appintro:Appintro,
      Details:Homepage,
      getstarted:Getstarted,




    },
    {
      headerMode:'none',
      navigationOptions: {
        header:null
      },

      initialRouteName:'Apps'
    }


);









const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;

  }
}

























//
//
// <Fragment>
//   <StatusBar barStyle="dark-content" />
//   <SafeAreaView>
//     <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={styles.scrollView}>
//
//       <View style={{height:'100%'}}>
//
//
//         {!this.state.loggedIn &&
//
//
//         <View style={{height:'100%',width:100}}>
//           <ImageBackground source={require('./images/background.jpg')} style={{width:'100%'}}>
//
//             <View>
//               <GoogleSigninButton
//                   style={{ width: 192, height: 48 }}
//                   size={GoogleSigninButton.Size.Wide}
//                   color={GoogleSigninButton.Color.Dark}
//                   onPress={this._signIn}
//                   disabled={this.state.isSigninInProgress} />
//             </View>
//             <View>
//               {!this.state.loggedIn && <Text>You are currently logged out</Text>}
//               {this.state.loggedIn && <Button onPress={this.signOut}
//                                               title="Signout"
//                                               color="#841584">
//               </Button>}
//             </View>
//           </ImageBackground>
//
//         </View>
//
//
//
//
//
//         }
//         {this.state.loggedIn && <View>
//           <View style={styles.listHeader}>
//             <Text>User Info</Text>
//           </View>
//           <View style={styles.dp}>
//             <Image
//                 style={{ width: 100, height: 100 }}
//                 source={{ uri: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.photo }}
//             />
//           </View>
//           <View style={styles.detailContainer}>
//             <Text style={styles.title}>Name</Text>
//             <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name}</Text>
//           </View>
//           <View style={styles.detailContainer}>
//             <Text style={styles.title}>Email</Text>
//             <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email}</Text>
//           </View>
//           <View style={styles.detailContainer}>
//             <Text style={styles.title}>ID</Text>
//             <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text>
//           </View>
//         </View>}
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// </Fragment>











