import SeedFactory from '../seed-factory';
import {YANAGIZOME} from '../constants/colors';
import {warn} from '../constants/names';

export default SeedFactory.create({
  name: warn,
  textColor: '#333',
  backgroundColor: YANAGIZOME,
});
