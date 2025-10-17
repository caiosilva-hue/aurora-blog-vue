import { useState } from "react";
import { QuizQuestion } from "@/services/practice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface PracticeQuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const PracticeQuiz = ({ questions, onComplete }: PracticeQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    const optionLetter = option.charAt(0);
    const correct = optionLetter === questions[currentQuestion].correct_option;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => {
        const nextCompleted = completedQuestions + 1;
        setCompletedQuestions(nextCompleted);
        
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setIsCorrect(null);
        } else {
          onComplete();
        }
      }, 1500);
    }
  };

  if (completedQuestions === questions.length) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Prática concluída!</h3>
          <p className="text-muted-foreground">Parabéns! Você acertou todas as questões.</p>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>
          Questão {currentQuestion + 1} de {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const optionLetter = option.charAt(0);
            const isCorrectOption = optionLetter === question.correct_option;
            
            return (
              <Button
                key={index}
                variant={
                  isSelected
                    ? isCorrect
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => handleSelectOption(option)}
                disabled={selectedOption !== null}
              >
                <span className="flex items-center gap-2">
                  {option}
                  {isSelected && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 ml-auto" />
                  )}
                  {isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 ml-auto" />
                  )}
                </span>
              </Button>
            );
          })}
        </div>

        {isCorrect === false && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
            <p className="text-destructive font-medium">Tente de novo!</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => {
                setSelectedOption(null);
                setIsCorrect(null);
              }}
            >
              Tentar novamente
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticeQuiz;
