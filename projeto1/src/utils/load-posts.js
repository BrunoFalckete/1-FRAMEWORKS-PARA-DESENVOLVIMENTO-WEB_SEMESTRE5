export const loadPosts = async (postService, photoService) => {
  const postsJson = await postService.getAllPosts();
  const photosJson = await photoService.getAllPhotos();

  // the time complexity O(n) -> linear
  const photosAndPosts = postsJson.map((post, index) => {
    return {
      ...post,
      image: photosJson[index].url,
    };
  });

  return photosAndPosts;
};
