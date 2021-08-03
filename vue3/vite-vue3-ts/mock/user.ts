import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/getUsers',
    method: 'get',
    response: ({ body, query }) => {
      console.log('body>>>>>>>>', body);
      console.log('query>>>>>>>>', query);
      return {
        code: 0,
        message: 'ok',
        data: {
            _id:'11111111',
            username:"zhangsan"
        },
      };
    },
  },
] as MockMethod[];