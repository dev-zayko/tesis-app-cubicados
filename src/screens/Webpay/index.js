import React, {useState, useEffect, useCallback} from 'react';
import {WebView} from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Stack, useToast} from 'native-base';
import {createTransaction} from '../../redux/features/Webpay/webpaySlice';
import Background from '../../components/Background';

const Webpay = ({route, navigation}) => {
  const [url, setUrl] = useState('');
  const [tokenWs, setTokenWs] = useState();
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const {viewData} = useSelector(state => ({...state.webpay}));
  const [voucherData, setVoucherData] = useState();
  const [storeMember, setStoreMember] = useState(1);
  const {amount, idMembership} = route?.params;
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      dispatch(createTransaction({token: user, amount: amount})).then(() => {
        const {url, token} = viewData;
        setUrl(url);
        setTokenWs(token);
      });
    }, [url]),
  );
  const onMessage = message => {
    console.log(message);
  };

  const jsCode = `
   let table =document.getElementById('table-commit');
   if(table !== null){
   let ordenCompra = document.getElementById('ordenCompra').innerText;
   let sessionId = document.getElementById('sessionId').innerText;
   let monto = document.getElementById('monto').innerText;
   const voucherData = [{ordenCompra: ordenCompra, sessionId: sessionId, monto: monto}];
   window.ReactNativeWebView.postMessage(JSON.stringify(voucherData));
   }
    `;
  return (
    <Background>
      <Stack w={'100%'} h={'100%'}>
        <WebView
          originWhitelist={['*']}
          mixedContentMode={'always'}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          source={{
            method: 'POST',
            uri: url,
            body: `token_ws=${tokenWs}`,
          }}
          onNavigationStateChange={e => {
            console.log(e.url)
            if (e.url.indexOf('http://10.0.2.2:3131/api/webpay/exit') > -1) {
              toast.show({
                description: 'Cancelaste el pago'
              })
              navigation.navigate('Membership');
            } else if (e.url.indexOf('http://10.0.2.2:3131/api/webpay/success') > -1) {
              toast.show({
                description:
                  '¡Felicidades! ingresa de nuevo para disfrutar premium',
              });
              navigation.navigate('Login');
            }
          }}
          onMessage={event => {
            setVoucherData(JSON.parse(event.nativeEvent.data)[0]);
            setStoreMember(2);
          }}
          injectedJavaScript={jsCode}
        />
      </Stack>
    </Background>
  );
};

export default Webpay;
