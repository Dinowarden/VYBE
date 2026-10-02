export type ContentKind = "text" | "image" | "video";

export type MediaAsset = {
  url: string;
  posterUrl?: string;
  mime?: string;
  width?: number;
  height?: number;
  durationMs?: number;
};

export type PublicUser = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  followerCount: number;
  followingCount: number;
  likeCount: number;
};

export type ProfileRow = {
  userId: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  dateOfBirth: string | null;
  role: string;
  followerCount: number;
  followingCount: number;
  likeCount: number;
};

export type FeedPost = {
  id: string;
  author: PublicUser;
  kind: ContentKind;
  caption: string;
  hashtags: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  saveCount: number;
  viewCount: number;
  media: MediaAsset[];
  liked: boolean;
  saved: boolean;
  followingAuthor: boolean;
};

export type FeedComment = {
  id: string;
  postId: string;
  author: PublicUser;
  body: string;
  createdAt: string;
  likeCount: number;
  liked: boolean;
};

export type AppNotification = {
  id: string;
  type: "follow" | "like" | "comment" | "share";
  actor: PublicUser;
  post?: FeedPost;
  body: string;
  createdAt: string;
  read: boolean;
};
