import { User } from "../auth/interfaces/user";

export interface TokenResponse {
    accessToken: string;
}

export interface UserResponse {
    user: User;
}

export interface UsersResponse {
    users: User[];
}

export interface AvatarResponse {
    avatar: string;
}

export interface UserProfileEdit {
    name: string;
    email: string;
}

export interface UserAvatarEdit {
    avatar: string;
}

export interface UserPasswordEdit {
    password: string;
}

export interface UserFollow {
    following: boolean;
}

export interface UserFollowers {
    followers: User[];
    followerCount: number;
}

export interface UserFollowing {
    followed: User[];
    followedCount: number;
}