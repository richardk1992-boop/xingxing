export interface Metric {
  label: string;
  value: number;
  max: number;
  trend: number; // percentage
  trendDirection: 'up' | 'down' | 'flat';
  status: string;
  history: number[];
}

export interface EmotionData {
  name: string;
  value: number;
  color: string;
  keywords: string[];
}

export interface CognitiveData {
  week: string;
  vocabulary: number;
  logic: number;
}

export interface BehavioralInsight {
  title: string;
  dialogue: string;
  analysis: string;
  tags: string[];
}

export interface TheoryItem {
  point: string;
  theory: string;
  interpretation: string;
}

export interface ReportData {
  id: string;
  dateRange: string;
  childName: string;
  age: string;
  aiMessage: string;
  metrics: Metric[];
  emotions: EmotionData[];
  cognitiveHistory: CognitiveData[];
  insights: BehavioralInsight[];
  theories: TheoryItem[];
  tips: string[];
  nextWeekFocus: string[];
}