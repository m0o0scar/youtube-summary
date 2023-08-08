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
      [key in YouTubeVideoInfoThumbnailKey]?: {
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

export type YouTubeVideoInfoThumbnailKey = 'default' | 'medium' | 'high' | 'standard' | 'maxres';

export interface YouTubeListCaptionItemSnippet {
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
}

export interface YouTubeListCaptionsItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeListCaptionItemSnippet;
}

export interface YouTubeListCaptionsResponse {
  kind: string;
  etag: string;
  items: YouTubeListCaptionsItem[];
}

export interface YouTubeCommentThreadsRequestOptions {
  maxResults?: number;
  order?: YouTubeCommentThreadsOrder;
}

export type YouTubeCommentThreadsOrder = 'time' | 'relevance';

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

export type ContentStatus = 'pending' | 'empty' | 'loaded';
