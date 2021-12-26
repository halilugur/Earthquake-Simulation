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
      disabled: false
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
      if (countOfAppUse === 0 || countOfSendToCloud === 0) {
        Alert.alert('Warning (Uyarı)', 'Please fill required fields.\nLütfen gerekli alanları doldurun.')
      } else {
        if (this.checkUseThreshold(countOfSendToCloud, 0, countOfAppUse, 0, 100)) {
          this.setState({disabled: true})
          fetch('https://ugurhalil.com/wp-json/earthquake/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              count_of_app_use: countOfAppUse,
              count_of_send_to_cloud: countOfSendToCloud,
              is_read_by_device: false
            })
          }).then(result => {
            result.status === 200 ? Alert.alert('Success (Başarılı)', 'Data sent.\nVeri gönderildi.') :
              Alert.alert('Fail (Başarısız)', 'Data could not be sent.\nVeri gönderilemedi.')
            this.setState({
              countOfAppUse: 0,
              countOfSendToCloud: 0,
              disabled: false
            })
          })
        } else {
          Alert.alert('Warning (Uyarı)', 'Data could not be sent because the threshold value could not be exceeded (expected %70).\nEşik değeri aşılamadığından veri gönderilemedi (Beklenen %70).')
        }
      }
    }
  }

  checkUseThreshold = (x:number, in_min:number, in_max:number, out_min:number, out_max:number) => {
    let mapTo = ((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
    return mapTo >= 70
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.centeredView}>
            <Image style={styles.image} source={require('./assets/images/logo.png')} />
          </View>
          <View>
            <View style={styles.centeredView}>
              <Text style={styles.mainText}>Number of People Using the Application</Text>
              <Text style={styles.infoText}>( Uygulamayı Kullanan Kişi Sayısı )</Text>
            </View>
            <View style={styles.centeredView}>
              <TextInput
                style={styles.textInput}
                keyboardType={'number-pad'}
                onChangeText={value => this.setState({countOfAppUse: value})}
              />
            </View>
          </View>
          <View>
            <View style={styles.centeredView}>
              <Text style={styles.mainText}>Number of Persons Succeeding in Sending Data</Text>
              <Text style={styles.infoText}>( Veriyi Göndermeyi Başaran Kişi Sayısı )</Text>
            </View>
            <View style={styles.centeredView}>
              <TextInput
                style={styles.textInput}
                keyboardType={'number-pad'}
                onChangeText={value => this.setState({countOfSendToCloud: value})}
              />
            </View>
          </View>
          <View style={styles.centeredView}>
            <TouchableOpacity style={this.state.disabled ? styles.sendButtonPassive : styles.sendButtonActive}
                              onPress={this.senTo}>
              <Text style={{fontSize: 28}}>SEND TO CLOUD</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B9DD39'
  },
  centeredView: {
    alignItems: 'center',
    marginTop: 15
  },
  image: {
    marginTop: 20,
    width: 256,
    height: 256
  },
  mainText: {
    fontSize: 26,
    textAlign: 'center',
    color: '#000000'
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2d2d2d'
  },
  textInput: {
    width: '70%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    color: '#000000',
    fontSize: 28,
    textAlign: 'center'
  },
  sendButtonActive: {
    marginTop: 30,
    borderWidth: 2,
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4BB9EC',
    borderRadius: 30
  },
  sendButtonPassive: {
    marginTop: 30,
    borderWidth: 2,
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f3f3f',
    borderRadius: 30
  }
})

export default App
