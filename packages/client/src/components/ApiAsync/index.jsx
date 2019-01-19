import { subscribe } from 'react-contextual';
import Async from 'react-async';

import ApiContext from '../ApiContext';

const ApiAsync = subscribe([ApiContext], (apiClient => ({ apiClient })))(Async);

export default ApiAsync;