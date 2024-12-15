/**
 * Sample React Native App
 * Enhanced Profile Page
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faSchool, faCoffee, faStar, faMosque } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faFacebook, faGithub, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';

type SectionProps = {
  title: string;
  content: string;
  icon?: any;
};

function ProfileCard({ title, content, icon }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const cardStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    shadowColor: isDarkMode ? Colors.white : Colors.black,
  };

  return (
    <View style={[styles.card, cardStyle]}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          size={30}
          color={isDarkMode ? Colors.white : Colors.black}
          style={styles.cardIcon}
        />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{content}</Text>
      </View>
    </View>
  );
}

function SocialMediaLinks(): React.JSX.Element {
  const socialMedia = [
    { platform: 'Instagram', icon: faInstagram, url: 'https://instagram.com/amiruash_7' },
    { platform: 'Youtube', icon: faYoutube, url: 'https://www.youtube.com/@amirulfahmi5269' },
    { platform: 'Github', icon: faGithub, url: 'https://github.com/amirulash' },
    { platform: 'LinkedIn', icon: faLinkedin, url: 'https://www.linkedin.com/in/amirul-fahmi-ash-shiddiqie-70341721b/' },
  ];

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.socialMediaContainer}>
      {socialMedia.map((media, index) => (
        <TouchableOpacity
          key={index}
          style={styles.socialMediaButton}
          onPress={() => Linking.openURL(media.url)}
        >
          <FontAwesomeIcon
            icon={media.icon}
            size={30}
            color={isDarkMode ? Colors.white : Colors.black}
          />
          <Text style={styles.socialMediaText}>{media.platform}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [rating, setRating] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#E3F2FD',
  };

  const handleRatingPress = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitRating = () => {
    alert(`Thank you for rating ${rating} stars!`);
    setRating(0);
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
        <View style={styles.headerContainer}>
          <Image
            source={ require('./peta/almet.png') } // Replace with your profile image URL
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Amirul Fahmi Ash-Shiddiqie</Text>
        </View>

        <View style={styles.profileDetails}>
          <ProfileCard title="NIM" content="22/496736/SV/20997" icon={faSchool} />
          <ProfileCard title="Kelas" content="PGPBL A" icon={faUser} />
          <ProfileCard
            title="Tentang Saya"
            content="Saya adalah mahasiswa Sekolah Vokasi UGM. Dalam keseharian, saya terinspirasi untuk mendukung branding Tuban sebagai Bumi Wali. Oleh karena itu, saya membuat aplikasi bernama *Mosque's Map*, yang memetakan masjid-masjid di Tuban. Aplikasi ini bertujuan memudahkan masyarakat dan wisatawan menemukan masjid serta mendukung identitas religi Tuban."
            icon={faMosque}
          />
        </View>

        <SocialMediaLinks />

        <View style={styles.interactiveSection}>
          <Text style={styles.ratingText}>Rate My App:</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => handleRatingPress(star)}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  size={30}
                  color={star <= rating ? '#FFD700' : '#CCCCCC'}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingValue}>Your Rating: {rating} Stars</Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitRating}
          >
            <Text style={styles.submitButtonText}>Submit Rating</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#0D47A1',
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
  },
  profileDetails: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.dark,
    textAlign: 'justify',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  socialMediaButton: {
    alignItems: 'center',
  },
  socialMediaText: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.dark,
  },
  interactiveSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starIcon: {
    marginHorizontal: 5,
  },
  ratingValue: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.dark,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 10,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
