{/* Previous imports remain the same */}

const downloadQR = () => {
  if (!qrImage) return;
  
  const link = document.createElement('a');
  link.href = qrImage;
  link.download = `attendance-${studentInfo.studentId}-${Date.now()}.png`;
  // Use click() directly without DOM manipulation
  link.click();
};