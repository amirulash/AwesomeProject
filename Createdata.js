import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const mosquesData = [
  {
    id: '1',
    name: 'Masjid Agung Tuban',
    location: 'Tuban, Jawa Timur',
    image: require('./peta/masjid_1.png'),
    description: 'Masjid bersejarah di pusat kota Tuban dengan arsitektur khas Jawa.'
  },
  {
    id: '2',
    name: 'Masjid Ash-Shomadiyah',
    location: 'Jenu, Tuban, Jawa Timur',
    image: require('./peta/masjid_2.png'),
    description: 'Masjid dengan suasana tenang yang terletak di area pedesaan.'
  },
  {
    id: '3',
    name: 'Masjid Sunan Bonang',
    location: 'Tuban, Jawa Timur',
    image: require('./peta/masjid_3.png'),
    description: 'Masjid yang menjadi bagian dari kompleks makam Sunan Bonang.'
  },
  {
    id: '4',
    name: 'Masjid Al-Falah',
    location: 'Kota Tuban, Jawa Timur',
    image: require('./peta/masjid_4.png'),
    description: 'Masjid yang terkenal dengan desain modern dan suasana yang nyaman.'
  },
  {
    id: '5',
    name: 'Masjid Baitul Mukminin',
    location: 'Tuban, Jawa Timur',
    image: require('./peta/masjid_5.png'),
    description: 'Masjid yang memiliki arsitektur khas dengan elemen tradisional Jawa.'
  },
  {
    id: '6',
    name: 'Masjid Al-Ikhlas',
    location: 'Tuban, Jawa Timur',
    image: require('./peta/masjid_6.png'),
    description: 'Masjid yang memiliki nuansa spiritual yang kental dan sering digunakan untuk kegiatan sosial.'
  }
];

const HomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderHomeContent = () => (
    <View style={styles.centeredContainer}>
      <Text style={styles.title}>Selamat Datang di Mosque's Map</Text>
      <Text style={styles.paragraph}>
        Aplikasi ini dirancang untuk memudahkan eksplorasi masjid-masjid bersejarah
        di Tuban, yang dikenal sebagai Bumi Wali. Tuban memiliki sejarah keislaman
        yang kaya, menjadi tempat para wali menyebarkan Islam di Jawa. Melalui aplikasi
        ini, Anda dapat mengetahui informasi tentang masjid-masjid unik di Tuban.
      </Text>
    </View>
  );

  const renderCarousel = () => (
    <View style={styles.carouselContainer}>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
      >
        <Text style={styles.arrowText}>{'<'}</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.galleryContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {mosquesData.map((mosque, index) => (
          <View
            key={mosque.id}
            style={[styles.carouselCard, index === currentIndex && styles.activeCarouselCard]}
          >
            <Image source={mosque.image} style={styles.carouselImage} />
            <Text style={styles.carouselTitle}>{mosque.name}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, mosquesData.length - 1))}
      >
        <Text style={styles.arrowText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Selamat Datang di</Text>
        <Text style={styles.interactiveText}>Mosque's Map</Text>
        <Text style={styles.subtitle}>
          Jelajahi masjid-masjid bersejarah dan unik di Tuban melalui aplikasi ini.
        </Text>
        <Image
          source={require('./peta/masjid_agung.png')}
          style={styles.heroImage}
        />
      </View>

      {/* Home Content */}
      {renderHomeContent()}

      {/* Fitur Section */}
      <Text style={styles.sectionTitle}>Fitur Aplikasi</Text>

      {/* Fitur Cards */}
      <View style={styles.featureCardsContainer}>
        <View style={styles.featureCard}>
          <Image
            source={require('./peta/mapscreen.jpg')}  // Gambar fitur halaman map
            style={styles.featureImage}
          />
          <Text style={styles.featureTitle}>Halaman Map</Text>
          <Text style={styles.featureDescription}>
            Lihat peta masjid-masjid bersejarah di Tuban yang dapat dijelajahi secara interaktif.
          </Text>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require('./peta/tambahdata.jpg')}  // Gambar fitur tambah data
            style={styles.featureImage}
          />
          <Text style={styles.featureTitle}>Fitur Tambah Data</Text>
          <Text style={styles.featureDescription}>
            Tambahkan data masjid baru ke dalam aplikasi untuk memperkaya informasi yang tersedia.
          </Text>
        </View>
      </View>

      <View style={styles.featureCardsContainer}>
        <View style={styles.featureCard}>
          <Image
            source={require('./peta/listdata.jpg')}  // Gambar fitur list data
            style={styles.featureImage}
          />
          <Text style={styles.featureTitle}>List Data Masjid</Text>
          <Text style={styles.featureDescription}>
            Lihat dan kelola data masjid yang sudah terdaftar di aplikasi.
          </Text>
        </View>
        <View style={styles.featureCard}>
          <Image
            source={require('./peta/editdata.jpg')}  // Gambar fitur edit data
            style={styles.featureImage}
          />
          <Text style={styles.featureTitle}>Edit Data Masjid</Text>
          <Text style={styles.featureDescription}>
            Edit informasi masjid yang sudah terdaftar jika ada perubahan atau penambahan.
          </Text>
        </View>
      </View>

      {/* Gallery Carousel */}
      <Text style={styles.sectionTitle}>Galeri Masjid Kabupaten Tuban</Text>
      {renderCarousel()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#1E88E5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 10,
  },
  interactiveText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFEB3B',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 16,
    textAlign: 'center',
  },
  centeredContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#455A64',
    textAlign: 'center',
    marginBottom: 20,
  },
  featureCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    backgroundColor: '#f4f6f8',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#455A64',
    marginBottom: 12,
  },
  featureImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 10,
  },
  arrowButton: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  arrowText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  galleryContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  carouselCard: {
    width: 200,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  activeCarouselCard: {
    borderColor: '#1E88E5',
    borderWidth: 2,
  },
  carouselImage: {
    width: '100%',
    height: 120,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
  },
});

export default HomeScreen;
