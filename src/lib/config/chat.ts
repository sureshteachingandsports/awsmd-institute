export const chatConfig = {
  maxAttachmentSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  maxMessageLength: 1000,
  typingDelay: 1500,
  maxHistoryLength: 50,
};

export const defaultResponses = {
  greeting: "Hi! 👋 I'm your iTech Institute assistant. How can I help you today?",
  error: "I apologize, but I encountered an error. Please try again later.",
  fileTooBig: "The file you're trying to upload is too large. Maximum size is 5MB.",
  invalidFileType: "This file type is not supported. Please upload images or PDFs only.",
}; 