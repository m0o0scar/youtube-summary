// Common

export type ContentStatus = 'pending' | 'empty' | 'loaded';

// Info

export interface YouTubeVideoInfoResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items?: YouTubeVideoInfo[];
}

export interface YouTubeVideoInfo {
  kind: 'youtube#video';
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in 'default' | 'medium' | 'high' | 'standard' | 'maxres']?: {
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
  liveStreamingDetails: {
    actualStartTime: string;
    actualEndTime: string;
    scheduledStartTime: string;
    scheduledEndTime: string;
    concurrentViewers: number;
    activeLiveChatId: string;
  };
}

// Caption

export interface YouTubeListCaptionsResponse {
  kind: string;
  etag: string;
  items: YouTubeListCaptionsItem[];
}

export interface YouTubeListCaptionsItem {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    lastUpdated: string;
    trackKind: string;
    language: string;
    name: string;
    audioTrackType: string;
    isCC: boolean;
    isLarge: boolean;
    isEasyReader: boolean;
    isDraft: boolean;
    isAutoSynced: boolean;
    status: string;
  };
}

// Comments

export interface YouTubeCommentThreadsRequestOptions {
  maxResults?: number;
  order?: 'time' | 'relevance';
}

export interface YouTubeCommentThreadsResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  items?: YouTubeCommentThread[];
}

export interface YouTubeCommentThread {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    videoId: string;
    topLevelComment: YouTubeComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
}

export interface YouTubeComment {
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

// Channel

export interface YouTubeChannelListResponse {
  kind: 'youtube#channelListResponse';
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeChannel[];
}

export interface YouTubeChannel {
  kind: 'youtube#channel';
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      [key in 'default' | 'medium' | 'high']: {
        url: string;
        width: number;
        height: number;
      };
    };
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };

  statistics: {
    viewCount: string;
    subscriberCount: string; // this value is rounded to three significant figures
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
}
