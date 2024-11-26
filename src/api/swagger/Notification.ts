import axios from 'axios';
import SessionStorage from '@/api/storage/SessionStorage';
import { teamId, NotificationsData, NotificationsIdData } from '@/api/swagger/Wikid.types';
import { getAccessToken } from '@/hooks/Token'

/**
 * 알림 목록 조회 함수
 * https://wikied-api.vercel.app/10-3/notifications?page=1&pageSize=10
 */
export const getNotifications = async (pageSize: number, page: number = 1): Promise<NotificationsData | null> => {

  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  const URL = `https://wikied-api.vercel.app/${teamId}/notifications/?page=${page}&pageSize=${pageSize}`
  console.log('GET - getNotifications(): ', URL)

  try {
    const res = await axios.get(URL, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (res.status === 200) {
      const resData = res.data as NotificationsData;
      SessionStorage.setItem(`getNotifications`, resData);
      return resData;
    } else {
      throw new Error('Failed to getNotifications()');
    }
  } catch (error) {
    //console.error('Error to getNotifications():', error);
    throw error;
  }
};

/**
 * 알림 삭제 요청하는 함수
 */
export const deleteNotificationsId = async (id: number): Promise<NotificationsIdData | null> => {

  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  const URL = `https://wikied-api.vercel.app/${teamId}/notifications/${id}`
  console.log('DELETE - deleteNotificationsId(): ', URL)

  try {
    const res = await axios.delete(URL, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    })

    if (res.status === 200) {
      const resData = res.data as NotificationsIdData;
      SessionStorage.setItem(`deleteNotificationsId`, resData);
      return resData;
    } else {
      throw new Error('Failed to deleteNotificationsId()');
    }
  } catch (error) {
    //console.error('Error to deleteNotificationsId():', error)
    throw error
  }
}
