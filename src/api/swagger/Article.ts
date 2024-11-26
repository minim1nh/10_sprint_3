import axios from 'axios';
import SessionStorage from '@/api/storage/SessionStorage';
import { teamId, ArticlesProps, ArticlesData, ArticlesListData, ArticlesDetailData, ArticlesIdData, ArticlesIdLikeData } from './Wikid.types';
import { getAccessToken } from '@/hooks/Token'

/**
 * 게시글 작성
 * https://wikied-api.vercel.app/10-3/articles
 */
export const postArticles = async (
  articleId: number,
  reqProps: ArticlesProps
): Promise<ArticlesData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const URL = `https://wikied-api.vercel.app/10-3/articles`;
  console.log("POST - URL: ", URL);

  try {
    const res = await axios.post(
      URL,
      {
        content: reqProps.content,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200) {
      const resData = res.data as ArticlesData;
      SessionStorage.setItem(`postArticles`, resData);
      return resData;
    } else {
      throw new Error("Failed to postArticles()");
    }
  } catch (error) {
    // console.error('Error to postArticles():', error);
    throw error;
  }
};

/**
 * 게시글 목록 조회 함수
 * https://wikied-api.vercel.app/10-3/articles?page=1&pageSize=10&orderBy=like&keyword=keyword
 */
export const getArticles = async (
  page: number = 1,
  pageSize: number = 10,
  orderBy: string = "recent",
  keyword: string = ""
): Promise<ArticlesListData> => {
  const URL = `https://wikied-api.vercel.app/10-3/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  console.log("GET - URL: ", URL);

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const resData = res.data as ArticlesListData;
      SessionStorage.setItem(`getArticles`, resData);
      return resData;
    } else {
      throw new Error("Failed to getArticles()");
    }
  } catch (error) {
    // console.error('Error to getArticles():', error);
    throw error;
  }
};

/**
 * 게시글 상세 조회 함수
 * https://wikied-api.vercel.app/10-3/articles/1
 */
export const getArticlesId = async (
  articleId: number
): Promise<ArticlesDetailData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const URL = `https://wikied-api.vercel.app/10-3/articles/${articleId}`;
  console.log("GET - URL: ", URL);

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      const resData = res.data as ArticlesDetailData;
      SessionStorage.setItem(`getArticlesId`, resData);
      return resData;
    } else {
      throw new Error("Failed to getArticlesId()");
    }
  } catch (error) {
    // console.error('Error to getArticlesId():', error);
    throw error;
  }
};

/**
 * 게시글 수정 함수
 * https://wikied-api.vercel.app/10-3/comments/1
 */
export const patchArticlesId = async (
  articleId: number,
  reqProps: ArticlesProps
): Promise<ArticlesDetailData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const URL = `https://wikied-api.vercel.app/${teamId}/comments/${articleId}`;
  console.log("PATCH - URL: ", URL);

  try {
    const res = await axios.patch(
      URL,
      {
        content: reqProps.content,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200) {
      const resData = res.data as ArticlesDetailData;
      SessionStorage.setItem(`patchArticlesId`, resData);
      return resData;
    } else {
      throw new Error("Failed to patchArticlesId()");
    }
  } catch (error) {
    // console.error('Error to patchArticlesId():', error);
    throw error;
  }
};

/**
 * 게시글 삭제 함수
 * https://wikied-api.vercel.app/10-3/articles/1
 */
export const deleteArticlesId = async (
  articleId: number
): Promise<ArticlesIdData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const URL = `https://wikied-api.vercel.app/${teamId}/articles/${articleId}`;
  console.log("DELETE - URL: ", URL);

  try {
    const res = await axios.delete(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      const resData = res.data as ArticlesIdData;
      SessionStorage.setItem(`deleteArticlesId`, resData);
      return resData;
    } else {
      throw new Error("Failed to deleteArticlesId()");
    }
  } catch (error) {
    // console.error('Error to deleteArticlesId():', error)
    throw error
  }
};

/**
 * 게시글 좋아요 작성
 * https://wikied-api.vercel.app/10-3/articles/1/like
 */
export const postArticlesIdLike = async (
  articleId: number
): Promise<ArticlesIdLikeData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const URL = `https://wikied-api.vercel.app/${teamId}/articles/${articleId}/like`;
  console.log("POST - URL: ", URL);

  try {
    const res = await axios.post(
      URL,
      {},
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200) {
      const resData = res.data as ArticlesIdLikeData;
      SessionStorage.setItem(`postArticlesIdLike`, resData);
      return resData;
    } else {
      throw new Error("Failed to postArticlesIdLike()");
    }
  } catch (error) {
    // console.error('Error to postArticlesIdLike():', error);
    throw error;
  }
};

/**
 * 게시글 좋아요 취소 함수
 * https://wikied-api.vercel.app/10-3/articles/1/like
 */
export const deleteArticlesIdLike = async (
  articleId: number
): Promise<ArticlesIdLikeData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) return null;

  const URL = `https://wikied-api.vercel.app/${teamId}/articles/${articleId}/like`;
  console.log("DELETE - URL: ", URL);

  try {
    const res = await axios.delete(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      const resData = res.data as ArticlesIdLikeData;
      SessionStorage.setItem(`deleteArticlesIdLike`, resData);
      return resData;
    } else {
      throw new Error("Failed to deleteArticlesIdLike()");
    }
  } catch (error) {
    // console.error('Error to deleteArticlesIdLike():', error)
    throw error
  }
};
