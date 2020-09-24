import { Component, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  quizStatus = null;
  allQuestions: any[];
  totalAnswered = 0;
  rightAnswered = 0;
  wrongAnswered = 0;
  currentQuestion: any;
  currentIndex = 0;
  selectedAnswer = null;
  finalScore: number = 0;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("http://localhost:4000/api/questions")
      .subscribe((res: any) => {
        console.log("printed ... res", res);
        this.allQuestions = res.results;
        this.currentQuestion = this.allQuestions[this.currentIndex];
      });
  }

  startQuiz() {
    this.quizStatus = "INPROGRESS";
  }

  checkAnswer() {
    if (this.selectedAnswer) {
      if (this.currentQuestion.correct_answer === this.selectedAnswer) {
        this.rightAnswered++;
      } else {
        this.wrongAnswered++;
      }
      this.totalAnswered++;
    }
    this.selectedAnswer = null;
  }

  nextQuestion() {
    this.checkAnswer();
    if (this.allQuestions.length - 1 === this.currentIndex) {
      this.quizStatus = "COMPLETED";
      this.finalScore = Math.round(
        (this.rightAnswered * 100) / this.allQuestions.length
      );
      return;
    }
    this.currentIndex++;
    this.currentQuestion = this.allQuestions[this.currentIndex];
  }

  restartQuiz() {
    this.currentIndex = 0;
    this.currentQuestion = this.allQuestions[this.currentIndex];
    this.quizStatus = "INPROGRESS";
  }
}
