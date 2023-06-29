import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { FirestoreDB, FirebareAuth } from '../../FirebaseConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookDetails from '../BookDetails';

const Stack = createNativeStackNavigator();

const Wishlist = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'Wishlist' }} />
      <Stack.Screen name="BookDetails" component={BookDetails} options={{ title: 'Book Details' }} />
    </Stack.Navigator>
  );
};

const WishlistScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortedByAuthor, setSortedByAuthor] = useState(false);

  useEffect(() => {
    const user = FirebareAuth.currentUser;
    if (user) {
      const booksRef = collection(FirestoreDB, 'books');
      const q = query(booksRef, where('inWishlist', '==', true), where('userId', '==', user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setBooks(data);
      });

      return () => unsubscribe();
    }
  }, []);

  const handleSearch = () => {
    const user = FirebareAuth.currentUser;
    if (user) {
      const booksRef = collection(FirestoreDB, 'books');
      const q = query(
        booksRef,
        where('inWishlist', '==', true),
        where('userId', '==', user.uid),
        where('bookName', '==', searchText)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setBooks(data);
      });

      return () => unsubscribe();
    }
  };

  const handleSortByAuthor = () => {
    const user = FirebareAuth.currentUser;
    if (user) {
      const booksRef = collection(FirestoreDB, 'books');
      const q = query(
        booksRef,
        where('inWishlist', '==', true),
        where('userId', '==', user.uid),
        orderBy('authorName')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setBooks(data);
      });

      return () => unsubscribe();
    }
  };

  const navigateToBookDetails = (book) => {
    navigation.navigate('BookDetails', { book });
    console.log('Navigate to book details:', book);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigateToBookDetails(item)}
    >
      <Text style={styles.bookName}>{item.bookName}</Text>
      <Text style={styles.authorName}>{item.authorName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search by book name"
        />
                <Button color="#654E92" title="Search" onPress={handleSearch} />
      </View>

      <View style={styles.sortContainer}>
        <Button
          color="#654E92"
          title={sortedByAuthor ? 'Sorted by Author (A-Z)' : 'Sort by Author (A-Z)'}
          onPress={handleSortByAuthor}
        />
      </View>

      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  sortContainer: {
    marginBottom: 10,
  },
  bookItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  bookName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 14,
  },
});

export default Wishlist;


