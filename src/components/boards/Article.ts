import axios from "axios";
import SessionStorage from "@/api/storage/SessionStorage";
import { ArticlesDetailData } from "@/api/swagger/Wikid.types";

/**
 * 게시글 상세 조회 함수
 * https://wikied-api.vercel.app/10-3/articles/1
 */
export const getArticlesId = async (
  articleId: number
): Promise<ArticlesDetailData | null> => {
  const URL = `https://wikied-api.vercel.app/10-3/articles/${articleId}`;
  console.log("GET - URL: ", URL);

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
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
    console.error("Error to getArticlesId():", error);
    //throw error;
  }
};
