import React, { Component, Fragment, useState }  from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, StatusBar, Image, ActivityIndicator, TextInput, Button  } from 'react-native';
import { WebView } from 'react-native-webview';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import SmsAndroid from 'react-native-get-sms-android';
import { DeviceEventEmitter } from 'react-native';

// export default function App() {
//   return (

//       <View style={styles.container}>
//         <Text> Hello world</Text>
            
//       {/* // <WebView >
//       //   style={styles.container}
//       //   source={{ uri: 'https://hosi.vn/admin' }}
//       // /> */}
//       </View>
   
//   );
// }

import SendSMS from 'react-native-sms';
const App= () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('Happy new year!');

  const getSMSPermission = async () => {
    try {
      console.log(PERMISSIONS.ANDROID.SEND_SMS)
      const checkResult = await check(PERMISSIONS.ANDROID.SEND_SMS);
      switch (checkResult) {
        case RESULTS.DENIED:
          const requestResult = await request(PERMISSIONS.ANDROID.SEND_SMS);
          return Promise.resolve(requestResult);
        case RESULTS.GRANTED:
          return Promise.resolve(checkResult);
        default:
          return Promise.reject();
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const sendSMS = async () => {
    try {
      await getSMSPermission();
      SmsAndroid.autoSend(
        phoneNumber,
        message,
        (fail) => {
          console.log('Failed with this error: ' + fail);
        },
        (success) => {
          console.log('SMS sent successfully');
        },
      );
    } catch (err) {
      // console.log(err)
    }
  };

  var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all   
    minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
    maxDate: 1634635224000, // timestamp (in milliseconds since UNIX epoch)
  };
   
  // SmsAndroid.list(
  //   JSON.stringify(filter),
  //   (fail) => {
  //     console.log('Failed with this error: ' + fail);
  //   },
  //   (count, smsList) => {
  //     console.log('Count: ', count);
  //     console.log('List: ', smsList);
  //     var arr = JSON.parse(smsList);
   
  //     arr.forEach(function(object) {
  //       console.log('Object: ' + object);
  //       console.log('-->' + object.date);
  //       console.log('-->' + object.body);
  //     });
  //   },
  // );

  DeviceEventEmitter.addListener('sms_onDelivery', (msg) => {
    console.log(msg);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Send SMS using react-native on Android</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Phone number'}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Message'}
          onChangeText={setMessage}
          value={message}
        />
        <Button onPress={sendSMS} title="Send SMS" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
});

export default App;
