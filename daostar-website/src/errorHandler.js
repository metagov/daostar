export function setupErrorHandling() {
    window.onerror = function (message, source, lineno, colno, error) {
      // Handle the error, log it, or send it to a reporting service.
      console.error(message, source, lineno, colno, error);
      // Return false to prevent the default browser error handling.
      return false;
    };
  }
  