export interface YoutubeVideoInfoResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items?: YoutubeVideoInfo[];
}

export interface YoutubeVideoInfo {
  kind: 'youtube#video';
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in YoutubeVideoInfoThumbnailKey]?: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: 'none' | 'live' | 'upcoming';
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction: {
      allowed: string[];
      blocked: string[];
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export type YoutubeVideoInfoThumbnailKey = 'default' | 'medium' | 'high' | 'standard' | 'maxres';

export interface YoutubeCommentThreadsRequestOptions {
  maxResults?: number;
  order?: YoutubeCommentThreadsOrder;
}

export type YoutubeCommentThreadsOrder = 'time' | 'relevance';

export interface YoutubeCommentThreadsResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  items?: YoutubeCommentThread[];
}

export interface YoutubeCommentThread {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    topLevelComment: YoutubeComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
}

export interface YoutubeComment {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
  };
}
