import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/api/mock/payments').reply(config => {

  const responseType = config.headers['X-Mock-Response-Type'];

  switch (responseType) {
    case '400':
      return [400, { message: 'Bad Request: Please check your input.' }];
    case '401':
      return [401, { message: 'Unauthorized: Please log in.' }];
    case '500':
      return [500, { message: 'Server Error: Please try again later.' }];
    default:
      return [200, {
        success: true,
        message: 'Payment processed successfully',
        transactionId: '12345678'
      }];
  }
});

console.log('Mock Adapter is set up.');
export default mock;
