import { __PROD__ } from 'env';
import noop from './noop';

// TODO make a logger method for production
const error = __PROD__ ? noop : console.error;

export default error;
