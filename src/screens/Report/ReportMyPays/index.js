import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListPaidMemberships from '../../../components/List/PaidMemberships';
import {getPaidMemberships} from '../../../redux/features/PaidMemberships/paidMembershipsSlice';

const ReportMyPays = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({...state.auth}));
  const {paidMemberships} = useSelector(state => ({...state.paidMembership}));
  useFocusEffect(
    useCallback(() => {
      dispatch(getPaidMemberships({token: user}));
    }, []),
  );
  return (
    <>
      {paidMemberships !== 0 && (
        <ListPaidMemberships paidMemberships={paidMemberships} />
      )}
    </>
  );
};

export default ReportMyPays;
