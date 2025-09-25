// Utility to read appraisal data from Insights page structure
// This keeps the Insights page unchanged while allowing Dashboard to read the same data

export const getInsightsAppraisalProgress = () => {
  // Since Insights page has hardcoded 71%, we return that same value
  // In a real application, this would read from the same data source
  // that the Insights page uses (API, database, etc.)
  return 71;
};

// This function would be used if the Insights page had dynamic data
// For now, it just returns the hardcoded value to match the Insights structure
export const syncWithInsightsData = () => {
  return getInsightsAppraisalProgress();
};
