import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Room {
  id: string;
  admin: string;
  members: string[];
}

interface CreateRoomRequest {
  admin: string;
}

interface CreateRoomResponse {
  id: string;
}

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: async (createRoomRequest: CreateRoomRequest) => {
      const response = await axios.post<CreateRoomResponse>(
        '/api/room',
        createRoomRequest
      );

      return response.data;
    },
  });
};

// TODO: Implement this function
// export const useLazyGetRoom = () => {
//   const queryClient = useQueryClient();
//   const queryFn = async () => {
//     const response = await axios.get<Room>(`/api/room/${roomId}`);

//     return response.data;
//   };

//   return useQuery({
//     queryKey: ['room'],
//     queryFn,
//     enabled: false,
//   });
// };
