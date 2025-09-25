// Utility functions for Time Off functionality

export const isTimeOffToday = () => {
  const savedTimeOffDays = localStorage.getItem('timeOffDays');
  if (!savedTimeOffDays) return false;
  
  const timeOffDays = JSON.parse(savedTimeOffDays);
  const today = new Date().toDateString();
  
  return timeOffDays.some(day => day.date === today);
};

export const canCheckInOut = () => {
  return !isTimeOffToday();
};

export const getTimeOffDays = () => {
  const savedTimeOffDays = localStorage.getItem('timeOffDays');
  return savedTimeOffDays ? JSON.parse(savedTimeOffDays) : [];
};

export const addTimeOffDay = (date = new Date()) => {
  const timeOffRecord = {
    date: date.toDateString(),
    timestamp: date.toISOString(),
    type: 'Time Off',
    status: 'Active'
  };

  const existingDays = getTimeOffDays();
  const todayString = date.toDateString();
  
  // Check if already exists
  const isAlreadyTimeOff = existingDays.some(day => day.date === todayString);
  if (isAlreadyTimeOff) {
    return { success: false, message: 'You have already marked today as Time Off!' };
  }

  const updatedDays = [...existingDays, timeOffRecord];
  localStorage.setItem('timeOffDays', JSON.stringify(updatedDays));
  
  return { success: true, message: 'Time Off marked for today! You cannot check in/out today.' };
};

export const removeTimeOffDay = (date = new Date()) => {
  const existingDays = getTimeOffDays();
  const todayString = date.toDateString();
  
  const updatedDays = existingDays.filter(day => day.date !== todayString);
  localStorage.setItem('timeOffDays', JSON.stringify(updatedDays));
  
  return { success: true, message: 'Time Off removed for today.' };
};
