export const validateCompanyName = (name: string): string | undefined => {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Company name is required';
  }
  if (!/^[a-zA-Z]/.test(trimmed)) {
    return 'Company name must start with a letter';
  }
  if (trimmed.length < 2) {
    return 'Company name must be at least 2 characters';
  }
  return undefined;
};

export const validateJobTitle = (title: string): string | undefined => {
  const trimmed = title.trim();
  if (!trimmed) {
    return 'Job title is required';
  }
  if (!/^[a-zA-Z]/.test(trimmed)) {
    return 'Job title must start with a letter';
  }
  return undefined;
};

export const validateJobType = (type: string): string | undefined => {
  const validJobTypes = ['Internship', 'Full-time', 'Part-time'];
  if (!type || !validJobTypes.includes(type)) {
    return 'Job type must be Internship, Full-time, or Part-time';
  }
  return undefined;
};

export const validateStatus = (status: string): string | undefined => {
  const validStatuses = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
  if (!status || !validStatuses.includes(status)) {
    return 'Status must be Applied, Interviewing, Offer, or Rejected';
  }
  return undefined;
};

export const validateAppliedDate = (dateStr: string): string | undefined => {
  if (!dateStr) {
    return 'Applied date is required';
  }
  const selectedDate = new Date(dateStr);
  if (isNaN(selectedDate.getTime())) {
    return 'Invalid date format';
  }
  
  // Create a date object for the end of the current day to allow applying today
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  if (selectedDate > endOfToday) {
    return 'Applied date cannot be in the future';
  }
  return undefined;
};
