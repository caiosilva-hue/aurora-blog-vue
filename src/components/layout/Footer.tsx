import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <span className="text-sm font-bold text-primary-foreground">B</span>
            </div>
            <span className="text-sm font-semibold text-blog-title">Blog</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-blog-text-light">
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/sobre" className="transition-colors hover:text-primary">
              Sobre
            </Link>
            <Link to="/contato" className="transition-colors hover:text-primary">
              Contato
            </Link>
            <Link to="/privacidade" className="transition-colors hover:text-primary">
              Privacidade
            </Link>
          </nav>

          <p className="text-sm text-blog-text-light">
            © {new Date().getFullYear()} Blog. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
