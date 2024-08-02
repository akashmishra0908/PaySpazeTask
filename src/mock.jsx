import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
mock.onPost('/api/mock/payments').reply(config => {
  return [200, {
    success: true,
    message: 'Payment processed successfully',
    transactionId: '12345678'
  }];
});

console.log('Mock Adapter is set up.');
export default mock;
