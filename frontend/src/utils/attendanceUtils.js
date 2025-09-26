// Calculate total working days in current month (excluding weekends)
export const getTotalWorkingDaysInMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  // Get first and last day of current month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  let workingDays = 0;
  
  // Count working days (Monday to Friday)
  for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
    const currentDate = new Date(year, month, day);
    const dayOfWeek = currentDate.getDay();
    
    // Monday = 1, Tuesday = 2, ..., Friday = 5
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      workingDays++;
    }
  }
  
  return workingDays;
};

// Get current month name
export const getCurrentMonthName = () => {
  const now = new Date();
  return now.toLocaleString('default', { month: 'long' });
};

// Get current year
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

// Check if a date is a working day (Monday to Friday)
export const isWorkingDay = (date) => {
  const dayOfWeek = date.getDay();
  return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
};

// Get attendance data from localStorage
export const getAttendanceData = () => {
  const data = JSON.parse(localStorage.getItem('attendanceData') || '[]');
  
  // Ensure all records have sessions array
  data.forEach(record => {
    if (!record.sessions) {
      record.sessions = [];
    }
  });
  
  return data;
};

// Save attendance data to localStorage
export const saveAttendanceData = (data) => {
  localStorage.setItem('attendanceData', JSON.stringify(data));
};

// Record check-in for today (allows multiple sessions)
export const recordCheckIn = () => {
  const today = new Date().toDateString();
  const attendanceData = getAttendanceData();
  
  // Find today's record
  let todayRecord = attendanceData.find(record => record.date === today);
  
  if (!todayRecord) {
    // Create new record for today
    todayRecord = {
      date: today,
      sessions: [],
      status: 'present'
    };
    attendanceData.push(todayRecord);
  }
  
  // Ensure sessions array exists
  if (!todayRecord.sessions) {
    todayRecord.sessions = [];
  }
  
  // Add new check-in session
  const newSession = {
    checkIn: new Date().toISOString(),
    checkOut: null,
    sessionId: Date.now()
  };
  
  todayRecord.sessions.push(newSession);
  saveAttendanceData(attendanceData);
  return { success: true, sessionId: newSession.sessionId };
};

// Record check-out for today (for the latest session)
export const recordCheckOut = () => {
  const today = new Date().toDateString();
  const attendanceData = getAttendanceData();
  
  const todayRecord = attendanceData.find(record => record.date === today);
  
  if (todayRecord && todayRecord.sessions && todayRecord.sessions.length > 0) {
    // Find the latest session that hasn't been checked out
    const latestSession = todayRecord.sessions
      .filter(session => !session.checkOut)
      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))[0];
    
    if (latestSession) {
      latestSession.checkOut = new Date().toISOString();
      saveAttendanceData(attendanceData);
      return { success: true, sessionId: latestSession.sessionId };
    }
  }
  
  return { success: false, message: 'No active check-in session found' };
};

// Get current session status
export const getCurrentSessionStatus = () => {
  const today = new Date().toDateString();
  const attendanceData = getAttendanceData();
  const todayRecord = attendanceData.find(record => record.date === today);
  
  if (!todayRecord || !todayRecord.sessions || todayRecord.sessions.length === 0) {
    return { status: 'ready', canCheckIn: true, canCheckOut: false };
  }
  
  // Check if there's an active session (checked in but not checked out)
  const activeSession = todayRecord.sessions.find(session => !session.checkOut);
  
  if (activeSession) {
    return { status: 'checked-in', canCheckIn: false, canCheckOut: true };
  } else {
    return { status: 'ready', canCheckIn: true, canCheckOut: false };
  }
};

// Get attended days in current month
export const getAttendedDaysInCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const attendanceData = getAttendanceData();
  
  return attendanceData.filter(record => {
    const recordDate = new Date(record.date);
    return recordDate.getFullYear() === year && 
           recordDate.getMonth() === month && 
           record.status === 'present';
  }).length;
};

// Get leave days in current month
export const getLeaveDaysInCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
  
  return leaveRequests.filter(request => {
    const requestDate = new Date(request.date);
    return requestDate.getFullYear() === year && 
           requestDate.getMonth() === month && 
           request.status === 'Approved';
  }).length;
};

// Get unscheduled absence (working days - attended days - approved leaves)
export const getUnscheduledAbsence = () => {
  const totalWorkingDays = getTotalWorkingDaysInMonth();
  const attendedDays = getAttendedDaysInCurrentMonth();
  const leaveDays = getLeaveDaysInCurrentMonth();
  
  return Math.max(0, totalWorkingDays - attendedDays - leaveDays);
};

// Calculate total hours worked today
export const getTotalHoursWorkedToday = () => {
  const today = new Date().toDateString();
  const attendanceData = getAttendanceData();
  const todayRecord = attendanceData.find(record => record.date === today);
  
  if (!todayRecord || !todayRecord.sessions) {
    return 0;
  }
  
  let totalHours = 0;
  todayRecord.sessions.forEach(session => {
    if (session.checkIn && session.checkOut) {
      const checkIn = new Date(session.checkIn);
      const checkOut = new Date(session.checkOut);
      const diffMs = checkOut - checkIn;
      const diffHours = diffMs / (1000 * 60 * 60);
      totalHours += diffHours;
    }
  });
  
  return Math.round(totalHours * 100) / 100; // Round to 2 decimal places
};

// Get yesterday's attendance data
export const getYesterdayAttendance = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();
  
  const attendanceData = getAttendanceData();
  const yesterdayRecord = attendanceData.find(record => record.date === yesterdayString);
  
  if (!yesterdayRecord || !yesterdayRecord.sessions) {
    return null;
  }
  
  // Calculate total hours for yesterday
  let totalHours = 0;
  yesterdayRecord.sessions.forEach(session => {
    if (session.checkIn && session.checkOut) {
      const checkIn = new Date(session.checkIn);
      const checkOut = new Date(session.checkOut);
      const diffMs = checkOut - checkIn;
      const diffHours = diffMs / (1000 * 60 * 60);
      totalHours += diffHours;
    }
  });
  
  return {
    date: yesterdayRecord.date,
    sessions: yesterdayRecord.sessions,
    totalHours: Math.round(totalHours * 100) / 100,
    status: yesterdayRecord.status
  };
};

// Get today's sessions for display
export const getTodaySessions = () => {
  const today = new Date().toDateString();
  const attendanceData = getAttendanceData();
  const todayRecord = attendanceData.find(record => record.date === today);
  
  if (!todayRecord || !todayRecord.sessions) {
    return [];
  }
  
  return todayRecord.sessions.map(session => ({
    sessionId: session.sessionId,
    checkIn: session.checkIn ? new Date(session.checkIn).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) : null,
    checkOut: session.checkOut ? new Date(session.checkOut).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) : null,
    duration: session.checkIn && session.checkOut ? 
      Math.round(((new Date(session.checkOut) - new Date(session.checkIn)) / (1000 * 60 * 60)) * 100) / 100 : 0
  }));
};
