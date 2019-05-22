import React from 'react';
import SeedFactory from '../seed-factory';
import {TAMAGO} from '../constants/colors';
import {warn} from '../constants/names';
import {CloseIcon} from '../../components/close-icon';

export default SeedFactory.create({
  name: warn,
  textColor: '#333',
  backgroundColor: TAMAGO,
  closeButton: <CloseIcon />,
});
