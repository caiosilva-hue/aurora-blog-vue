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

  // Normaliza correct_option para sempre retornar apenas a letra (A-E)
  const normalizeCorrectOption = (correctOption: string, options: string[]): string => {
    const trimmed = correctOption.trim();
    
    // Caso 1: Já é apenas uma letra (A-E)
    if (/^[A-E]$/i.test(trimmed)) {
      return trimmed.toUpperCase();
    }
    
    // Caso 2: Contém letra + ")" + texto (ex: "A) texto")
    const letterMatch = trimmed.match(/^([A-E])\)/i);
    if (letterMatch) {
      return letterMatch[1].toUpperCase();
    }
    
    // Caso 3: É apenas o texto da alternativa
    // Busca nos options qual contém esse texto
    for (const option of options) {
      const optionText = option.substring(option.indexOf(")") + 1).trim().toLowerCase();
      if (optionText === trimmed.toLowerCase()) {
        return option.charAt(0).toUpperCase();
      }
    }
    
    // Fallback: retorna a primeira letra se nada funcionar
    return trimmed.charAt(0).toUpperCase();
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    const optionLetter = option.charAt(0).toUpperCase();
    const normalizedCorrect = normalizeCorrectOption(
      questions[currentQuestion].correct_option,
      questions[currentQuestion].options
    );
    const correct = optionLetter === normalizedCorrect;
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
            const optionLetter = option.charAt(0).toUpperCase();
            const normalizedCorrect = normalizeCorrectOption(
              question.correct_option,
              question.options
            );
            const isCorrectOption = optionLetter === normalizedCorrect;
            
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
