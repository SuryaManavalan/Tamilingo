import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function QuizPhase() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

  const lessonTitles: { [key: string]: string } = {
    1: 'Greetings Quiz',
    2: 'Numbers Quiz',
    3: 'Common Phrases Quiz',
  };

  const lessonQuestions: { [key: string]: Question[] } = {
    1: [
      { question: 'How do you say "Hello" in Tamil?', options: ['Vanakkam', 'Nandri', 'Aama'], answer: 'Vanakkam' },
      { question: 'How do you say "Good Morning" in Tamil?', options: ['Kaalai Vanakkam', 'Poi', 'Illai'], answer: 'Kaalai Vanakkam' },
      { question: 'How do you introduce yourself in Tamil?', options: ['En peyar [name]', 'Nandri', 'Aama'], answer: 'En peyar [name]' },
    ],
    2: [
      { question: 'What is the Tamil word for "One"?', options: ['Ondru', 'Irandu', 'Moondru'], answer: 'Ondru' },
      { question: 'How do you say "Two" in Tamil?', options: ['Irandu', 'Ondru', 'Naangu'], answer: 'Irandu' },
      { question: 'What is "Five" in Tamil?', options: ['Aindhu', 'Naangu', 'Moondru'], answer: 'Aindhu' },
    ],
    3: [
      { question: 'How do you say "How are you?" in Tamil?', options: ['Eppadi irukeenga?', 'Vanakkam', 'Nandri'], answer: 'Eppadi irukeenga?' },
      { question: 'What does "Nalla iruken" mean?', options: ['I am fine', 'Thank you', 'I am hungry'], answer: 'I am fine' },
      { question: 'How do you say "Where are you?" in Tamil?', options: ['Neenga enga irukeenga?', 'Poi', 'Aama'], answer: 'Neenga enga irukeenga?' },
    ],
  };

  const questions = lessonQuestions[lessonId] || [];
  const pageTitle = lessonTitles[lessonId] || 'Tamil Quiz';

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption: string) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      Alert.alert('Quiz Completed!', `Your score is ${score + 1}/${questions.length}`, [
        { text: 'OK', onPress: () => router.replace('/journey-map') },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pageTitle}</Text>
      {questions.length > 0 ? (
        <>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <Text style={styles.noQuestionsText}>No questions available for this lesson.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#ED6A5E' },
  question: { fontSize: 18, marginBottom: 20 },
  optionButton: {
    backgroundColor: '#FFAF87',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  optionText: { color: '#fff', fontSize: 16 },
  noQuestionsText: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 20 },
});
