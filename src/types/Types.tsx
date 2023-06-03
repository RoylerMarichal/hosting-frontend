 
export type PublicationType = {
  id: number;
  type: string;
  reaction: string;
  user: User;
  contents: [PublicationContent];
  _count: PublicationCount;
};

export type PublicationContentInput = {
  content: string
  type: string
}

export interface QuizType {
  tournamentId?: string;
  shortName: string;
}


export interface TimelineType {
  publication: PublicationType;
}
export interface CountryType {
  name: string;
  shortName: string;
}

export interface PeopleType {
  id: number;
  username: string;
  email: string;
  avatar: string;
  resume: string;
  followersCount: number;
  slug: string;
  followedBy: {
    follower: Follower[];
  };
  _count: {
    followedBy;
    following;
  };
}
export interface Player {
  id: number;
  points: number;
  ranking: number;
  ranking_i: number;
  ranking_n: number;
  ranking_p: number;
  ranking_m: number;
  user: User;
}

export type PublicationContent = {
  content: string;
  type: string;
};

type PublicationCount = {
  PublicationLikes: number;
  PublicationComments: number;
};

export type Follower = {
  id: number;
};
export interface PostType {
  name: string;
  key: string;
  current: boolean;
  disabled: boolean;
}

export type User = {
  id: number;
  email: string;
  avatar: string;
  phone: string;
  slug: string;
  cover: string;
  avatar_thumbnail: string;
  username: string;
  type: string;
  followedBy: [FollowBy];
  following: [Following];
  include: [FollowBy];
  _count: FollowCount;
};

export type FollowBy = {
  follower: Follow;
};
export type Following = {
  following: Follow;
};

export type Follow = {
  avatar: string;
  username: string;
  id: number;
  followedBy: [FollowBy];
  following: [Following];
};

export type FollowCount = {
  followedBy: number;
  following: number;
};
