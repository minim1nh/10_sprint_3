import axios from 'axios';
import LocalStorage from '@/api/storage/LocalStorage';
import { teamId, SignInData, NotificationsData, NotificationsIdData } from './Wikid.types';

/**
 * 알림 목록 조회 함수
 * https://wikied-api.vercel.app/10-3/notifications?page=1&pageSize=10
 */
export const getNotifications = async (page: number, pageSize: number): Promise<NotificationsData | null> => {

  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;
  if (!signIn?.refreshToken) {
    console.error(`Error : getNotifications() 'signIn.accessToken' info does not exist in localstorage.`);
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/notifications/?page=${page}&pageSize=${pageSize}`
  console.log('GET - URL: ', URL)

  try {
    const res = await axios.get(URL, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${signIn.accessToken}`,
      }
    });

    if (res.status === 200) {
      const resData = res.data as NotificationsData;
      LocalStorage.setItem(`getNotifications`, resData);
      return resData;
    } else {
      throw new Error('Failed to getNotifications()');
    }
  } catch (error) {
    console.error('Error to getNotifications():', error);
    throw error;
  }
};

/**
 * 알림 삭제 요청하는 함수
 */
export const deleteNotificationsId = async (id: number): Promise<NotificationsIdData | null> => {

  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;
  if (!signIn?.refreshToken) {
    console.error(`Error : getNotifications() 'signIn.accessToken' info does not exist in localstorage.`);
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/notifications/${id}`
  console.log('DELETE - URL: ', URL)

  try {
    const res = await axios.delete(URL, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${signIn.accessToken}`,
      }
    })

    if (res.status === 200) {
      const resData = res.data as NotificationsIdData;
      LocalStorage.setItem(`deleteNotificationsId`, resData);
      return resData;
    } else {
      throw new Error('Failed to deleteNotificationsId()');
    }
  } catch (error) {
    console.error('Error to deleteNotificationsId():', error)
    throw error
  }
}
