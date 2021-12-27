import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';

const App = () => {
  const [masterData, setMasterData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const FetchData = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    fetch(apiUrl)
      .then(response => response.json())
      .then(responseData => setMasterData(responseData));
  };

  useEffect(() => {
    FetchData();
  }, []);

  const RenderItems = ({item}) => (
    <View style={styles.cardContainer}>
      <Text style={styles.heading}>{item.title}</Text>
      <Text style={styles.description}>{item.body}</Text>
    </View>
  );

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      setFilteredData(masterData);
      setSearchText(text);
    }
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Search Functionality</Text>
        <TextInput
          placeholder="search here"
          style={styles.textInp}
          data={searchText}
          onChangeText={text => searchFilter(text)}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={RenderItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffa',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 20,
  },
  textInp: {
    fontSize: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    fontSize: 15,
  },
  parentContainer: {},
  title: {
    fontSize: 30,
  },
  textContainer: {},
});

export default App;
