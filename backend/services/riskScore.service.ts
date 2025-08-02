// services/riskScore.service.ts

export interface RiskScoreInput {
  weather_severity: number; // 0–5
  traffic_level: number;    // 0–5
  crime_score: number;      // 0–5
  hail_sensitive: boolean;
  wind_sensitive: boolean;
}

export const calculateRiskScore = (input: RiskScoreInput): { score: number; level: string } => {
  const {
    weather_severity,
    traffic_level,
    crime_score,
    hail_sensitive,
    wind_sensitive
  } = input;

  // Base weighted score
  let score =
    weather_severity * 10 + // weight: 50%
    traffic_level * 4 +     // weight: 20%
    crime_score * 4;        // weight: 20%

  // Adjust for vehicle sensitivity (up to +10)
  if (hail_sensitive && weather_severity >= 3) score += 5;
  if (wind_sensitive && weather_severity >= 3) score += 5;

  // Clamp to 100 max
  score = Math.min(score, 100);

  // Classification
  let level = 'low';
  if (score >= 70) level = 'critical';
  else if (score >= 50) level = 'high';
  else if (score >= 30) level = 'moderate';

  return { score, level };
};
