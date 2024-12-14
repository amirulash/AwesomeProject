/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Nama">
           Amirul Fahmi Ash-Shiddiqie
          </Section>
          <Section title="NIM">
            22/496736/SV/20997
          </Section>
          <Section title="Kelas">
           PGPBL A
          </Section>
           <Section title="Tentang Saya">
            <Text style={{ fontSize: 15, textAlign: 'justify' }}>Saya adalah mahasiswa Sekolah Vokasi UGM. Dalam menjalani hari-hari sebagai mahasiswa saya sering kali berkelana mengunjungi cafe-cafe yang unik dan menarik untuk mendukung produktivitas saya. Hal tersebut yang
              menyebabkan teman-teman sering bertanya dan meminta rekomendasi cafe yang nyaman untuk mengerjakan tugas atau diskusi. Oleh karena itu, untuk memudahkan saya memetakan cafe mana saja yang pernah saya kunjungi
              dan memberikan informasi kepada teman-teman saya, Aplikasi Couffe's Time saya buat.</Text>
          </Section>
          <Section title=""></Section>
          <View>
            <Text style={{ color: '#F5F7F8', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Top 3 Rekomendasi Cafe</Text>
            <Text></Text>
            <View style={styles.card}>
              <View style={styles.avatar}>
                {/* <Image
                  source={require('./peta/daheim.png')}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                /> */}
              </View>
              <View>
                <Text style={styles.cardtitle}>   Nama: Daheim</Text>
                <Text>   Rating: 4.7</Text>
                <Text>   Kategori: Cafe</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.card}>
              <View style={styles.avatar}>
                {/* <Image
                  source={require('./peta/ekologi.jpg')}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                /> */}
              </View>
              <View>
                <Text style={styles.cardtitle}>   Nama: Ekologi</Text>
                <Text>   Rating: 4.4</Text>
                <Text>   Kategori: Co-Working Space</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.card}>
              <View style={styles.avatar}>
                {/* <Image
                  source={require('./peta/estuary.jpg')}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                /> */}
              </View>
              <View>
                <Text style={styles.cardtitle}>   Nama: Estuary</Text>
                <Text>   Rating: 4.6</Text>
                <Text>   Kategori: Cafe</Text>
              </View>
            </View>
          </View>
          {/* <LearnMoreLinks /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
          

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'justify'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundfull: {
    backgroundColor: '#265073',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 100,
    width: 80,
  },
  fontregular: {
    color: '#000000',
  },
  cardtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#000000"
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ECF4D6',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 5,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
});


export default App;
