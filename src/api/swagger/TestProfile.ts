import axios from "axios";
import {
  ProfilesProps,
  ProfilesData,
  ProfileListData,
  ProfilesCodeProps,
  ProfilesCodePingData,
  ProfilesCodePingProps,
} from "./Wikid.types";
import { getAccessToken } from "@/hooks/Token";

// 팀 ID 상수 (소문자)
const teamId = "10-3";

/**
 * '프로필 생성' 요청을 보내는 함수
 */
export const postProfiles = async (
  reqProps: ProfilesProps
): Promise<ProfilesData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error("Access token is required");

  const URL = `https://wikied-api.vercel.app/${teamId}/profiles`;

  try {
    const res = await axios.post(
      URL,
      {
        securityAnswer: reqProps.securityAnswer,
        securityQuestion: reqProps.securityQuestion,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data as ProfilesData;
  } catch (error) {
    console.error("Error in postProfiles:", error);
    throw error;
  }
};

/**
 * 프로필 목록 조회 함수
 */
export const getProfiles = async (
  page: number,
  pageSize: number,
  name: string
): Promise<ProfileListData> => {
  const URL = `https://wikied-api.vercel.app/${teamId}/profiles?page=${page}&pageSize=${pageSize}&name=${name}`;

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data as ProfileListData;
  } catch (error) {
    console.error("Error in getProfiles:", error);
    throw error;
  }
};

/**
 * 개별 프로필 조회 함수
 */
export const getProfilesCode = async (code: string): Promise<ProfilesData> => {
  const URL = `https://wikied-api.vercel.app/${teamId}/profiles/${code}`;

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data as ProfilesData;
  } catch (error) {
    console.error("Error in getProfilesCode:", error);
    throw error;
  }
};

/**
 * 프로필 수정 함수
 */
export const patchProfilesCode = async (
  code: string,
  reqProps: { content: string }
) => {
  const URL = `https://wikied-api.vercel.app/10-3/profiles/${code}`;

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxOCwidGVhbUlkIjoiMTAtMyIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzMyNjgyNDA5LCJleHAiOjE3MzI2ODQyMDksImlzcyI6InNwLXdpa2llZCJ9.B_vhzefmKt1dWATeCDc1HZrpUmQeV0ClwOS1f3hL5jk";

  try {
    const res = await axios.patch(
      URL,
      { content: reqProps.content },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "patchProfilesCode 에러:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * 프로필 수정 중 체크 함수
 */
export const getProfilesCodePing = async (
  code: string
): Promise<ProfilesCodePingData> => {
  const URL = `https://wikied-api.vercel.app/${teamId}/profiles/${code}/ping`;

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data as ProfilesCodePingData;
  } catch (error) {
    console.error("Error in getProfilesCodePing:", error);
    throw error;
  }
};

/**
 * 프로필 수정 중 갱신 함수
 */
export const postProfilesCodePing = async (
  code: string,
  reqProps: ProfilesCodePingProps
): Promise<ProfilesCodePingData> => {
  const URL = `https://wikied-api.vercel.app/10-3/profiles/${code}/ping`;

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxOCwidGVhbUlkIjoiMTAtMyIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzMyNjgyNDA5LCJleHAiOjE3MzI2ODQyMDksImlzcyI6InNwLXdpa2llZCJ9.B_vhzefmKt1dWATeCDc1HZrpUmQeV0ClwOS1f3hL5jk";

  try {
    const res = await axios.post(
      URL,
      { securityAnswer: reqProps.securityAnswer },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // 토큰 추가
        },
      }
    );

    return res.data as ProfilesCodePingData;
  } catch (error: any) {
    console.error("Error in postProfilesCodePing:", error.response?.data);
    throw error;
  }
};
