// services/chat.ts
export interface ChatRequest {
    message: string;
    diagnosis?: string; // Optional, if you want to send predicted disease as context
}

export interface ChatResponse {
    reply: string;
}

/**
 * Sends a chat message to the backend and receives the response.
 * 
 * @param message - The user's input message or question.
 * @param diagnosis - (Optional) The predicted disease for context-based advice.
 * @returns The chatbot's reply.
 */
export const fetchChatResponse = async (
    message: string,
    diagnosis?: string
): Promise<string> => {
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY; // Use environment variable for API key

    if (!apiKey) {
        console.error('API key is missing. Please set REACT_APP_API_KEY in your environment.');
        return 'API key is not configured.';
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Flash-Version': '1.0', // Custom header for Google Gemini Flash
            },
            body: JSON.stringify({
                message,
                diagnosis, // include it only if available
            }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data: ChatResponse = await response.json();
        return data.reply;
    } catch (error) {
        console.error('Error in fetchChatResponse:', error);
        return 'Sorry, something went wrong while fetching the chat response.';
    }
};
