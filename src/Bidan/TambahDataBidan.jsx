import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const TambahDataBidan = () => {
  const [idBidan, setIdBidan] = useState('');
  const [namaBidan, setNamaBidan] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('L');
  const [tmpLahir, setTmpLahir] = useState('');
  const [tglLahir, setTglLahir] = useState(new Date());
  const [alamatPraktik, setAlamatPraktik] = useState('');
  const [tglTerbitSIPB, setTglTerbitSIPB] = useState(new Date());
  const [tglBerlakuSIPB, setTglBerlakuSIPB] = useState(new Date());
  const [tglPerpanjangan, setTglPerpanjangan] = useState(new Date());
  const [status, setStatus] = useState('');
  const [nohpBidan, setNohpBidan] = useState('');
  const [catatan, setCatatan] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [SIBP, setSIBP] = useState('');
  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const submitForm = async () => {
    setIsSaving(true);
    setValidationErrors({});
    const formData = {
      idBidan,
      SIBP,
      namaBidan,
      jenisKelamin,
      tmpLahir,
      tglLahir: tglLahir.toISOString().split('T')[0],
      alamatPraktik,
      nohpBidan,
      tglTerbitSIPB: tglTerbitSIPB.toISOString().split('T')[0],
      tglBerlakuSIPB: tglBerlakuSIPB.toISOString().split('T')[0],
      tglPerpanjangan: tglPerpanjangan.toISOString().split('T')[0],
      status,
      catatan,
    };

    // Replace with your API endpoint
    const apiBidan = 'YOUR_API_ENDPOINT';

    try {
      const response = await fetch(apiBidan, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setIsSaving(false);

        if (response.status === 422) {
          let errors = {};
          Object.keys(data.errors).forEach(key => {
            errors[key] = data.errors[key][0];
          });
          setValidationErrors(errors);
        } else {
          throw new Error(
            data.message || 'Terjadi kesalahan saat menyimpan data.',
          );
        }
      } else {
        setIsSaving(false);
        Alert.alert('Success', 'Data bidan berhasil ditambahkan', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('DataBidan', {dataAdded: true}),
          },
        ]);
      }
    } catch (error) {
      setIsSaving(false);
      Alert.alert('Error', error.toString());
    }
  };

  const onDateChangeLahir = (event, selectedDate) => {
    const currentDate = selectedDate || tglLahir;
    setDatePickerVisible(Platform.OS === 'ios');
    setTglLahir(currentDate);
  };
  const onDateChangeTerbit = (event, selectedDate) => {
    const currentDate = selectedDate || tglTerbitSIPB;
    setDatePickerVisible(Platform.OS === 'ios');
    setTglTerbitSIPB(currentDate);
  };
  const onDateChangeBerlaku = (event, selectedDate) => {
    const currentDate = selectedDate || tglBerlakuSIPB;
    setDatePickerVisible(Platform.OS === 'ios');
    setTglBerlakuSIPB(currentDate);
  };
  const onDateChangeperpanjangan = (event, selectedDate) => {
    const currentDate = selectedDate || tglPerpanjangan;
    setDatePickerVisible(Platform.OS === 'ios');
    setTglPerpanjangan(currentDate);
  };

  const formatDateLahir = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const formatDateSibp = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const formatDateBerlaku = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  const formatDatePerpanjang = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          placeholder="Masukkan ID Bidan"
          value={idBidan}
          onChangeText={text => setIdBidan(text)}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="finger-print" size={15} color="grey" />}
          errorMessage={validationErrors.idBidan}
        />

        <Input
          placeholder="No SIBP"
          value={SIBP}
          onChangeText={text => setSIBP(text)}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="document-outline" size={15} color="grey" />}
          errorMessage={validationErrors.SIBP}
        />

        <Input
          placeholder="Nama Lengkap"
          value={namaBidan}
          onChangeText={text => setNamaBidan(text)}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="person-outline" size={15} color="grey" />}
          errorMessage={validationErrors.namaBidan}
        />
        <Input
          placeholder="Tempat Lahir"
          value={tmpLahir}
          onChangeText={text => setTmpLahir(text)}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="location-outline" size={15} color="grey" />}
          errorMessage={validationErrors.tmpLahir}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={jenisKelamin}
            onValueChange={(itemValue, itemIndex) => setJenisKelamin(itemValue)}
            style={styles.picker}
            itemStyle={{color: 'black', fontSize: 16}}>
            <Picker.Item label="Laki-laki" value="L" />
            <Picker.Item label="Perempuan" value="P" />
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() => setDatePickerVisible(true)}
          style={styles.DateInput}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // height: 40,
              // width: 40,
              marginLeft: 10,
              marginRight: 10,
              // backgroundColor: '#39A7FF',
              borderRadius: 10,
            }}>
            <Icon name="calendar-outline" size={20} color="grey" />
          </View>
          <TextInput
            style={{fontSize: 18}}
            value={formatDateLahir(tglLahir)}
            readOnly
          />

          {datePickerVisible && (
            <DateTimePicker
              value={tglLahir}
              mode="date"
              display="default"
              onChange={onDateChangeLahir}
            />
          )}
        </TouchableOpacity>
        <Input
          placeholder="Alamat"
          value={alamatPraktik}
          onChangeText={text => setAlamatPraktik(text)}
          placeholderTextColor="#888"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={<Icon name="location-outline" size={15} color="grey" />}
          errorMessage={validationErrors.alamatPraktik}
        />
        <View>
          <Text style={{marginLeft: 10, marginBottom: 5}}>
            Tanggal Terbit SIBP
          </Text>
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={styles.DateInputCustom}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // height: 40,
                // width: 40,
                marginLeft: 10,
                marginRight: 10,
                // backgroundColor: '#39A7FF',
                borderRadius: 10,
              }}>
              <Icon name="calendar-outline" size={20} color="grey" />
            </View>
            <TextInput
              style={{fontSize: 18}}
              value={formatDateSibp(tglTerbitSIPB)}
              readOnly
            />

            {datePickerVisible && (
              <DateTimePicker
                value={tglTerbitSIPB}
                mode="date"
                display="default"
                onChange={onDateChangeTerbit}
              />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{marginLeft: 10, marginBottom: 5}}>
            Masa Berlaku SIBP
          </Text>
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={styles.DateInputCustom}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // height: 40,
                // width: 40,
                marginLeft: 10,
                marginRight: 10,
                // backgroundColor: '#39A7FF',
                borderRadius: 10,
              }}>
              <Icon name="calendar-outline" size={20} color="grey" />
            </View>
            <TextInput
              style={{fontSize: 18}}
              value={formatDateLahir(tglLahir)}
              readOnly
            />

            {datePickerVisible && (
              <DateTimePicker
                value={tglLahir}
                mode="date"
                display="default"
                onChange={onDateChangeLahir}
              />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{marginLeft: 10, marginBottom: 5}}>
            Tanggal Perpanjangan
          </Text>
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={styles.DateInputCustom}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // height: 40,
                // width: 40,
                marginLeft: 10,
                marginRight: 10,
                // backgroundColor: '#39A7FF',
                borderRadius: 10,
              }}>
              <Icon name="calendar-outline" size={20} color="grey" />
            </View>
            <TextInput
              style={{fontSize: 18}}
              value={formatDateLahir(tglLahir)}
              readOnly
            />

            {datePickerVisible && (
              <DateTimePicker
                value={tglLahir}
                mode="date"
                display="default"
                onChange={onDateChangeLahir}
              />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={submitForm} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButtonText: {
    backgroundColor: '#39A7FF',
    borderRadius: 10,
    padding: 5,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
    // marginBottom: -10,
  },
  DateInput: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  DateInputCustom: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  inputText: {
    color: '#000',
  },
  pickerContainer: {
    marginBottom: 15,
    borderWidth: 0.5,
    borderRadius: 10,

    marginHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#39A7FF',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dateContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateDisplay: {
    fontSize: 16,
    marginTop: 10,
  },
});
export default TambahDataBidan;
