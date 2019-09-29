import React from 'react';
import{
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import playlistdata from '../data/playlist';

export default function PlayListScreen(){
  function Item({ artwork, title, artist }) {
    return (
      <View style={styles.item}>
        <Image style={styles.lstAlbum} source={{ uri: artwork }} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={playlistdata}
        renderItem={({ item }) => <Item title={item.title} artwork={item.artwork} artist={item.artist} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  arrow: {
    width: 30,
    height: 30,
    margin: 15,
  },
  album: {
    width: 300,
    height: 300,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 2,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  lstAlbum: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginHorizontal:10,
  }
});