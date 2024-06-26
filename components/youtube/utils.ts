export const getYouTubeVideoId = (url = '') => {
  try {
    // parse the url string
    const { hostname, pathname, searchParams } = new URL(url);

    // check if the url is a youtube video url
    const hostnameWithoutWWW = hostname.replace(/^www\./, '');
    if (
      !['youtube.com', 'm.youtube.com', 'youtu.be', 'music.youtube.com'].includes(
        hostnameWithoutWWW,
      )
    )
      return null;

    // https://youtu.be/VIDEO_ID
    if (hostnameWithoutWWW === 'youtu.be') return pathname.split('/')[1];

    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://music.youtube.com/watch?v=bmOzRI5Job0&feature=shared
    if (pathname === '/watch') return searchParams.get('v');

    // https://www.youtube.com/v/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    // https://www.youtube.com/live/VIDEO_ID
    // https://music.youtube.com/podcast/VIDEO_ID
    const [_, type, videoId] = pathname.split('/');
    if (['v', 'embed', 'live', 'podcast'].includes(type)) return videoId;

    return null;
  } catch (error) {
    return null;
  }
};
