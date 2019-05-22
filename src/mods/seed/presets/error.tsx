import SeedFactory from '../seed-factory';
import {KURENAI} from '../constants/colors';
import {error} from '../constants/names';

export default SeedFactory.create({
  name: error,
  textColor: '#fff',
  backgroundColor: KURENAI,
});
