import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/blog/PostCard";
import CommentsSection from "@/components/blog/CommentsSection";

// Mock data - will be replaced with API integration
const postData = {
  slug: "introducao-react-hooks",
  title: "Introdução aos React Hooks: Um Guia Completo",
  excerpt: "Aprenda a usar hooks do React para criar componentes mais limpos e funcionais. Descubra useState, useEffect e muito mais.",
  author: "Maria Silva",
  date: "15 Mar 2024",
  readTime: "8 min",
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
  content: `
    <p>React Hooks revolucionaram a forma como desenvolvemos componentes no React. Introduzidos na versão 16.8, os hooks permitem que você use estado e outros recursos do React sem escrever uma classe.</p>

    <h2>O que são Hooks?</h2>
    <p>Hooks são funções especiais que permitem "conectar-se" aos recursos do React. Eles permitem usar estado e outros recursos do React em componentes funcionais, eliminando a necessidade de componentes de classe.</p>

    <h2>useState: Gerenciando Estado</h2>
    <p>O hook useState é o mais fundamental. Ele permite adicionar estado a componentes funcionais:</p>

    <pre><code>const [count, setCount] = useState(0);</code></pre>

    <h2>useEffect: Efeitos Colaterais</h2>
    <p>O useEffect permite realizar efeitos colaterais em componentes funcionais. Ele serve como componentDidMount, componentDidUpdate e componentWillUnmount combinados.</p>

    <h2>Regras dos Hooks</h2>
    <p>Ao usar hooks, é importante seguir duas regras fundamentais:</p>
    <ul>
      <li>Apenas chame hooks no nível superior</li>
      <li>Apenas chame hooks de funções React</li>
    </ul>

    <h2>Conclusão</h2>
    <p>Hooks tornam o código React mais legível e fácil de manter. Eles permitem reutilizar lógica com estado entre componentes sem mudar sua hierarquia.</p>
  `,
};

const mockComments = [
  {
    id: "1",
    author: "João Pedro",
    date: "16 Mar 2024",
    content: "Excelente artigo! Os exemplos estão muito claros e ajudaram a entender melhor o conceito de hooks.",
  },
  {
    id: "2",
    author: "Ana Beatriz",
    date: "16 Mar 2024",
    content: "Estava com dúvidas sobre useEffect e agora ficou muito mais claro. Obrigada!",
  },
];

const Post = () => {
  const { slug } = useParams();

  // In a real app, fetch post data based on slug
  // For now, we'll use mock data

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <PostCard {...postData} variant="full" />

          {/* Post Content */}
          <article className="prose prose-lg mx-auto mt-8 max-w-3xl text-blog-text">
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </article>

          {/* Comments */}
          <div className="mx-auto max-w-3xl">
            <CommentsSection comments={mockComments} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Post;
