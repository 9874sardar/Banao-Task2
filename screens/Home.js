import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, backgroundColor: 'lightblue' }}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 6 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('gallery')}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, padding: 6 }}>Gallery</Text>
        </TouchableOpacity>
      </View>
      <Text style={{padding:25,fontWeight:"600"}}>This is Home Page view page</Text>
    </View>
  )
}

export default Home