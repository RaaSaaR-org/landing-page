/**
 * Structure of the knowledge area (/knowledge).
 *
 * Copy lives in the `knowledge` i18n namespace; this file only holds the
 * locale-independent wiring: chapter order, which glossary terms each chapter
 * introduces, and where its "read more" links point. Glossary term ids are the
 * keys of `knowledge.glossary.terms` and double as anchor ids on the glossary
 * page, so chapters can deep-link to `/knowledge/glossary#<id>`.
 */

export const relatedLinks = {
  robots: '/knowledge/robots',
  glossary: '/knowledge/glossary',
  sovereignty: '/#sovereignty',
  testing: '/services/testing',
  consulting: '/services/consulting',
  data: '/services/data',
  workshops: '/services/workshops',
  worldModel: '/projects#world-model',
} as const;

export type RelatedLink = keyof typeof relatedLinks;

export interface Chapter {
  key: string;
  /** Glossary term ids introduced in this chapter. */
  terms: readonly string[];
  related: readonly RelatedLink[];
}

export const chapters: readonly Chapter[] = [
  { key: 'physical-ai', terms: ['physical-ai', 'embodied-ai', 'cognitive-robot', 'actuator'], related: ['robots'] },
  { key: 'classic-vs-cognitive', terms: ['cobot', 'policy', 'cycle-time'], related: ['consulting'] },
  { key: 'learning', terms: ['imitation-learning', 'teleoperation', 'demonstration', 'reinforcement-learning', 'sim-to-real', 'fine-tuning'], related: ['workshops'] },
  { key: 'foundation-models', terms: ['foundation-model', 'vla', 'open-weight', 'world-model', 'inference'], related: ['worldModel', 'sovereignty'] },
  { key: 'data', terms: ['digital-twin', 'data-sovereignty', 'edge-computing'], related: ['data', 'sovereignty'] },
  { key: 'hardware', terms: ['dof', 'end-effector', 'mobile-manipulator', 'lidar', 'depth-camera', 'tactile-sensing', 'force-torque', 'slam', 'ros2'], related: ['robots', 'testing'] },
  { key: 'safety-security', terms: ['risk-assessment', 'functional-safety', 'ot-security', 'vendor-lock-in', 'human-in-the-loop'], related: ['sovereignty', 'consulting'] },
  { key: 'evaluation', terms: ['success-rate', 'intervention', 'tco'], related: ['testing', 'consulting'] },
];

/** Questions on the hub page, each answered by the chapter it is keyed by. */
export const startQuestions = ['classic-vs-cognitive', 'learning', 'data', 'safety-security', 'evaluation'] as const;

/** The chapter that introduces a glossary term, if any. */
export function chapterForTerm(termId: string) {
  return chapters.find((chapter) => chapter.terms.includes(termId));
}

/** Rough reading time for a body of text at ~200 words per minute. */
export function readingMinutes(texts: string[]) {
  const words = texts.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
