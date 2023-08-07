export const getYouTubeVideoId = (url = '') => {
  try {
    // parse the url string
    const { hostname, pathname, searchParams } = new URL(url);

    // check if the url is a youtube video url
    const hostnameWithoutWWW = hostname.replace(/^www\./, '');
    if (!['youtube.com', 'm.youtube.com', 'youtu.be'].includes(hostnameWithoutWWW)) return null;

    // https://youtu.be/VIDEO_ID
    if (hostnameWithoutWWW === 'youtu.be') return pathname.split('/')[1];

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (pathname === '/watch') return searchParams.get('v');

    // https://www.youtube.com/v/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    if (pathname.startsWith('/v/') || pathname.startsWith('/embed/')) return pathname.split('/')[2];

    return null;
  } catch (error) {
    return null;
  }
};
