import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

const mosquesData = [
  {
    id: '1',
    name: 'Masjid Agung Tuban',
    location: 'Tuban, Jawa Timur',
    image: require('./peta/masjid_1.png'), // Gambar lokal
    description: 'Masjid bersejarah di pusat kota Tuban dengan arsitektur khas Jawa.'
  },
  {
    id: '2',
    name: 'Masjid Ash-Shomadiyah',
    location: 'Jenu, Tuban, Jawa Timur',
    image: require('./peta/masjid_2.png'), // Gambar lokal
    description: 'Masjid dengan suasana tenang yang terletak di area pedesaan.'
  },
  {
    id: '3',
    name: 'Masjid Sunan Bonang',
    location: 'Tuban, Jawa Timur',
    image: require('./peta/masjid_3.png'), // Gambar lokal
    description: 'Masjid yang menjadi bagian dari kompleks makam Sunan Bonang.'
  }
];

const HomeScreen = ({ navigation }) => {
  const renderMosqueItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.mosqueName}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Selamat Datang di Aplikasi Masjid Tuban</Text>
        <Text style={styles.subtitle}>
          Jelajahi masjid-masjid bersejarah dan unik di Tuban melalui aplikasi ini. Temukan masjid dengan arsitektur memukau dan nilai sejarah yang mendalam, dari Masjid Agung Tuban hingga Masjid Sunan Bonang.
        </Text>
        <Image
          source={require('./peta/masjid_agung.png')} // Gambar hero dari penyimpanan lokal
          style={styles.heroImage}
        />
      </View>

      <Text style={styles.sectionTitle}>Masjid Populer di Tuban</Text>

      <FlatList
        data={mosquesData}
        renderItem={renderMosqueItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22, // Memberikan jarak antar baris untuk kenyamanan membaca
    fontStyle: 'italic', // Membuat teks lebih elegan dan menarik
    fontWeight: '500'
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 16
  },
  listContainer: {
    paddingBottom: 20
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  image: {
    width: '100%',
    height: 150
  },
  cardContent: {
    padding: 10
  },
  mosqueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e'
  },
  location: {
    fontSize: 14,
    color: '#7f8c8d',
    marginVertical: 4
  },
  description: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 10
  }
});

export default HomeScreen;
