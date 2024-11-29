import axios from 'axios';
import SessionStorage from '@/api/storage/SessionStorage';
import { teamId, ImageUploadProps, ImageUploadData } from '@/api/swagger/Wikid.types';
import { getAccessToken } from '@/hooks/Token'

/**
 * 이미지 업로드, 프로젝트에 저장하는 이미지들은 이 엔드포인트를 통해 업로드한 후 URL을 획득하여 사용합니다.
 */
export const postImagesUpload = async (reqProps: ImageUploadProps): Promise<ImageUploadData | null> => {

  const accessToken = getAccessToken();
  if (!accessToken) { console.log('None of LogIn!!!'); return null; }

  // create formdata
  const formData = new FormData();
  formData.append('image', reqProps.file);
  
  const URL = `https://wikied-api.vercel.app/${teamId}/images/upload`
  console.log('POST - postImagesUpload(): ', URL)

  try {
    const res = await axios.post(
      URL,formData,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': ' multipart/form-data',
          'Authorization': `Bearer ${accessToken}`,
          },
      }
    );

    if (res.status === 200 || res.status === 201) {
      const resData = res.data as ImageUploadData;
      SessionStorage.setItem(`postImagesUpload`, resData);

      return resData;
    } else {
      throw new Error('Failed to postImagesUpload()');
    }
  } catch (error) {
      //console.error('Error to postImagesUpload():', error);
    //throw error;
  }

  return null;
};
