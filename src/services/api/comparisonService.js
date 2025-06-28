import prioritiesData from '@/services/mockData/priorities.json';
import comparisonsData from '@/services/mockData/comparisons.json';

class ComparisonService {
  async getAllPriorities() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...prioritiesData]);
      }, 200);
    });
  }

  async getComparisonsByPriorities(priorityKeys) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredComparisons = comparisonsData.filter(comparison => 
          priorityKeys.includes(comparison.priorityKey)
        );
        resolve([...filteredComparisons]);
      }, 300);
    });
  }

  async generateRecommendation(selectedPriorities) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get comparisons for selected priorities
        const relevantComparisons = comparisonsData.filter(comparison => 
          selectedPriorities.includes(comparison.priorityKey)
        );

        // Count wins for each tool
        const apperWins = relevantComparisons.filter(comp => comp.winner === 'apper').length;
        const lovableWins = relevantComparisons.filter(comp => comp.winner === 'lovable').length;
        const ties = relevantComparisons.filter(comp => comp.winner === 'tie').length;

        let recommendation = {
          winner: 'apper',
          confidence: 'high',
          reasoning: [],
          apperWins,
          lovableWins,
          ties,
          totalComparisons: relevantComparisons.length
        };

        // Determine winner and reasoning
        if (apperWins > lovableWins) {
          recommendation.winner = 'apper';
          recommendation.reasoning = [
            'You want ease of use',
            'You need speed to launch',
            'You prefer built-in tools over code'
          ];
        } else if (lovableWins > apperWins) {
          recommendation.winner = 'lovable';
          recommendation.reasoning = [
            'You prefer custom development',
            'You want maximum flexibility',
            'You enjoy hands-on coding'
          ];
        } else {
          recommendation.winner = 'tie';
          recommendation.reasoning = [
            'Both tools match your needs equally',
            'Consider your development experience',
            'Think about long-term maintenance preferences'
          ];
        }

        // Set confidence level
        const winDifference = Math.abs(apperWins - lovableWins);
        if (winDifference >= 3) {
          recommendation.confidence = 'high';
        } else if (winDifference >= 2) {
          recommendation.confidence = 'medium';
        } else {
          recommendation.confidence = 'low';
        }

        resolve(recommendation);
      }, 400);
    });
  }
}

export default new ComparisonService();