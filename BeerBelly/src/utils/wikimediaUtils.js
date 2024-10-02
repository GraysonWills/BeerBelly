export const getWikimediaImages = async (searchTerm) => {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=5&prop=imageinfo&iiprop=url&format=json&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.query && data.query.pages) {
      const imageUrls = Object.values(data.query.pages)
        .filter(page => page.imageinfo && page.imageinfo[0])
        .map(page => page.imageinfo[0].url);
      return imageUrls;
    }
    return [];
  } catch (error) {
    console.error('Error fetching Wikimedia images:', error);
    return [];
  }
};