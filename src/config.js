const config = {
  defaultPageTitle: 'AI & IoT Insider Lab',
  yearMonthFormat: "YYYY-MM",
  dateFormat: "YYYY-MM-DD",
  dateFormatMMMDYYYY: "MMM D YYYY",
  dateTimeFormat: "YYYY-MM-DD HH:mm",
  timeFormat: "HH:mm",
  form: {
    fieldSize: "large",
    userPublicRoleId: 1
  },
  pagination: {
    pageSize: 15
  },
  charts: {
    bars: {
      defaultColor: '#55b4ff'
    }
  },
  followupRecordModifyDelay: 300,
  testimonialRecordModifyDelay: 300,
  nominationStatuses: {
    draft: { id: 'draft', name: 'Draft' },
    deleted: { id: 'deleted', name: 'Deleted' },
    new: { id: 'new', name: 'New' },
    open: { id: 'open', name: 'Open' },
    completed: { id: 'completed', name: 'Completed' },
    rejected: { id: 'rejected', name: 'Rejected' },
    on_hold: { id: 'on_hold', name: 'On hold' },
    closed: { id: 'closed', name: 'Closed' },
  },
  nominationActiveStatuses: ['new', 'open', 'on_hold'],
  nominationWorkflowSteps: {
    kickoff_call: { id: 'kickoff_call', name: 'Kickoff call' },
    nda: { id: 'nda', name: 'NDA' },
    tech_call: { id: 'tech_call', name: 'Tech call' },
    lab_agreement: { id: 'lab_agreement', name: 'Lab Agreement' },
    engagement: { id: 'engagement', name: 'Engagement' }
  }
};

export default config;
