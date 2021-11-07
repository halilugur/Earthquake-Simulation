import React, {Component, useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'

class App extends Component {
  constructor() {
    super()
    this.state = {
      countOfAppUse: 0,
      countOfSendToCloud: 0
    }
  }

  senTo = () => {
    let countOfAppUse = Number.parseInt(this.state.countOfAppUse)
    let countOfSendToCloud = Number.parseInt(this.state.countOfSendToCloud)
    console.info(countOfAppUse)
    console.info(countOfSendToCloud)
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} width={128} height={128} source={require('./assets/images/logo.png')} />

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Uygulamayı Kullanan Kişi Sayısı</Text>
        </TouchableOpacity>
        <View style={styles.inputView}>
          <TextInput
            keyboardType={'number-pad'}
            style={styles.TextInput}
            onChangeText={value => this.setState({countOfAppUse: value})}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Veriyi Göndermeyi Başaran Kişi Sayısı</Text>
        </TouchableOpacity>
        <View style={styles.inputView}>
          <TextInput
            keyboardType={'number-pad'}
            style={styles.TextInput}
            onChangeText={value => this.setState({countOfSendToCloud: value})}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={this.senTo}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
    marginTop: 30,
    backgroundColor: '#4BB9EC'
  },

  loginText: {
    color: '#ffffff'
  }
})

export default App
