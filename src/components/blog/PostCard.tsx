import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  variant?: "compact" | "detailed" | "full";
}

const PostCard = ({
  slug,
  title,
  excerpt,
  author,
  date,
  readTime,
  image,
  variant = "compact",
}: PostCardProps) => {
  if (variant === "compact") {
    return (
      <Card className="group overflow-hidden transition-all hover:shadow-md">
        <Link to={`/post/${slug}`} className="flex flex-col h-full">
          {image && (
            <div className="aspect-video w-full overflow-hidden bg-muted">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-col gap-3 p-5 flex-1">
            <h3 className="text-xl font-semibold text-blog-title line-clamp-2 transition-colors group-hover:text-primary">
              {title}
            </h3>
            <p className="text-sm text-blog-text line-clamp-2">{excerpt}</p>
            <div className="mt-auto flex items-center gap-4 text-xs text-blog-text-light">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime}
              </span>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === "detailed") {
    return (
      <Card className="group overflow-hidden transition-all hover:shadow-lg min-w-[320px] md:min-w-[400px]">
        <Link to={`/post/${slug}`} className="flex flex-col h-full">
          {image && (
            <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-col gap-4 p-6 flex-1">
            <h3 className="text-2xl font-bold text-blog-title line-clamp-2 transition-colors group-hover:text-primary">
              {title}
            </h3>
            <p className="text-blog-text line-clamp-3">{excerpt}</p>
            <div className="mt-auto flex items-center gap-4 text-sm text-blog-text-light">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  // full variant
  return (
    <article className="mx-auto max-w-3xl">
      {image && (
        <div className="mb-8 aspect-[21/9] w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-blog-title md:text-5xl">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-blog-text-light">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readTime}
            </span>
          </div>
        </div>
        <p className="text-lg text-blog-text leading-relaxed">{excerpt}</p>
      </div>
    </article>
  );
};

export default PostCard;
