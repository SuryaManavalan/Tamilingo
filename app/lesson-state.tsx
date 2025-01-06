import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LessonState() {
  const router = useRouter();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();

  const lessonTitles: { [key: string]: string } = {
    1: 'Greetings in Tamil',
    2: 'Numbers in Tamil',
    3: 'Common Phrases in Tamil',
  };

  const lessonModules = {
    1: [
      {
        title: 'Module 1: Basic Greetings',
        content: 'In Tamil, greetings are essential. The most common greeting is "Vanakkam" (வணக்கம்), used any time of the day. To greet someone in the morning, you can say "Kaalai Vanakkam" (காலை வணக்கம்), which means "Good Morning".',
      },
      {
        title: 'Module 2: Formal and Informal Greetings',
        content: 'Tamil distinguishes between formal and informal speech. For formal greetings, use "Vanakkam" (வணக்கம்) with elders or strangers. Informally, with friends, you can say "Hi" or "Hello" as "Hai" (ஹாய்) or "Halo" (ஹலோ).',
      },
      {
        title: 'Module 3: Introducing Yourself',
        content: 'To introduce yourself in Tamil, say "En peyar [your name]" (என் பெயர் [உங்கள் பெயர்]). For example, "En peyar Ravi" (என் பெயர் ரவி) means "My name is Ravi".',
      },
    ],
    2: [
      {
        title: 'Module 1: Counting',
        content: 'Numbers in Tamil: 1 - Ondru (ஒன்று), 2 - Irandu (இரண்டு), 3 - Moondru (மூன்று), 4 - Naangu (நான்கு), 5 - Aindhu (ஐந்து). Continue practicing up to 10.',
      },
      {
        title: 'Module 2: Ordinal Numbers',
        content: 'Ordinal numbers in Tamil are: 1st - Mudhal (முதல்), 2nd - Irandaam (இரண்டாம்), 3rd - Moondram (மூன்றாம்). These are used to indicate order.',
      },
      {
        title: 'Module 3: Common Uses',
        content: 'Common uses of numbers: "Naan rendu apple vanginen" (நான் இரண்டு ஆப்பிள் வாங்கினேன்) means "I bought two apples". Practice using numbers in sentences.',
      },
    ],
    3: [
      {
        title: 'Module 1: Everyday Phrases',
        content: 'Common phrases: "Eppadi irukeenga?" (எப்படி இருக்கீங்க?) means "How are you?". Reply with "Nalla iruken" (நல்ல இருக்கேன்) meaning "I am fine".',
      },
      {
        title: 'Module 2: Asking Questions',
        content: 'Basic questions in Tamil: "Unga peyar enna?" (உங்கள் பெயர் என்ன?) means "What is your name?". You can answer with "En peyar [name]" (என் பெயர் [name]).',
      },
      {
        title: 'Module 3: Responses',
        content: 'Responses to questions: "Neenga enga irukeenga?" (நீங்கள் எங்கு இருக்கீங்கள்?) means "Where are you?". Reply with "Naan veettil iruken" (நான் வீட்டில் இருக்கேன்) meaning "I am at home".',
      },
    ],
  } as Record<string, { title: string; content: string }[]>;

  const modules = lessonModules[lessonId] || [];
  const pageTitle = lessonTitles[lessonId] || 'Tamil Lesson';

  const [expandedModuleIndex, setExpandedModuleIndex] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setExpandedModuleIndex(expandedModuleIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pageTitle}</Text>
      {modules.map((module, index) => {
        const isExpanded = expandedModuleIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={styles.moduleContainer}
            onPress={() => toggleModule(index)}
          >
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleText}>{module.title}</Text>
              <Icon
                name="keyboard-arrow-down"
                size={24}
                style={{
                  transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                  color: '#FFF',
                }}
              />
            </View>
            {isExpanded && (
              <Text style={styles.moduleContent}>{module.content}</Text>
            )}
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push(`/quiz-phase?lessonId=${lessonId}`)}
      >
        <Text style={styles.quizText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#377771' },
  moduleContainer: {
    backgroundColor: '#377771',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '90%',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  moduleContent: { marginTop: 10, fontSize: 16, color: '#FFF' },
  quizButton: {
    backgroundColor: '#4CE0B3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  quizText: { color: '#fff', fontSize: 18 },
});
