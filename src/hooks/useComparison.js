import { useCallback, useEffect, useState } from "react";
import comparisonService from "@/services/api/comparisonService";

export const useComparison = () => {
  const [priorities, setPriorities] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [comparisons, setComparisons] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial priorities
  useEffect(() => {
    const loadPriorities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await comparisonService.getAllPriorities();
        setPriorities(data);
      } catch (err) {
        setError('Failed to load priorities. Please try again.');
        console.error('Error loading priorities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPriorities();
  }, []);

  // Toggle priority selection
  const togglePriority = useCallback((priorityKey) => {
    setSelectedPriorities(prev => {
      if (prev.includes(priorityKey)) {
        return prev.filter(key => key !== priorityKey);
      } else {
        return [...prev, priorityKey];
      }
    });
  }, []);

  // Load comparisons when step advances
  const loadComparisons = useCallback(async () => {
    if (selectedPriorities.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const data = await comparisonService.getComparisonsByPriorities(selectedPriorities);
      setComparisons(data);
    } catch (err) {
      setError('Failed to load comparisons. Please try again.');
      console.error('Error loading comparisons:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedPriorities]);

  // Generate recommendation
  const generateRecommendation = useCallback(async () => {
    if (selectedPriorities.length === 0) return;

    try {
      setLoading(true);
      setError(null);
      const data = await comparisonService.generateRecommendation(selectedPriorities);
      setRecommendation(data);
    } catch (err) {
      setError('Failed to generate recommendation. Please try again.');
      console.error('Error generating recommendation:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedPriorities]);

  // Continue to next step
  const continueToStep = useCallback(async (step) => {
    setCurrentStep(step);
    
    if (step === 2) {
      await loadComparisons();
    } else if (step === 3) {
      await generateRecommendation();
    }
  }, [loadComparisons, generateRecommendation]);

  // Reset the comparison
  const resetComparison = useCallback(() => {
    setSelectedPriorities([]);
    setComparisons([]);
    setRecommendation(null);
    setCurrentStep(1);
    setError(null);
  }, []);

// Retry on error
  const retry = useCallback(async () => {
    setError(null);
    
    if (currentStep === 1) {
      const data = await comparisonService.getAllPriorities();
      setPriorities(data);
    } else if (currentStep === 2) {
      await loadComparisons();
    } else if (currentStep === 3) {
      await generateRecommendation();
    }
  }, [currentStep, loadComparisons, generateRecommendation]);

  // Progress tracking utilities
  const getStepInfo = useCallback(() => {
    const stepLabels = ['Priorities', 'Assessment', 'Comparison', 'Recommendation'];
    const totalSteps = 4;
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    
    return {
      currentStep,
      totalSteps,
      stepLabels,
      progressPercentage,
      currentStepLabel: stepLabels[currentStep - 1]
    };
  }, [currentStep]);

  const getProgressPercentage = useCallback(() => {
    return ((currentStep - 1) / 3) * 100;
  }, [currentStep]);

  const getStepLabel = useCallback((step = currentStep) => {
    const labels = ['Priorities', 'Assessment', 'Comparison', 'Recommendation'];
    return labels[step - 1] || 'Unknown';
  }, [currentStep]);

  return {
    priorities,
    selectedPriorities,
    comparisons,
    recommendation,
    currentStep,
    loading,
    error,
    togglePriority,
    continueToStep,
    resetComparison,
    retry,
    canContinue: selectedPriorities.length > 0,
    // Progress tracking
    getStepInfo,
    getProgressPercentage,
    getStepLabel
  };
};