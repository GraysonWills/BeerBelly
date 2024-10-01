export const getWikimediaImages = async (searchTerm) => {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.query.search.slice(0, 5).map(item => item.title);
  } catch (error) {
    console.error('Error fetching Wikimedia images:', error);
    return [];
  }
};
