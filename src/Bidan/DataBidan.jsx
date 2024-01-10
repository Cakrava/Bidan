import React, {useEffect, useState} from 'react';
import col from '../assets/ColorHunt';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AddBidan from '../Component/AddBidan';

import avatarLaki from '../assets/img/laki.jpg';
import avatarPerempuan from '../assets/img/perempuan.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import {apiImage, apiUrl} from '../assets/apiUrl';

export default function Dashboard() {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const [lastpage, setLastPage] = useState(0);
  const [dataDeleted, setDataDeleted] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [titleCari, setTitleCari] = useState('');
  let prevOpenedRow;
  const [row, setRow] = useState({});
  const [totalPerempuan, setTotalPerempuan] = useState(0);
  const [totalLakiLaki, setTotalLakiLaki] = useState(0);

  const [originalData, setOriginalData] = useState([]);
  const [dataBidan, setDataBidan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDataBidan = async (pageNumber = 1, searchQuery = search) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${apiUrl}bidan/?page=${pageNumber}&search=${searchQuery}`,
      );
      if (!response.ok) {
        throw new Error('Periksa koneksi internet anda');
      }
      const json = await response.json();
      setOriginalData(json.data);
      setPage(pageNumber);
      setLastPage(json.meta.last_page);

      setDataBidan(pageNumber === 1 ? json.data : [...dataBidan, ...json.data]);
    } catch (error) {
      // Memodifikasi bagian ini
      setError(`Gagal: ${error.message}`);
      Alert.alert('Error', `Gagal: ${error.message}`, [{text: 'OK'}]);
    } finally {
      setLoading(false);
      if (pageNumber === 1) setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchDataBidan();

    const unsubscribe = navigation.addListener('focus', () => {
      // Dipanggil setiap kali layar mendapat fokus
      if (route.params?.dataAdded) {
        fetchDataBidan();
        setDataDeleted(false);
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.dataAdded]);

  const onRefresh = () => {
    setRefreshing(true);

    fetchDataBidan(1, search).finally(() => setRefreshing(false));
  };

  const TambahData = item => {
    console.log('Navigating to Tambah');
    navigation.navigate('Tambah');
  };

  const renderItemBidan = ({item, index}) => {
    const closeRow = index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = () => {
      const handleDelete = idBidan => {
        Alert.alert(
          'Konfirmasi',
          'Anda akan menghapus data ini?',
          [
            {
              text: 'Tidak',
              style: 'cancel',
            },
            {
              text: 'Ya',
              onPress: async () => {
                try {
                  // Lakukan penghapusan data bidan dengan permintaan DELETE ke API
                  const response = await fetch(`${apiUrl}bidan/${idBidan}`, {
                    method: 'DELETE',
                  });

                  if (response.status === 200) {
                    // Data bidan berhasil dihapus
                    Alert.alert('', 'Data bidan berhasil dihapus!', [
                      {
                        onPress: async () => {
                          // Reset data setelah penghapusan berhasil
                          await fetchDataBidan();

                          // Jangan lupa set state dataDeleted menjadi true
                          setDataDeleted(true);
                        },
                        text: 'Ok',
                      },
                    ]);
                  } else {
                    // Gagal menghapus data
                    console.log('Gagal menghapus data');
                    // Handle kesalahan jika penghapusan gagal
                  }
                } catch (error) {
                  console.error('Terjadi kesalahan:', error);
                }
              },
            },
          ],
          {cancelable: true},
        );
      };

      return (
        <View
          style={{
            marginBottom: 10,

            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: '#dedede',
            width: 200,
            height: 113,
            marginLeft: -130,
          }}>
          <TouchableOpacity
            onPress={() => handleDelete(item.idBidan)}
            style={{
              backgroundColor: col.off,
              alignItems: 'flex-end',
              justifyContent: 'center',
              width: 'auto',
              height: 112,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Icon
              name="trash-outline"
              size={20}
              style={{color: 'white', marginRight: 25}}
            />
          </TouchableOpacity>
        </View>
      );
    };

    const bukadetail = item => {
      navigation.navigate('Detail', {
        idBidan: item.idBidan,
        fotoBidan: item.fotoBidan,
      });
    };
    const editbidan = item => {
      navigation.navigate('EditBidan', {
        idBidan: item.idBidan,
      });
    };

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        friction={2}
        rightThreshold={40}
        overshootRight={false}
        onSwipeableOpen={() => closeRow(index)}
        ref={ref => (row[index] = ref)}
        rightOpenValue={-20}>
        <View style={styles.item}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 290,
                  }}>
                  <View
                    style={[
                      styles.foto,
                      {justifyContent: 'center', alignItems: 'center'},
                    ]}>
                    <Avatar
                      size={25}
                      rounded
                      source={
                        item.fotoBidan
                          ? {uri: `${apiImage}${item.fotoBidan}`}
                          : item.jenisKelamin === 'L'
                          ? avatarLaki
                          : item.jenisKelamin === 'P'
                          ? avatarPerempuan
                          : avatarLaki
                      }
                    />
                  </View>
                  <View>
                    <Text style={styles.title}>{item.namaBidan}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="finger-print-outline" style={{}}></Icon>
                      <Text style={styles.idCode}> {item.idBidan}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity onPress={() => bukadetail(item)}>
                  <Icon name="eye-outline" size={20}></Icon>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: -5,
                }}>
                <Icon
                  name="location-outline"
                  size={15}
                  style={{marginLeft: -15}}
                />
                <Text style={{fontSize: 12, marginLeft: 15}}>
                  {item.alamatPraktik.length <= 20
                    ? item.alamatPraktik
                    : `${item.alamatPraktik.slice(0, 20)}...`}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 0}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 231,
                  }}>
                  <Icon
                    name="call-outline"
                    size={13}
                    style={{marginLeft: -12}}
                  />
                  <Text style={{fontSize: 12, marginLeft: 15}}>
                    {item.nohpBidan}
                  </Text>
                </View>
                {/* {item.status === 'Y' ? 'Aktif' : 'Cuti'} */}
                <View
                  style={{
                    padding: 5,
                    backgroundColor: item.status === 'Y' ? col.pink : col.off,
                    borderBottomLeftRadius: 50,
                    borderTopLeftRadius: 50,
                    width: 91,
                  }}>
                  <Text style={{color: 'white', marginLeft: 10}}>
                    {item.status === 'Y' ? 'Aktif' : 'Cuti'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View>
      <GestureHandlerRootView>
        <View
          style={{
            // paddingTop: 20,
            backgroundColor: col.abu,
            width: 'auto',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            // paddingBottom: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="menu-outline" size={30} style={{marginLeft: 20}} />
          </TouchableOpacity>
          {/* <Avatar size={25} rounded></Avatar> */}
          <View style={{marginLeft: 10, marginRight: 10}}>
            {loading && page === 1 && (
              <ActivityIndicator size={20} color={col.darkpink} />
            )}
          </View>
          <View style={styles.pencarian}>
            <TextInput
              style={{width: 'auto', height: 40, color: 'grey'}}></TextInput>
          </View>
        </View>
        <View
          style={{
            height: '100%',
            padding: 20,
            width: '100%',
            backgroundColor: 'white',
          }}>
          <FlatList
            style={{marginTop: 10, marginBottom: 10, height: 600}}
            initialNumToRender={1}
            data={dataBidan}
            renderItem={renderItemBidan}
            keyExtractor={item => item.idBidan}
            extraData={loading || error}
            onEndReached={() => {
              if (!loading && page < lastpage) {
                fetchDataBidan(page + 1);
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              !loading || page === 1 ? null : (
                <ActivityIndicator size="large" color="#860A35" />
              )
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{flexGrow: 1}}
          />
        </View>
      </GestureHandlerRootView>
      <AddBidan onPress={TambahData} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,

    bottom: 100,
    backgroundColor: col.pink,
    borderRadius: 30,
    elevation: 8,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
  },
  infoContainer: {
    marginRight: 10,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#39A7FF',
    padding: 20,
    borderBottomRightRadius: 50,
  },
  foto: {
    borderRadius: 50,
    marginLeft: -20,
    marginRight: 10,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#39A7FF',
  },
  iconDetail: {
    borderRadius: 50,
    marginLeft: -20,
    marginRight: 10,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#39A7FF',
  },
  note: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
  },
  AddButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39A7FF',
    marginLeft: 310,
    marginRight: 20,
    borderRadius: 100,
    marginTop: -32,
    borderColor: 'white',
    borderWidth: 2,
  },
  item: {
    marginBottom: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 18,
  },
  idCode: {
    color: 'gray',
    fontSize: 12,
  },

  rightActions: {
    marginBottom: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#dedede',
    paddingLeft: -100,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  actionButton: {
    marginRight: 10,
    marginLeft: -200,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200,
    paddingHorizontal: 20,
    height: '100%',
  },
  circle: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#39A7FF',
    width: 60,
    height: 60,
    position: 'absolute',
    top: 125,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#39A7FF',
    width: 60,
    height: 60,
    position: 'absolute',
    top: 125,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButton: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#39A7FF',
    width: 40,
    height: 40,
    position: 'absolute',
    top: 20,
    right: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pencarian: {
    paddingLeft: 10,
    justifyContent: 'center',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: col.abu,
    borderWidth: 1,
    width: 200,
  },
});
