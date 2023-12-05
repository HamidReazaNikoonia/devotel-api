import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { userApi } from './userApi';

const BASE_URL =
  `${process.env.REACT_APP_API_URL_ADDRESS}/${process.env.REACT_APP_API_URL_PREFIX_VERSION}`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      return headers;
    },
  }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query(data) {
        return {
          url: '/register',
          method: 'POST',
          body: data,
        };
      },
    }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: '/login',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log('here');
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    verifyEmail: builder.mutation({
      query({ verificationCode }) {
        return {
          url: `verifyemail/${verificationCode}`,
          method: 'GET',
        };
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: 'logout',
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
} = authApi;
