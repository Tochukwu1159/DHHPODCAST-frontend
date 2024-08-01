import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./index1";
import toast from "react-hot-toast";
import { queryClient } from "..";
import { showNotification } from "@mantine/notifications";
import { token } from "./index1";



export function useGetPodcastCategories() {
  return useQuery({
    queryKey: ["podcast-categories"],
    queryFn: function () {
      const result = axiosInstance.get("/podcast-categories",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      
      return result.then((response) => response.data);
    },
  });
}



export function useCreatePodcastCategories() {
    
    return useMutation({
        mutationFn: (payload) => axios.post('http://localhost:8081/api/v1/podcast-categories', payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }),
        onSuccess: function () {
            showNotification({
              title: "Operation Successful",
              message: `Podcast Category created successfully!`,
              color: "green",
            });
          },
          onError: function (error) {
            // console.log("errror", error);
    
            return showNotification({
              title: "An error occured",
              message: "Unable to update global list",
              color: "red",
            });
          },
          onSettled: function () {
            queryClient.invalidateQueries(["podcast-categories"]);
          //   cb && cb();
          },
    });
}

export function useGetPodcastCategoryById(id) {
    return useQuery({
        queryKey: ['podcast-categories', id],
        queryFn: function () {
            const result = axios.get(`http://localhost:8081/api/v1/podcast-categories/single/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            return result.then(response => response.data);
        }
    });
}

export function useGetPodcastByCategoryName(name) {
  return useQuery({
      queryKey: ['podcast-category', name],
      queryFn: function () {
          const result = axios.get(`http://localhost:8081/api/v1/podcasts/category?name=${name}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          console.log('result', result);
          return result.then(response => response.data);
      }
  });
}


//param
export function useUpdatePodcastCategory(params) {
    return useMutation({
        mutationFn: (payload) => axios.put(`http://localhost:8081/api/v1/podcast-categories/${params}`,

        { ...payload,
    
            name:payload.name,
            imageFile:payload.imageFile,
            description:payload.description,
            userPlan:payload.userPlan

            }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'     
            }
        }
        ),
            
            onSuccess: function () {
              showNotification({
                title: "Operation Successful",
                message: `Global List updated successfully!`,
                color: "green",
              });
            },
            onError: function (error) {
              // console.log("errror", error);
      
              return showNotification({
                title: "An error occured",
                message: "Unable to update global list",
                color: "red",
              });
            },
            onSettled: function () {
              queryClient.invalidateQueries(["podcast-categories"]);
            //   cb && cb();
            },
          
    });}

export function useDeletePlanCategoryById() {
    return useMutation(
      (id) =>
        axiosInstance.delete(`http://localhost:8081/api/v1/podcast-categories/${id}`),
      {
        onSuccess: function () {
        //   showNotification({
        //     title: "Operation successful",
        //     message: "Podcast category deleted successfully",
        //     color: "green",
        //   });
        },
        onError: function (data) {
          const response = data.response?.data;
        //   showNotification({
        //     message: response?.detail || "Unable to delete Podcast category ",
        //     color: "red",
        //   });
        },
        onSettled: function () {
          queryClient.invalidateQueries(["all-podcast"]);
        },
      }
    );
  }
