// Importações de módulos e componentes
import React, { useCallback, useEffect, useState } from "react"; // Importa módulos React
import "../index.css"; // Importa um arquivo de estilo CSS para a página
import PostService from "../services/postService"; // Importa um serviço relacionado a posts
import { PostCard } from "../components/PostCard"; // Importa um componente de cartão de post
import { loadPosts } from "../utils/load-posts"; // Importa uma função para carregar posts
import PhotoService from "../services/photoService"; // Importa um serviço relacionado a fotos
import { MoreButton } from "../components/MoreButton"; // Importa um componente de botão "Carregar mais"

// Definição do componente Home
export const Home = () => {
  // Estados do componente
  const [posts, setPosts] = useState([]); // Estado para os posts exibidos
  const [allPosts, setAllPosts] = useState([]); // Estado para todos os posts
  const [page, setPage] = useState(0); // Estado para o número da página atual
  const [postsPerPage] = useState(5); // Número de posts por página
  const [searchValue, setSearchValue] = useState(""); // Estado para o valor de busca

  // Filtra os posts com base no valor de busca
  const filteredPosts = !!searchValue
    ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : posts;

  // Função assíncrona para carregar posts e fotos
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postService = new PostService(); // Cria uma instância do serviço de posts
    const photoService = new PhotoService(); // Cria uma instância do serviço de fotos
    const photosAndPosts = await loadPosts(postService, photoService); // Carrega posts e fotos

    setPosts(photosAndPosts.slice(page, page + postsPerPage));
    setAllPosts(photosAndPosts);
  }, []);

  // Função para carregar mais posts
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postsPerPage);

    setPosts([...posts, ...nextPost]);
    setPage(nextPage);
  };

  // Função para lidar com a pesquisa
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  // Carrega posts quando o componente é montado
  useEffect(() => {
    handleLoadPosts();
  }, [handleLoadPosts]);

  // Retorna a estrutura HTML do componente
  return (
    <section className="container">
      <input
        type="text"
        name="txtSearch"
        id="txtSearch"
        placeholder="Buscar..."
        onChange={handleSearch}
        value={searchValue}
      />

      <div className="posts">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            image={post.image}
            title={post.title}
            body={post.body}
          />
        ))}
      </div>
      <MoreButton title="Carregar mais posts" action={loadMorePosts} />
    </section>
  );
};
