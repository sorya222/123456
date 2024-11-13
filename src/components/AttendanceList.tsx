{/* Previous imports remain the same */}

const downloadCSV = () => {
  const headers = ['Name', 'Student ID', 'Class', 'Specialization', 'Generated At', 'Scanned At'];
  const csvContent = [
    headers.join(','),
    ...records.map(record => [
      record.name,
      record.studentId,
      record.class,
      record.specialization,
      format(record.timestamp, 'yyyy-MM-dd HH:mm:ss'),
      format(record.scannedAt, 'yyyy-MM-dd HH:mm:ss')
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `attendance_${format(new Date(), 'yyyy-MM-dd')}.csv`;
  // Use click() directly without DOM manipulation
  link.click();
  // Clean up the URL object
  URL.revokeObjectURL(url);
};