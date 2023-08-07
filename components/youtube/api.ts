import { YoutubeVideoInfoResponse } from './type';

export const fetchYouTubeVideoInfo = async (videoId: string) => {
  const params = new URLSearchParams({
    id: videoId,
    part: 'snippet,contentDetails,statistics',
  });
  const url = `/api/proxy/youtube/v3/videos?${params.toString()}`;

  const response = await fetch(url);
  const json = (await response.json()) as YoutubeVideoInfoResponse;

  return json.items?.[0];
};
