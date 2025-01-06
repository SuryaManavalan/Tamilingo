import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function JourneyMap() {
  const router = useRouter();
  const lessons: string[] = ['Lesson 1: Greetings', 'Lesson 2: Numbers', 'Lesson 3: Common Phrases'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tamil Journey Map</Text>
      {lessons.map((lesson, index) => (
        <TouchableOpacity
          key={index}
          style={styles.lessonButton}
          onPress={() => router.push(`/lesson-state?lessonId=${index + 1}`)}
        >
          <Text style={styles.lessonText}>{lesson}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#377771' },
  lessonButton: {
    backgroundColor: '#ED6A5E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  lessonText: { color: '#fff', fontSize: 18 },
});
