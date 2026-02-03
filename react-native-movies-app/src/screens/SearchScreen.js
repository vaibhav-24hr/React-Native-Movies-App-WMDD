import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import Dropdown from '../components/Dropdown';
import { Ionicons } from '@expo/vector-icons'; // correct import
import { searchMedia } from '../services/api';
import MediaCard from '../components/MediaCard';
import Loading from '../components/Loading';
import { Colors } from '../constants/Colors';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('multi');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [error, setError] = useState(null);
  
  const searchTypes = [
    { label: "Multi", value: "multi" },
    { label: "Movie", value: "movie" },
    { label: "TV", value: "tv" }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    setLoading(true);
    setError(null);
    setInitiated(true);
    
    try {
      const data = await searchMedia(query, searchType);
      setResults(data);
    } catch (err) {
      setError('Failed to perform search.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (item) => {
    // For 'multi' search, media_type might be in the item
    const type = item.media_type || searchType;
    if (type === 'person') return; 
    const targetType = (type === 'movie' || type === 'tv') ? type : 'movie'; 
    const title = item.title || item.name;
    navigation.navigate('Details', { id: item.id, type: targetType, title });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>
          Search Movie/TV Show Name<Text style={styles.required}>*</Text>
        </Text>
        
        <View style={styles.inputContainer}>
            <Ionicons name="search" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
            style={styles.input}
            placeholder="i.e. James Bond, CSI"
            value={query}
            onChangeText={(text) => {
                setQuery(text);
                if (error) setError(null);
            }}
            />
        </View>
        
        <Text style={styles.label}>
          Choose Search Type<Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.pickerRow}>
            <View style={styles.dropdownWrapper}>
                <Dropdown
                    items={searchTypes}
                    selectedValue={searchType}
                    onValueChange={setSearchType}
                />
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Ionicons name="search" size={20} color="white" style={{marginRight: 5}} />
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
        </View>
        
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {loading ? (
        <Loading />
      ) : !initiated ? (
        <View style={styles.center}>
          <Text style={styles.message}>Please initiate a search</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MediaCard item={item} onViewDetails={() => handleViewDetails(item)} />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.center}>
                <Text>No results found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  form: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  inputIcon: {
      marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  pickerRow: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  dropdownWrapper: {
      flex: 2, // Take up more space
      marginRight: 10,
      backgroundColor: '#fff',
  },
  searchButton: {
      flex: 1,
      backgroundColor: Colors.accent,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48, // Match dropdown height approx
      borderRadius: 4,
  },
  searchButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default SearchScreen;
