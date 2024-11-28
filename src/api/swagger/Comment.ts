import axios from "axios";
import SessionStorage from "@/api/storage/SessionStorage";
import {
  teamId,
  CommentsProps,
  CommentsData,
  CommentsListData,
  CommentsIdData,
} from "@/api/swagger/Wikid.types";
import { getAccessToken } from "@/hooks/Token";

/**
 * 댓글 작성
 * https://wikied-api.vercel.app/10-3/articles/1/comments
 */
export const postComments = async (
  articleId: number,
  reqProps: CommentsProps
): Promise<CommentsData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.log("None of LogIn!!!");
    return null;
  }

  const URL = `https://wikied-api.vercel.app/10-3/articles/${articleId}/comments`;
  console.log("POST - postComments(): ", URL);

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

    if (res.status === 201) {
      const resData = res.data as CommentsData;
      SessionStorage.setItem(`postComments`, resData);
      return resData;
    } else {
      throw new Error("Failed to postComments()");
    }
  } catch (error) {
    //console.error('Error to postComments():', error);
    throw error;
  }
};

/**
 * 댓글 목록 조회 함수
 * https://wikied-api.vercel.app/10-3/articles/1/comments?limit=10&cursor=1
 */
export const getComments = async (
  articleId: number,
  limit: number,
  cursor?: number
): Promise<CommentsListData> => {
  const baseurl = `https://wikied-api.vercel.app/${teamId}/articles/${articleId}/comments?limit=${limit}`;
  const URL = cursor ? baseurl + `&cursor=${cursor}` : baseurl;
  console.log("GET - URL: ", URL);

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const resData = res.data as CommentsListData;
      SessionStorage.setItem(`getComments`, resData);
      return resData;
    } else {
      throw new Error("Failed to getComments()");
    }
  } catch (error) {
    //console.error('Error to getComments():', error);
    throw error;
  }
};

/**
 * 댓글 수정 함수
 * https://wikied-api.vercel.app/10-3/comments/1
 */
export const patchCommentsId = async (
  commentId: number,
  reqProps: CommentsProps
): Promise<CommentsData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.log("None of LogIn!!!");
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/comments/${commentId}`;
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
      const resData = res.data as CommentsData;
      SessionStorage.setItem(`patchCommentsId`, resData);
      return resData;
    } else {
      throw new Error("Failed to patchCommentsId()");
    }
  } catch (error) {
    //console.error('Error to patchCommentsId():', error);
    throw error;
  }
};

/**
 * 댓글 삭제 요청하는 함수
 * https://wikied-api.vercel.app/10-3/comments/1
 */
export const deleteCommentsId = async (
  commentId: number
): Promise<CommentsIdData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.log("None of LogIn!!!");
    return null;
  }

  const URL = `https://wikied-api.vercel.app/${teamId}/comments/${commentId}`;
  console.log("DELETE - URL: ", URL);

  try {
    const res = await axios.delete(URL, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 200) {
      const resData = res.data as CommentsIdData;
      SessionStorage.setItem(`deleteCommentsId`, resData);
      return resData;
    } else {
      throw new Error("Failed to deleteCommentsId()");
    }
  } catch (error) {
    //console.error('Error to deleteCommentsId():', error)
    throw error;
  }
};
