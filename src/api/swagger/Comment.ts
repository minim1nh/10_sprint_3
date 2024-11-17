import axios from 'axios';
import LocalStorage from '@/api/storage/LocalStorage';
import { teamId, SignInData, CommentsProps, CommentsData, CommentsListData, CommentsIdData } from './Wikid.types';

/**
 * 댓글 작성
 * https://wikied-api.vercel.app/10-3/articles/1/comments
 */
export const postComments = async (articleId: number, reqProps: CommentsProps): Promise<CommentsData | null> => {

  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;
  if (!signIn?.refreshToken) {
    console.error(`Error : postComments() 'signIn.accessToken' info does not exist in localstorage.`);
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/articles/${articleId}/comments`
  console.log('POST - URL: ', URL)

  try {
    const res = await axios.post(URL, {
      content: reqProps.content,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${signIn.accessToken}`,
      }
    });

    if (res.status === 200) {
      const resData = res.data as CommentsData;
      LocalStorage.setItem(`postComments`, resData);
      return resData;
    } else {
      throw new Error('Failed to postComments()');
    }
  } catch (error) {
    console.error('Error to postComments():', error);
    throw error;
  }
};

/**
 * 댓글 목록 조회 함수
 * https://wikied-api.vercel.app/10-3/articles/1/comments?limit=10&cursor=1
 */
export const getComments = async (articleId: number, limit: number, cursor?: number): Promise<CommentsListData> => {

  const baseurl = `https://wikied-api.vercel.app/${teamId}/articles/${articleId}/comments?limit=${limit}`
  const URL = (cursor) ? baseurl + `&cursor=${cursor}` : baseurl
  console.log('GET - URL: ', URL)
  
  try {
    const res = await axios.get(URL, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (res.status === 200) {
      const resData = res.data as CommentsListData;
      LocalStorage.setItem(`getComments`, resData);
      return resData;
    } else {
      throw new Error('Failed to getComments()');
    }
  } catch (error) {
    console.error('Error to getComments():', error);
    throw error;
  }
};

/**
 * 댓글 수정 함수
 * https://wikied-api.vercel.app/10-3/comments/1
 */
export const patchCommentsId = async (commentId: number, reqProps: CommentsProps): Promise<CommentsData | null> => {

  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;
  if (!signIn?.refreshToken) {
    console.error(`Error : patchCommentsId() 'signIn.accessToken' info does not exist in localstorage.`);
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/comments/${commentId}`
  console.log('PATCH - URL: ', URL)

  try {
    const res = await axios.patch(URL, {
      content: reqProps.content,
    }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${signIn.accessToken}`,
      }      
    });

    if (res.status === 200) {
      const resData = res.data as CommentsData;
      LocalStorage.setItem(`patchCommentsId`, resData);
      return resData;
    } else {
      throw new Error('Failed to patchCommentsId()');
    }
  } catch (error) {
    console.error('Error to patchCommentsId():', error);
    throw error;
  }
};


/**
 * 댓글 삭제 요청하는 함수
 * https://wikied-api.vercel.app/10-3/comments/1
 */
export const deleteCommentsId = async (commentId: number): Promise<CommentsIdData | null> => {

  const signIn = LocalStorage.getItem(`SignIn`) as SignInData;
  if (!signIn?.refreshToken) {
    console.error(`Error : deleteCommentsId() 'signIn.accessToken' info does not exist in localstorage.`);
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/comments/${commentId}`
  console.log('DELETE - URL: ', URL)

  try {
    const res = await axios.delete(URL, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${signIn.accessToken}`,
      }
    })

    if (res.status === 200) {
      const resData = res.data as CommentsIdData;
      LocalStorage.setItem(`deleteCommentsId`, resData);
      return resData;
    } else {
      throw new Error('Failed to deleteCommentsId()');
    }
  } catch (error) {
    console.error('Error to deleteCommentsId():', error)
    throw error
  }
}
