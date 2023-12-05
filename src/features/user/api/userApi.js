import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../state/userSlice';

const BASE_URL =
  `${process.env.REACT_APP_API_URL_ADDRESS}/${process.env.REACT_APP_API_URL_PREFIX_VERSION}`;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `/users`,
  }),
  endpoints: builder => ({
    getMe: builder.query({
      query() {
        return {
          url: '/get',
          credentials: 'include',
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
      // transformResponse: (result: { data: { user: IUser } }) =>
      //   result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;
