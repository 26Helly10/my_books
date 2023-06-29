import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TextInput,  ScrollView } from 'react-native';
import { collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FirestoreDB } from '../FirebaseConfig';
import { CheckBox } from 'react-native-elements';
const BookDetails = ({ navigation, route }) => {
  const { book } = route.params;
  const [bookName, setBookName] = useState(book.bookName);
  const [authorName, setAuthorName] = useState(book.authorName);
  const [publisher, setPublisher] = useState(book.publisher);
  const [inLibrary, setInLibrary] = useState(book.inLibrary);
  const [inWishlist, setInWishlist] = useState(book.inWishlist);
  const [opinion, setOpinion] = useState(book.opinion);

  const handleDelete = async () => {
    try {
      // Delete the book from the database
      await deleteDoc(doc(FirestoreDB, 'books', book.id));

      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleModify = async () => {
    try {
      // Update the book details in the database
      await updateDoc(doc(FirestoreDB, 'books', book.id), {
        bookName,
        authorName,
        publisher,
        inLibrary,
        inWishlist,
        opinion,
      });

      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={bookName}
        onChangeText={setBookName}
      />

      <Text style={styles.label}>Author:</Text>
      <TextInput
        style={styles.input}
        value={authorName}
        onChangeText={setAuthorName}
      />

      <Text style={styles.label}>Publisher:</Text>
      <TextInput
        style={styles.input}
        value={publisher}
        onChangeText={setPublisher}
      />

      <View style={styles.checkBoxContainer}>
        <CheckBox
          title="In Library"
          checked={inLibrary}
          onPress={() => setInLibrary(!inLibrary)}
        />

        <CheckBox
          title="In Wishlist"
          checked={inWishlist}
          onPress={() => setInWishlist(!inWishlist)}
        />
      </View>

      {inLibrary && (
        <>
          <Text style={styles.label}>Opinion:</Text>
          <TextInput
            style={styles.input}
            value={opinion}
            onChangeText={setOpinion}
          />
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button color= "#654E92" title="Delete" onPress={handleDelete} />
        <Button color= "#654E92" title="Modify" onPress={handleModify} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  checkBoxContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default BookDetails;
