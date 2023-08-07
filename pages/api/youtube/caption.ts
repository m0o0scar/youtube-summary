import { NextApiRequest, NextApiResponse } from 'next';
import { getSubtitles } from 'youtube-caption-extractor';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const lang = request.query.lang as string;
  const videoID = request.query.videoId as string;

  if (!videoID) {
    response.status(400).json({ error: 'Missing videoId parma' });
    return;
  }

  if (!lang) {
    response.status(400).json({ error: 'Missing lang param' });
    return;
  }

  const subtitles = await getSubtitles({ videoID, lang });

  const content = subtitles.map(({ text }) => text.trim().replace(/\n/g, ' ')).join(' ');

  response.status(200).end(content);
}
