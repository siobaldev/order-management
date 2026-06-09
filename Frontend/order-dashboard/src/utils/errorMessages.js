export function errorMessages(err) {
  const message = err.message || "";
  // Backend unreachable
  if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
    return "Cannot reach the server. Make sure the backend is running.";
  }

  // Resource not found
  if (message.includes("404")) {
    return "Sorry, the requested data could not be found.";
  }

  // Internal server issue
  if (message.includes("500")) {
    return "Something went wrong on the server. Try again later.";
  }

  // Bad user input
  if (message.includes("400")) {
    return "Invalid input. Please check your entries.";
  }

  // fallback
  return "Something went wrong. Please try again.";
}
