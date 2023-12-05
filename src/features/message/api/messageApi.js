import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL_ADDRESS}/${process.env.REACT_APP_API_URL_PREFIX_VERSION}`;

const APP_LOCAL_STORAGE_PREFIX =
  process.env.REACT_APP_LOCAL_STORAGE_PREFIX || "";

// const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: '' }
//   ): BaseQueryFn<
//     {
//       url: string;
//       method: AxiosRequestConfig['method'];
//       data?: AxiosRequestConfig['data'];
//       params?: AxiosRequestConfig['params'];
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params }) => {
//     let token = '';
//     if (localStorage.getItem('redux')) {
//       token = JSON.parse(localStorage.getItem('redux'));
//     }
//     try {
//       const result = await axios({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         withCredentials: true,
//         xsrfCookieName:
//           '0X9E3P8gW84gHSyd45xwQUsT567ae2CysWfJ4VmfSv3I1Xsg1a0eHhHXMY7LGD6D',
//         xsrfHeaderName: 'X-CSRFToken',
//         headers: {
//           // 'Content-Type': 'application/json',
//           'X-CSRFToken':
//             '0X9E3P8gW84gHSyd45xwQUsT567ae2CysWfJ4VmfSv3I1Xsg1a0eHhHXMY7LGD6D',
//         },
//       });
//       return { data: result.data };
//     } catch (axiosError) {
//       let err = axiosError as AxiosError;
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };

export const messageApi = createApi({
  reducerPath: "messageApi",
  tagTypes: ["Message"],
  // refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/messages`,
    // params: {
    //   credentials: 'include',
    //   // withCredentials: true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken':
    //       '0X9E3P8gW84gHSyd45xwQUsT567ae2CysWfJ4VmfSv3I1Xsg1a0eHhHXMY7LGD6D',
    //   },
    // },

    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = localStorage.getItem(`${APP_LOCAL_STORAGE_PREFIX}/token`);

        console.log('from prepare user token in messageApi');
        console.log(token);

      headers.set('Authorization', `Bearer ${token}`);
      // headers.set('Content-type', 'application/json; charset=UTF-8');
      // headers.set('Access-Control-Allow-Credentials', true);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query() {
        return {
          url: "/",
          method: "GET",
        };
      },
      providesTags: (result) =>
        // is result available?
        result?.results
          ? // successful query
            [
              ...result.results.map(({ id }) => ({ type: "Message", id })),
              { type: "Message", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Message", id: "LIST" }],
      forceRefetch({ currentArg, previousArg }) {
        return true;
      },
    }),
    addMessage: builder.mutation({
      query(data) {
        return {
          url: "/",
          method: "POST",
          body: data,
          withCredentials: true,
          credentials: "include",
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
        };
      },
      invalidatesTags: [{ type: "Message", id: "LIST" }],
    }),
    deleteMessage: builder.mutation({
      query(messageId) {
        return {
          url: "/",
          method: "DELETE",
          body: messageId,
        };
      },
      // Invalidates the tag for this Post `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `listPosts` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: (result, error, { id }) => [
        { type: "Message", id },
        { type: "Message", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
