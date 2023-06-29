import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { collection, addDoc } from 'firebase/firestore';
import { FirestoreDB, FirebareAuth } from '../../FirebaseConfig';

const NewBook = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [publisher, setPublisher] = useState('');
  const [inLibrary, setInLibrary] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [opinion, setOpinion] = useState('');

  const saveBook = async () => {
    try {
      const user = FirebareAuth.currentUser;
      if (user) {
        const bookData = {
          bookName: bookName,
          authorName: authorName,
          publisher: publisher,
          inLibrary: inLibrary,
          inWishlist: inWishlist,
          opinion: opinion,
          userId: user.uid,
        };

        const docRef = await addDoc(collection(FirestoreDB, 'books'), bookData);
        console.log('Document written with ID: ', docRef.id);

        // Reset the form fields
        setBookName('');
        setAuthorName('');
        setPublisher('');
        setInLibrary(false);
        setInWishlist(false);
        setOpinion('');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Book Name</Text>
      <TextInput
        style={styles.input}
        value={bookName}
        onChangeText={(text) => setBookName(text)}
        placeholder="Enter book name"
      />

      <Text style={styles.label}>Author Name</Text>
      <TextInput
        style={styles.input}
        value={authorName}
        onChangeText={(text) => setAuthorName(text)}
        placeholder="Enter author name"
      />

      <Text style={styles.label}>Publisher</Text>
      <TextInput
        style={styles.input}
        value={publisher}
        onChangeText={(text) => setPublisher(text)}
        placeholder="Enter publisher"
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
        <Text style={styles.label}>Opinion</Text>
        <TextInput
          style={styles.opinionInput}
          value={opinion}
          onChangeText={setOpinion}
          placeholder="Write your opinion..."
          multiline={true}
        />
      </>
    )}

      <Button color= "#654E92" title="Save" onPress={saveBook} />
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
  opinionInput: {
    height: 100, // Initial height of the text input
    textAlignVertical: 'top', // Align the text vertically at the top
    paddingTop: 10, // Add padding at the top for better spacing
    flexGrow: 1, // Allow the text input to grow vertically
  },
});

export default NewBook;
