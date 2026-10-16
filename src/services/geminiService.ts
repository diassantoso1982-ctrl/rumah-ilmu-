import { LearningMaterial, LKPD, GradeLevel } from '../types';
import { createInstantMaterial, createInstantLkpdFromMaterial } from './curriculumGenerator';

export async function generateMateriWithAi(
  topic: string,
  grade: number,
  subject: string
): Promise<LearningMaterial> {
  // Setup timeout controller for quick responsive fallback
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4500);

  try {
    const res = await fetch('/api/ai/generate-materi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, grade, subject }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.title && json.data.coreContent) {
        // Normalize with full required fields
        const partialData = json.data;
        const fallback = createInstantMaterial(topic, grade as GradeLevel, subject);
        return {
          ...fallback,
          ...partialData,
          id: partialData.id || `mat-ai-${Date.now()}`,
          subjectId: partialData.subjectId || fallback.subjectId,
          grade: partialData.grade || grade,
          coreContent: partialData.coreContent || fallback.coreContent,
          practiceQuestions: partialData.practiceQuestions || fallback.practiceQuestions,
          parentGuide: partialData.parentGuide || fallback.parentGuide
        };
      }
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.info('Quick responsive curriculum generation activated:', error);
  }

  // Instant curriculum generation guarantee
  return createInstantMaterial(topic, grade as GradeLevel, subject);
}

export async function generateLkpdWithAi(
  topic: string,
  grade: number,
  subject: string,
  learningGoal?: string
): Promise<LKPD> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch('/api/ai/generate-lkpd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, grade, subject, learningGoal }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.title) {
        const dummyMat = createInstantMaterial(topic, grade as GradeLevel, subject);
        const fallbackLkpd = createInstantLkpdFromMaterial(dummyMat);
        return {
          ...fallbackLkpd,
          ...json.data,
          id: json.data.id || `lkpd-${Date.now()}`
        };
      }
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.info('Instant LKPD fallback used:', error);
  }

  const dummyMat = createInstantMaterial(topic, grade as GradeLevel, subject);
  return createInstantLkpdFromMaterial(dummyMat);
}

export async function chatWithSahabatIlmu(
  message: string,
  role: string,
  grade: number,
  topic?: string,
  history?: { role: string; content: string }[]
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch('/api/ai/chat-sahabat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, role, grade, topic, history }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.reply) {
        return json.reply;
      }
    }
  } catch (error) {
    clearTimeout(timeoutId);
    console.info('Sahabat chat responsive fallback used');
  }

  return 'Halo Sahabat Hebat! Teruslah bersemangat belajar dan jangan pernah takut bertanya. Kamu anak hebat dan cerdas!';
}
