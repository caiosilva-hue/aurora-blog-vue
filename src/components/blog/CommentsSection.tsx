import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
}

interface CommentsSectionProps {
  comments?: Comment[];
}

const CommentsSection = ({ comments = [] }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn] = useState(false); // Will be dynamic later

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will integrate with API later
    console.log("New comment:", newComment);
    setNewComment("");
  };

  return (
    <section className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold text-blog-title">
        Comentários ({comments.length})
      </h2>

      {/* Comment Form */}
      {isLoggedIn ? (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Deixe seu comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!newComment.trim()}>
                Comentar
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="p-6">
          <p className="text-blog-text-light text-center">
            <a href="/login" className="text-primary hover:underline">
              Faça login
            </a>{" "}
            para comentar
          </p>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="p-8">
            <p className="text-center text-blog-text-light">
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </p>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {comment.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-blog-title">
                      {comment.author}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-blog-text-light">
                      <Calendar className="h-3 w-3" />
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-blog-text">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
