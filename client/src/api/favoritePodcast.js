import { useMutation, useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { queryClient } from "..";
import { axiosInstance } from "./index1"; // Import axiosInstance

export function useGetAllFavoritePodcast() {
    return useQuery({
        queryKey: ['favorite-podcast'],
        queryFn: function () {
            return axiosInstance.get('/likes/favorite')
                .then(response => response.data);
        }
    });
}

export function useAddToFavorite(podcastId) {
    return useMutation({
        mutationFn: () => axiosInstance.post(`/likes/${podcastId}`, null),
        onSuccess: function () {
            toast.success('Podcast added successfully');
            queryClient.invalidateQueries({ queryKey: ["favorite-podcast"] });
        },
        onError: function (error) {
            console.log('Error:', error);
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
