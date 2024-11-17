export const teamId = '10-3';

// Auth Types

export type ProfileData = {
  code: string;
  id: number;
}

export type UserData = {
  id: number;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  profile: ProfileData;
  email?: string;
};

export type SignInData = {
  user: UserData;
  accessToken: string;
  refreshToken: string;
};

export type SignUpData = SignInData;

export type SignInProps = {
  email: string;
  password: string;
};

export type SignUpProps = SignInProps & {
  name: string;
  passwordConfirmation: string;
};

export type RefreahData = {
  accessToken: string
}

// User Types
export type PasswordProps = {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
}

// Profiles
export type ProfilesProps = {
  securityAnswer: string;
  securityQuestion: string;
}

export type Profile = {
  updatedAt: string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

export type ProfilesData = Profile & {
  securityQuestion: string;
  teamId: string;
  content: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  mbti: string;
}

export type ProfileListData = {
  totalCount: number;
  list: ProfilesData[];
}

export type ProfilesCodeProps = {
  securityAnswer: string;
  securityQuestion: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  content: string;
}

export type ProfilesCodePingData = {
  registeredAt: string;
  userId: number;
}

export type ProfilesCodePingProps = {
  securityAnswer: string;
}

// Notification
export type NotificationList = {
  createdAt: string;
  content: string;
  id: number;
}

export type NotificationsData = {
  totalCount: number;
  list: NotificationList[];
}

export type NotificationsIdData = {
  createdAt: string;
  content: string;
  id: number;
}

export type ImageUploadData = {
  url: string;
}

export type ImageUploadProps = {
  path: string;
}

// Comments
export type CommentsProps = {
  content: string;
}

export type CommentsWriter = {
  image: string;
  name: string;
  id: number;
}

export type CommentsData = {
  writer: CommentsWriter;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export type CommentsListData = {
  nextCursor: number;
  list: CommentsData[];
}

export type CommentsIdData = {
  id: number;
}

// Articles
export type ArticlesProps = {
  image: string;
  content: string;
  title: string;
}

export type ArticlesWriter = {
  name: string;
  id: number;
}

export type ArticlesData = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: ArticlesWriter;
  image: string;
  title: string;
  id: number;
}

export type ArticlesListData = {
  totalCount: number;
  list: ArticlesData[];
}

export type ArticlesDetailData = ArticlesData & {
  isLiked: boolean;
  content: string;
}

export type ArticlesIdData = {
  id: number;
}

export type ArticlesIdLikeData = ArticlesData & {
  isLiked: boolean;
  content: string;
}
