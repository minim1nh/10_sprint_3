import axios from 'axios';
import SessionStorage from '@/api/storage/SessionStorage';
import { teamId, ProfilesProps, ProfilesData, ProfileListData, ProfilesCodeProps, ProfilesCodePingData, ProfilesCodePingProps } from '@/api/swagger/Wikid.types';
import { getAccessToken } from '@/hooks/Token'

/**
 * '프로필생성' 요청을 보내는 함수
 */
export const postProfiles = async (reqProps: ProfilesProps): Promise<ProfilesData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  const URL = `https://wikied-api.vercel.app/${teamId}/profiles`;
  console.log("POST - postProfiles(): ", URL);

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

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProfilesData;
      SessionStorage.setItem(`postProfiles`, resData);

      return resData;
    } else {
      throw new Error("Failed to Profiles postProfiles()");
    }
  } catch (error) {
    //console.error('Error to Profiles postProfiles():', error);
    throw error;
  }

  return null;
};

/**
 * 프로필 목록 조회 함수
 * https://wikied-api.vercel.app/10-3/profiles?page=1&pageSize=10&name=%EA%B9%80%EC%A3%BC%EB%8F%99
 */
export const getProfiles = async (
  page: number,
  pageSize: number,
  name: string
): Promise<ProfileListData | null> => {
  const URL = `https://wikied-api.vercel.app/${teamId}/profiles?page=${page}&pageSize=${pageSize}&name=${name}`;
  console.log("GET - getProfiles(): ", URL);

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProfileListData;
      SessionStorage.setItem(`getProfiles`, resData);

      return resData;
    } else {
      throw new Error("Failed to getMe()");
    }
  } catch (error) {
    //console.error('Error to getMe():', error);
    throw error;
  }

  return null;
};

/**
 * 개별 프로필 조회 함수
 * https://wikied-api.vercel.app/10-3/profiles/1
 */
export const getProfilesCode = async (code: string): Promise<ProfilesData | null> => {
  const teamId = "10-3";
  const URL = `https://wikied-api.vercel.app/${teamId}/profiles/${code}`;
  console.log("GET - getProfilesCode: ", URL);

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProfilesData;
      SessionStorage.setItem(`getProfilesCode`, resData);

      return resData;
    } else {
      throw new Error("Failed to getProfilesCode()");
    }
  } catch (error) {
    //console.error('Error to getProfilesCode():', error);
    throw error;
  }

  return null;
};

/**
 * 프로필 수정하는 함수
 *
 * 본인 프로필이 아닐 경우 content 만 수정 가능합니다. 나머지 필드는 무시됩니다.
 * 프로필을 수정하기 위해서는 '프로필 수정 중 갱신(pingProfileUpdate)' API를 사용하여 현재 유저가 수정 중임을 알려주어야 합니다.
 */
export const patchProfilesCode = async (code: string, reqProps: ProfilesCodeProps): Promise<ProfilesData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  const URL = `https://wikied-api.vercel.app/${teamId}/profiles/${code}`;
  console.log("PATCH - patchProfilesCode(): ", URL);

  try {
    const res = await axios.patch(
      URL,
      {
        securityAnswer: reqProps.securityAnswer,
        securityQuestion: reqProps.securityQuestion,
        nationality: reqProps.nationality,
        family: reqProps.family,
        bloodType: reqProps.bloodType,
        nickname: reqProps.nickname,
        birthday: reqProps.birthday,
        sns: reqProps.sns,
        job: reqProps.job,
        mbti: reqProps.mbti,
        city: reqProps.city,
        image: reqProps.image,
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

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProfilesData;
      SessionStorage.setItem(`patchProfilesCode`, resData);

      return resData;
    } else {
      throw new Error("Failed to patchProfilesCode()");
    }
  } catch (error) {
    //console.error('Error to patchProfilesCode():', error);
    throw error;
  }

  return null;
};

/**
 * 프로필 수정 중 체크하는 함수
 * 5분 이내의 프로필 수정 여부 상태를 확인할 수 있습니다.
 * https://wikied-api.vercel.app/10-3/profiles/1/ping
 */
export const getProfilesCodePing = async (code: string): Promise<ProfilesCodePingData | null> => {
  const URL = `https://wikied-api.vercel.app/${teamId}/profiles/${code}/ping`;
  console.log("GET - getProfilesCodePing(): ", URL);

  try {
    const res = await axios.get(URL, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProfilesCodePingData;
      SessionStorage.setItem(`getProfilesCodePing`, resData);

      return resData;
    } else {
      throw new Error("Failed to getProfilesCodePing()");
    }
  } catch (error) {
    //console.error('Error to getProfilesCodePing():', error);
    throw error;
  }

  return null;
};

/**
 * 프로필 수정 중 갱신을 보내는 함수
 *
 * 프로필 수정 중 상태를 갱신합니다. 5분 동안 프로필 수정 중 상태를 유지합니다.
 * 5분 이내에 갱신하지 않을 경우 프로필 수정이 불가능합니다.
 */
export const postProfilesCodePing = async (code: string, reqProps: ProfilesCodePingProps): Promise<ProfilesCodePingData | null> => {
  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  const URL = `https://wikied-api.vercel.app/${teamId}/profiles/${code}/ping`;
  console.log("POST - postProfilesCodePing(): ", URL);

  try {
    const res = await axios.post(
      URL,
      {
        securityAnswer: reqProps.securityAnswer,
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ProfilesCodePingData;
      SessionStorage.setItem(`postProfilesCodePing`, resData);

      return resData;
    } else {
      throw new Error("Failed to Profiles postProfilesCodePing()");
    }
  } catch (error) {
    //console.error('Error to Profiles postProfilesCodePing():', error);
    throw error;
  }

  return null
};
