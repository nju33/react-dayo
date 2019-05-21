import SeedFactory from '../seed-factory';
import {ASAGI} from '../constants/colors';
import {log} from '../constants/names';

export default SeedFactory.create({
  name: log,
  textColor: '#333',
  backgroundColor: ASAGI,
});
