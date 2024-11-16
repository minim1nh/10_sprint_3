import axios from 'axios';
import LocalStorage from '@/api/storage/LocalStorage';
import { teamId, signInUpResponseData } from './Wikid.types';

export const getMe = async (): Promise<signInUpResponseData> => {

    try {
      const response = await axios.get(`https://wikied-api.vercel.app/${teamId}/user/me`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer `,
        }
      });

    if (response.status === 200) {
      const answer = response.data;
      LocalStorage.setItem(`User`, answer);
      return answer;
    } else {
      throw new Error('Failed to fetch answer');
    }
  } catch (error) {
    console.error('Error fetching answer:', error);
    throw error;
  }
};
