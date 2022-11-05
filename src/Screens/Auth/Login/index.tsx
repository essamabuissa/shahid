import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native';
import React, {useMemo, useState} from 'react';
import {LoginAction} from '../../../Store/Actions/Auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamsList} from '../../../Navigation';
import {useTypedDispatch} from '../../../Store';

interface LoginProps {
  navigation: StackNavigationProp<RootStackParamsList>;
}

const Login = ({navigation}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useTypedDispatch();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {flex: 1, justifyContent: 'center', padding: 10},
        input: {
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 5,
        },
      }),
    [],
  );

  const handleLogin = () => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email || !password) {
      Alert.alert('Please fill all fields');
    } else if (!email.match(validRegex)) {
      Alert.alert('Please enter valid email');
    } else {
      dispatch(LoginAction(email));
      navigation.replace('HomeStack');
    }
  };
  return (
    <View style={styles.container}>
      <Text>{'Email'}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <Text>{'Password'}</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        autoCapitalize="none"
      />
      <Button title={'Login'} color="red" onPress={handleLogin} />
    </View>
  );
};

export default Login;
