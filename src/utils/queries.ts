import { PublicationContentInput, PublicationType } from "./../types/Types";
import { IKUpload } from "imagekitio-react";
import { gql } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query Me {
    me {
      following {
        following {
          id
        }
      }
      id
      username
    }
  }
`;
const GET_CURRENT_USER_FULL = gql`
  query Me {
    me {
      id
      username
      email
      resume
      avatar
      type
      avatar_thumbnail
      cover
      phone
      TournamentRanking {
        points
      }
      Language {
        id
        name
      }
      amounts {
        id
        amount
        currency {
          name
          code
        }
      }
    }
  }
`;

const GET_USER_MOVEMENTS = gql`
  query GetMovementsForUser {
    getMovementsForUser {
      amount
      details
      model
      type
      status
    }
  }
`;

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: String!) {
    uploadAvatar(avatar: $avatar)
  }
`;

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        avatar
        email
        username
      }
    }
  }
`;
const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      email
      username
      avatar
      name
      city
      resume
      type
      cover
      _count {
        followedBy
        following
      }
    }
  }
`;

const REGISTER_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        name
        username
        email
        avatar
        avatar_thumbnail
      }
    }
  }
`;
const LIKE_PUBLICATION = gql`
  mutation LikePublication($publicationId: Int!) {
    likePublication(publicationId: $publicationId)
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($followingId: Int!) {
    followUser(followingId: $followingId)
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser(
    $email: String
    $username: String
    $password: String
    $avatar: String
    $resume: String
    $cover: String
    $avatarThumbnail: String
    $phone: String
    $country: String
    $state: String
    $city: String
    $languageId: Int
  ) {
    updateUser(
      email: $email
      username: $username
      password: $password
      avatar: $avatar
      cover: $cover
      resume: $resume
      avatar_thumbnail: $avatarThumbnail
      phone: $phone
      country: $country
      state: $state
      city: $city
      languageId: $languageId
    ) {
      email
      id
      username
      avatar
      type
    }
  }
`;
const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
const CHECK_RESET_PASSWORD_CODE = gql`
  mutation CheckResetCode($email: String!, $resetCode: String!) {
    checkResetCode(email: $email, resetCode: $resetCode) {
      userId
    }
  }
`;
const UPDATE_PASSWORD_BY_USERID = gql`
  mutation UpdatePasswordByEmail($userId: Int!, $newPassword: String!) {
    updatePasswordByEmail(userId: $userId, newPassword: $newPassword)
  }
`;

const TIMELINE_SUBSCRIPTION = gql`
  subscription Subscription($userId: Int!) {
    postCreated(userId: $userId) {
      postId
    }
  }
`;

const GET_SERVICES = gql`
  query GetServices {
    getServices {
      name
      description
      resume
    }
  }
`;

export {
  GET_SERVICES,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD_BY_USERID,
  CHECK_RESET_PASSWORD_CODE,
  GET_USER_MOVEMENTS,
  LIKE_PUBLICATION,
  TIMELINE_SUBSCRIPTION,
  GET_CURRENT_USER_FULL,
  UPDATE_USER,
  UPLOAD_AVATAR,
  FOLLOW_USER,
  GET_CURRENT_USER,
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
};
