import React, {useCallback, useRef, useState} from 'react';
import {Button, KeyboardAvoidingView, Modal, Stack, Text} from 'native-base';
import FormProject from '../../Forms/Projects';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../colors';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getMemberships} from '../../../redux/features/Memberships/membershipsSlice';
import CarouselMemberships from '../../Carousel/Memberships';

const ModalMemberships = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef(null);
  const dispatch = useDispatch()
  const onSubmit = async () => {
    setIsSubmitting(true);
    await formRef.current.submitForm();
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getMemberships({}));
    }, [])
  )
  const onNavigateWebPay = (price, idMembership) => {
    props.navigation.navigate('Webpay', {amount: price, idMembership: idMembership});
    props.onClose();
  }
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose()} size={'xl'}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header backgroundColor={'warmGray.300'}>
          <Text fontSize={'xl'}>Planes</Text>
        </Modal.Header>
        <Modal.Body h={550} backgroundColor={'light.200'}>
          <Stack alignItems={'center'}>
            <CarouselMemberships selectMemberships={(amount, idMembership) => onNavigateWebPay(amount, idMembership)} />
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ModalMemberships;