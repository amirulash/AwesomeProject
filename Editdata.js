import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faMosque } from '@fortawesome/free-solid-svg-icons';

const EditLocationData = () => {
    const jsonUrl = 'http://192.168.123.166:3000/mahasiswa'; // Ganti dengan IP server Anda
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [address, setAddress] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // Fetch data from API
    const fetchData = () => {
        setLoading(true);
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log('Fetched data:', json);
                setLocations(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refreshPage = () => {
        setRefresh(true);
        setName(''); // Clear form fields on refresh
        setRating('');
        setAddress('');
        fetchData();  // This will refresh the list of locations
        setRefresh(false);
    };

    const selectItem = (item) => {
        setSelectedLocation(item);
        setName(item.name);
        setRating(item.rating.toString());
        setAddress(item.address);
    };

    const submit = () => {
        const data = {
            name: name,
            rating: parseFloat(rating.replace(',', '.')), // Convert to float, replace comma with dot
            address: address,
        };

        fetch(`${jsonUrl}/${selectedLocation.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response:', json);
                alert('Data berhasil diperbarui');
                setName(''); // Clear the form after successful submission
                setRating('');
                setAddress('');
                refreshPage();  // Refresh the list after successful submission
            })
            .catch((error) => console.error(error));
    };

    // Helper function to determine styles based on whether the input is filled
    const getInputStyle = (value) => {
        return value ? styles.inputFilled : styles.input;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.cardTitle}>Loading...</Text>
                    </View>
                ) : (
                    <View>
                        <ScrollView style={styles.formContainer}>
                            <View style={styles.cardForm}>
                                <Text style={styles.title}>Edit Data Masjid</Text>
                                <View style={styles.formGroup}>
                                    <TextInput
                                        style={getInputStyle(name)} // Apply the dynamic style
                                        placeholder="Nama Lokasi"
                                        value={name}
                                        onChangeText={(value) => setName(value)}
                                    />
                                    <TextInput
                                        style={getInputStyle(rating)} // Apply the dynamic style
                                        placeholder="Rating (1-5)"
                                        value={rating}
                                        keyboardType="decimal-pad"
                                        onChangeText={(value) => setRating(value)}
                                    />
                                    <TextInput
                                        style={getInputStyle(address)} // Apply the dynamic style
                                        placeholder="Alamat"
                                        value={address}
                                        onChangeText={(value) => setAddress(value)}
                                    />
                                    <TouchableOpacity onPress={submit} style={styles.button}>
                                        <Text style={styles.buttonText}>Simpan</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.refreshContainer}>
                                    <TouchableOpacity style={styles.refreshButton} onPress={refreshPage}>
                                        <Text style={styles.refreshText}>Refresh</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <FlatList
                                style={styles.list}
                                data={locations}
                                onRefresh={refreshPage}
                                refreshing={refresh}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => selectItem(item)}>
                                        <View style={styles.cardItem}>
                                            <View style={styles.cardContent}>
                                                <FontAwesomeIcon icon={faMosque} size={40} style={styles.icon} />
                                                <View style={styles.cardDetails}>
                                                    <Text style={styles.cardTitle}>{item.name} </Text>
                                                    <Text style={styles.cardText}>Rating: {item.rating}</Text>
                                                    <Text style={styles.cardText}>Alamat: {item.address}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={styles.editButton}>
                                                <FontAwesomeIcon icon={faPenToSquare} size={20} style={styles.editIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default EditLocationData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7', // Light gray background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333', // Dark gray title
    },
    formContainer: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    cardForm: {
        backgroundColor: '#ffffff', // White background for clean look
        borderRadius: 15, // Rounded corners for a modern feel
        padding: 25, // More padding for spacing
        marginVertical: 15, // Larger margin for spacing between cards
        shadowColor: '#000', // Shadow for depth
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2, // Slightly stronger shadow
        shadowRadius: 10, // Softer shadow edges
        elevation: 5, // Increased elevation for Android shadow
        borderColor: '#d1d9e6', // Subtle border for clean separation
        borderWidth: 1,
    },
    formGroup: {
        marginBottom: 20, // Larger spacing between form fields
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d9e6', // Soft blue-gray border
        borderRadius: 10, // Rounded corners for inputs
        padding: 12, // Larger padding for touch targets
        marginVertical: 10,
        backgroundColor: '#f9fafe', // Subtle blue background
        fontSize: 16, // Slightly larger text
        color: '#333', // Darker text for readability
    },
    inputFilled: {
        borderWidth: 1,
        borderColor: '#007bff', // Highlighted border when filled
        borderRadius: 10,
        padding: 12,
        marginVertical: 10,
        backgroundColor: '#e7f3ff', // Light blue background for filled inputs
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff', // Bright blue for call-to-action
        paddingVertical: 12, // Larger touch area
        borderRadius: 10, // Rounded corners
        textAlign: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    refreshContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    refreshButton: {
        backgroundColor: '#f7f9fc', // Subtle background for refresh button
        borderRadius: 10,
        padding: 10,
        width: '60%', // Make button larger
        alignItems: 'center',
    },
    refreshText: {
        color: '#555', // Neutral color for refresh text
        fontWeight: 'bold',
        fontSize: 16,
    },
    list: {
        marginBottom: 20,
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20, // Increased padding for better spacing
        borderRadius: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#d1d9e6', // Matching cardForm border style
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 20, // Spacing for icon
        color: '#007bff', // Use theme color for consistency
    },
    cardDetails: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18, // Larger text for titles
        fontWeight: 'bold',
        color: '#333',
    },
    cardText: {
        fontSize: 14,
        color: '#555', // Darker gray for better readability
    },
    editButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f4ff', // Softer blue for edit button
        borderRadius: 20,
        padding: 12,
    },
    editIcon: {
        color: '#007bff',
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});
