import React, { useState } from 'react';
import './App.css';

function HomeworkChecker({ onAddWrongQuestion }) {
  const [question, setQuestion] = useState('');
  const [correct, setCorrect] = useState('');
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [knowledge, setKnowledge] = useState('Math');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() === correct.trim()) {
      setResult('回答正确');
    } else {
      setResult('回答错误');
      onAddWrongQuestion({
        question,
        correctAnswer: correct,
        yourAnswer: answer,
        explanation,
        knowledge,
      });
    }
    setQuestion('');
    setCorrect('');
    setAnswer('');
    setExplanation('');
  };

  return (
    <div>
      <h2>作业检查</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>题目</label>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>正确答案</label>
          <input value={correct} onChange={(e) => setCorrect(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>我的答案</label>
          <input value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>知识点</label>
          <select value={knowledge} onChange={(e) => setKnowledge(e.target.value)}>
            <option value="Math">数学</option>
            <option value="Language">语文</option>
            <option value="Science">科学</option>
          </select>
        </div>
        <div className="form-group">
          <label>错题讲解</label>
          <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} required />
        </div>
        <button type="submit">提交</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

function WrongQuestionList({ wrongQuestions }) {
  if (wrongQuestions.length === 0) return <div><h2>错题集</h2><p>暂无错题</p></div>;
  return (
    <div>
      <h2>错题集</h2>
      <ul className="list">
        {wrongQuestions.map((q, idx) => (
          <li key={idx}>
            <strong>{q.question}</strong>
            <div>正确答案: {q.correctAnswer}</div>
            <div>我的答案: {q.yourAnswer}</div>
            <div>知识点: {q.knowledge}</div>
            <div>讲解: {q.explanation}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PracticeGenerator({ wrongQuestions }) {
  const [exercises, setExercises] = useState([]);

  const generate = () => {
    const grouped = wrongQuestions.reduce((acc, q) => {
      acc[q.knowledge] = acc[q.knowledge] || [];
      acc[q.knowledge].push(q);
      return acc;
    }, {});
    const list = Object.entries(grouped).map(([kp, qs]) => ({
      kp,
      questions: qs.map((q) => q.question),
    }));
    setExercises(list);
  };

  return (
    <div>
      <h2>每周练习题生成</h2>
      <button onClick={generate}>生成练习</button>
      {exercises.map((ex, idx) => (
        <div key={idx} className="list">
          <h3>知识点: {ex.kp}</h3>
          <ol>
            {ex.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const addWrongQuestion = (q) => {
    setWrongQuestions((prev) => [...prev, q]);
  };

  return (
    <main>
      <h1>小学错题收集</h1>
      <HomeworkChecker onAddWrongQuestion={addWrongQuestion} />
      <WrongQuestionList wrongQuestions={wrongQuestions} />
      <PracticeGenerator wrongQuestions={wrongQuestions} />
    </main>
  );
}

export default App;

