import React from 'react';
import SeedFactory from '../seed-factory';
import {ASAGI} from '../constants/colors';
import {log} from '../constants/names';
import {CloseIcon} from '../../components/close-icon';

export default SeedFactory.create({
  name: log,
  textColor: '#333',
  backgroundColor: ASAGI,
  closeButton: <CloseIcon />,
});
