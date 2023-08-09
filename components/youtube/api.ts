import sanitizeHtml from 'sanitize-html';

import {
  YouTubeCommentThread,
  YouTubeCommentThreadsRequestOptions,
  YouTubeCommentThreadsResponse,
  YouTubeListCaptionsResponse,
  YouTubeVideoInfoResponse,
} from './type';

export const fetchYouTubeVideoInfo = async (videoId: string) => {
  const params = new URLSearchParams({
    id: videoId,
    part: 'snippet,contentDetails,statistics,liveStreamingDetails',
  });
  const url = `/api/proxy/youtube/v3/videos?${params.toString()}`;

  const response = await fetch(url);
  const json = (await response.json()) as YouTubeVideoInfoResponse;

  return json.items?.[0];
};

export const fetchYouTubeVideoCaptionLanguages = async (videoId: string) => {
  // fetch all available caption languages
  const params = new URLSearchParams({
    videoId,
    part: 'snippet',
  });
  const url = `/api/proxy/youtube/v3/captions?${params.toString()}`;
  const response = await fetch(url);
  const captions = (await response.json()) as YouTubeListCaptionsResponse;

  const languages = captions.items
    // sort English & Chinese caption to front
    .map((item) => {
      const lang = item.snippet.language;
      let ranking = 0;
      if (lang.startsWith('zh')) ranking = 1;
      else if (lang.startsWith('en')) ranking = 2;
      return { ranking, lang };
    })
    .sort((a, b) => {
      if (a.ranking !== b.ranking) return b.ranking - a.ranking;
      return a.lang.localeCompare(b.lang);
    })
    // keep only the language, remove the ranking
    .map(({ lang }) => lang);

  const english = languages.filter((l) => l.startsWith('en'))[0];
  const chinese = languages.filter((l) => l.startsWith('zh'))[0];
  return { languages, english, chinese };
};

export const fetchYouTubeVideoCaption = async (videoId: string, lang: string) => {
  const params = new URLSearchParams({ videoId, lang });
  const url = `/api/youtube/caption?${params.toString()}`;
  const response = await fetch(url);
  const caption = await response.text();
  return caption;
};

export const fetchYouTubeVideoComments = async (
  videoId: string,
  options?: YouTubeCommentThreadsRequestOptions,
) => {
  const { maxResults = 50, order = 'relevance' } = options || {};

  const comments: YouTubeCommentThread[] = [];
  let pageToken = '';

  while (comments.length < maxResults) {
    const params = new URLSearchParams({
      videoId,
      part: 'snippet',
      maxResults: Math.min(maxResults, 100).toString(),
      order,
      pageToken,
    });
    const url = `/api/proxy/youtube/v3/commentThreads?${params.toString()}`;
    const response = await fetch(url);
    const json = (await response.json()) as YouTubeCommentThreadsResponse;

    if (json.items?.length) {
      // remove html tags from comment text
      for (const item of json.items || []) {
        const { textDisplay } = item.snippet.topLevelComment.snippet;
        const text = sanitizeHtml(textDisplay, { allowedTags: ['br'] }).replaceAll('<br />', '\n');
        item.snippet.topLevelComment.snippet.textDisplay = text;
      }
      comments.push(...json.items!);
    }

    if (!json.items || !json.nextPageToken) break;

    pageToken = json.nextPageToken;
  }

  return comments;
};
