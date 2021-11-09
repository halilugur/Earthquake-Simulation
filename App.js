import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native'

class App extends Component {
  constructor() {
    super()
    this.state = {
      countOfAppUse: 0,
      countOfSendToCloud: 0,
      disable: false
    }
  }

  senTo = () => {
    let countOfAppUse = Number.parseInt(this.state.countOfAppUse)
    let countOfSendToCloud = Number.parseInt(this.state.countOfSendToCloud)
    if (countOfAppUse < countOfSendToCloud) {
      let message = 'The number of people using the application cannot be less than the number of successful senders.\n\n' +
        '(Uygulamayı kullanan kişi sayısı başarılı gönderim yapan kişi sayısından küçük olamaz.)'
      Alert.alert('Warning (Uyarı)', message)
    } else {
      this.setState({
        countOfAppUse: 0,
        countOfSendToCloud: 0,
        disable: true
      })
      fetch('https://ugurhalil.com/wp-json/earthquake/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          count_of_app_use: countOfAppUse,
          count_of_send_to_cloud: countOfSendToCloud,
          is_read_by_device: false
        })
      }).then(result => {
        result.status === 200 ? Alert.alert("Success (Başarılı)", "Data sent.\nVeri gönderildi.") :
          Alert.alert("Fail (Başarısız)", "Data could not be sent.\nVeri gönderilemedi.")
        this.setState({
          disable: false
        })
      })
    }
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image style={styles.image} width={128} height={128} source={require('./assets/images/logo.png')} />

          <TouchableOpacity style={styles.text_opacity}>
            <Text style={styles.forgot_button}>Number of People Using the Application</Text>
            <Text style={styles.small_info_text}>( Uygulamayı Kullanan Kişi Sayısı )</Text>
          </TouchableOpacity>
          <View style={styles.inputView}>
            <TextInput
              keyboardType={'number-pad'}
              style={styles.TextInput}
              onChangeText={value => this.setState({countOfAppUse: value})}
            />
          </View>

          <TouchableOpacity style={styles.text_opacity}>
            <Text style={styles.forgot_button}>Number of Persons Succeeding in Sending Data</Text>
            <Text style={styles.small_info_text}>( Veriyi Göndermeyi Başaran Kişi Sayısı )</Text>
          </TouchableOpacity>
          <View style={styles.inputView}>
            <TextInput
              keyboardType={'number-pad'}
              style={styles.TextInput}
              onChangeText={value => this.setState({countOfSendToCloud: value})}
            />
          </View>

          <TouchableOpacity style={this.state.disable ? styles.loginBtnDisable : styles.loginBtn} onPress={this.senTo} disabled={this.state.disabled}>
            <Text style={styles.loginText}>SEND TO CLOUD</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9DD39',
    alignItems: 'center',
    justifyContent: 'center'
  },

  image: {
    marginBottom: 40
  },

  inputView: {
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center'
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20
  },

  forgot_button: {
    color: '#000000',
    height: 30
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#4BB9EC'
  },

  loginBtnDisable: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#555555'
  },

  loginText: {
    color: '#ffffff'
  },

  small_info_text: {
    fontSize: 10,
    color: '#383838',
    marginBottom: 5
  },

  text_opacity: {
    alignItems: 'center'
  }
})

export default App
