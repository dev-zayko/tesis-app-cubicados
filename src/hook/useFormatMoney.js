import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

const useFormatMoney = price => {
  if (price !== 0) {
    return 0;
  }
  return price;
};

export default useFormatMoney;
