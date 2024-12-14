import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faMapMarkerAlt, faMosque } from '@fortawesome/free-solid-svg-icons';

const EditLocationData = () => {
    const jsonUrl = 'http://192.168.199.144:3000/mahasiswa'; // Ganti dengan IP server Anda
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
        fetchData();
        setRefresh(false);
    };

    const selectItem = (item) => {
        setSelectedLocation(item);
        setName(item.name);
        setRating(item.rating);
        setAddress(item.address);
    };

    const submit = () => {
        const data = {
            name: name,
            rating: rating,
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
                setName('');
                setRating('');
                setAddress('');
                refreshPage();
            })
            .catch((error) => console.error(error));
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
                                        style={styles.input}
                                        placeholder="Nama Lokasi"
                                        value={name}
                                        onChangeText={(value) => setName(value)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Rating"
                                        value={rating}
                                        onChangeText={(value) => setRating(value)}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Alamat"
                                        value={address}
                                        onChangeText={(value) => setAddress(value)}
                                    />
                                    <Button title="Simpan" style={styles.button} onPress={submit} />
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
        backgroundColor: '#f0f8ff', // Light blue background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#007bff', // Blue title
    },
    formContainer: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    cardForm: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#007bff', // Blue border
        borderRadius: 8,
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#eaf3ff', // Light blue input background
    },
    button: {
        backgroundColor: '#007bff', // Blue button
        color: '#fff',
    },
    list: {
        marginBottom: 20,
    },
    cardItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#007bff', // Blue border around card
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginRight: 15,
        color: '#000000', 
    },
    cardDetails: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000', // Blue title text
    },
    cardText: {
        fontSize: 14,
        color: '#555',
    },
    editButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7ff', // Light blue background for edit button
        borderRadius: 20,
        padding: 10,
    },
    editIcon: {
        color: '#007bff', // Blue icon color
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
});
