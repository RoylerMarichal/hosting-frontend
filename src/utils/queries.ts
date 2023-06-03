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

const PROPAGATE_PUBLICATION_ON_NEW_USER = gql`
  mutation Mutation {
    propagateTheFirstPublicationsForNewUser
  }
`;

const GET_USERS_BY_TYPE = gql`
  query getUsersByType($type: String!, $search: String) {
    getUsersByType(type: $type, search: $search) {
      id
      email
      username
      avatar
      resume
      _count {
        followedBy
        following
      }
      followedBy {
        follower {
          id
        }
      }
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
const GET_USER_IN_TOURNAMENT = gql`
  query getUserInTournament($tournamentId: Int!, $userId: Int) {
    getUserInTournament(tournamentId: $tournamentId, userId: $userId) {
      userId
      points
      ranking
    }
  }
`;
const CREATE_PUBLICATION = gql`
  mutation CreatePublication(
    $type: String
    $contents: [PublicationContentInput]
    $reaction: String
  ) {
    createPublication(type: $type, contents: $contents, reaction: $reaction) {
      id
    }
  }
`;

const GET_TIMELINE = gql`
  query Timeline($limit: Int, $offset: Int) {
    timeline(limit: $limit, offset: $offset) {
      id
      publication {
        id
        reaction
        type
        contents {
          type
          content
        }
        user {
          avatar
          id
          username
          avatar_thumbnail
        }
        _count {
          PublicationLikes
          PublicationComments
        }
      }

      readed
    }
  }
`;
const GET_TIMELINE_USER = gql`
  query userTimeline($offset: Int, $limit: Int, $userId: Int) {
    userTimeline(offset: $offset, limit: $limit, userId: $userId) {
      id
      readed
      publication {
        id
        reaction
        type
        contents {
          type
          content
        }
        user {
          avatar
          id
          username
          avatar_thumbnail
        }
        _count {
          PublicationLikes
          PublicationComments
        }
      }
    }
  }
`;
const GET_TOURNAMENTS = gql`
  query GetAllTournaments {
    getAllTournaments {
      id
      title
      avatar
      status
      startDate
      endDate
      players {
        points
        user {
          avatar
          username
        }
      }
      _count {
        players
      }
    }
  }
`;
const GET_LANGUAGES = gql`
  query GetLanguages {
    getLanguages {
      id
      name
      lng
    }
  }
`;
const GET_TOURNAMENTS_PLAYERS = gql`
  query GetAllTournamentsPlayers {
    getAllTournamentsPlayers {
      id
      username
      avatar
      ranking
      points
    }
  }
`;
const GET_TOURNAMENT_RANKING = gql`
  query GetRanking(
    $country: String
    $state: String
    $city: String
    $first: Int
    $skip: Int
  ) {
    getRanking(
      country: $country
      state: $state
      city: $city
      first: $first
      skip: $skip
    ) {
      rankingInternational {
        points
        ranking_i
        user {
          username
          avatar
          country
        }
      }
      rankingNational {
        points
        ranking_n
        user {
          username
          avatar
          state
        }
      }
      rankingState {
        points
        ranking_p
        user {
          username
          avatar
          city
        }
      }
      rankingCity {
        points
        ranking_m
        user {
          username
          avatar
          country
        }
      }
    }
  }
`;
const GET_TOURNAMENT = gql`
  query GetTournament($getTournamentId: Int!) {
    getTournament(id: $getTournamentId) {
      title
      startDate
      endDate
      players {
        points
        ranking
        user {
          avatar
          username
          avatar_thumbnail
        }
      }
      description
      challenges {
        id
        name
        questions
        questionsNumber
      }
      _count {
        players
        challenges
      }
    }
  }
`;
const GET_CHALLANGES_BY_USER_BY_TOURNAMENT = gql`
  query Query($tournamentId: Int!) {
    getChallangeByUser(tournamentId: $tournamentId)
  }
`;
const GET_CHALLANGE = gql`
  query GetChallange($getChallangeId: Int!) {
    getChallange(id: $getChallangeId) {
      id
      questions
      name
      time
      questionsNumber
      level
      category
      tournamentId
    }
  }
`;
const GET_CHALLANGE_QUESTIONS = gql`
  query GetChallangeQuestions($challangeId: Int) {
    getChallangeQuestions(challangeId: $challangeId) {
      question
      answers
      correctAnswer
      questionType
      answerSelectionType
      level
      tags
      categories
    }
  }
`;

const JOIN_TO_BIBLIAL_TOURNAMENT = gql`
  mutation JoinToBiblicalTournament($tournamentId: Int!, $userId: Int) {
    joinToBiblicalTournament(tournamentId: $tournamentId, userId: $userId)
  }
`;
const SAVE_CHALLANGE_FOR_USER = gql`
  mutation SaveChallangeForOneUser(
    $challengeId: Int!
    $playerId: Int
    $points: Float
    $bonusTimePoints: Float
  ) {
    saveChallangeForOneUser(
      challengeId: $challengeId
      playerId: $playerId
      points: $points
      bonusTimePoints: $bonusTimePoints
    ) {
      id
      points
    }
  }
`;
const JOIN_TO_ARENA = gql`
  mutation Mutation {
    joinToArena
  }
`;
const LEAVE_TO_ARENA = gql`
  mutation Mutation {
    leaveToArena
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

export {
  PROPAGATE_PUBLICATION_ON_NEW_USER,
  FORGOT_PASSWORD,
  UPDATE_PASSWORD_BY_USERID,
  CHECK_RESET_PASSWORD_CODE,
  GET_USER_MOVEMENTS,
  LIKE_PUBLICATION,
  GET_TOURNAMENTS_PLAYERS,
  GET_CHALLANGES_BY_USER_BY_TOURNAMENT,
  SAVE_CHALLANGE_FOR_USER,
  GET_CHALLANGE,
  GET_CHALLANGE_QUESTIONS,
  GET_TOURNAMENT,
  GET_TOURNAMENTS,
  GET_TOURNAMENT_RANKING,
  GET_USER_IN_TOURNAMENT,
  JOIN_TO_BIBLIAL_TOURNAMENT,
  JOIN_TO_ARENA,
  LEAVE_TO_ARENA,
  CREATE_PUBLICATION,
  GET_TIMELINE_USER,
  TIMELINE_SUBSCRIPTION,
  GET_TIMELINE,
  GET_CURRENT_USER_FULL,
  UPDATE_USER,
  UPLOAD_AVATAR,
  FOLLOW_USER,
  GET_CURRENT_USER,
  LOGIN_USER,
  REGISTER_USER,
  GET_USERS_BY_TYPE,
  GET_USER,
  GET_LANGUAGES,
};
