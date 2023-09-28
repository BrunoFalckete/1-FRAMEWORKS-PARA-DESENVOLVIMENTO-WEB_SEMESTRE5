class PostService {
  async getAllPosts() {
    try {
      const photos = await fetch("https://jsonplaceholder.typicode.com/posts");
      return await photos.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default PostService;
