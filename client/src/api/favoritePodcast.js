import axios from "axios";
import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { token } from "./index1";



export function useGetAllFavoritePodcast() {
    return useQuery({
        queryKey: ['favorite-podcast'],
        queryFn: function () {
            const result = axios.get('http://localhost:8081/api/v1/likes/favorite', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
          
            return result.then(response => response.data);
        }
    });
}
//param podcastId
export function useAddToFavorite(podcastId) {
    console.log("bbbbhybbhbhyb")
    return useMutation({
        mutationFn: () => axios.post(`http://localhost:8081/api/v1/likes/${podcastId}`, null, 
        {
            headers: {
                'Authorization': `Bearer ${token}`,   
            }
        }),
        onSuccess: function () {
            toast.success('Podcast added successfully');
        },
        onError: function (error) {
            console.log('there is error', error)
        },
        onSettled: function () {
            queryClient.invalidateQueries({ queryKey: ["favorite-podcast"] });
        },
    });
}

// export function useAddToFavorite(podcastId) {
  
//     return useMutation(
//       () =>
//         axios.post(
//           `http://localhost:8081/api/v1/likes/${podcastId}`,
//           null,
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//           }
//         ),
//       {
//         onSuccess: () => {
//           toast.success('Podcast added successfully');
//           queryClient.invalidateQueries({ queryKey: ["favorite-podcast"] });
//         },
//         onError: (error) => {
//           console.log('There is an error', error);
//         },
//       }
//     );
//   }
