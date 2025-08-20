# Lyrena AI

Lyrena AI is a powerful conversational AI assistant powered by OpenRouter, providing access to multiple state-of-the-art language models through a beautiful React interface.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Core Features](#core-features)
  - [Additional Features](#additional-features)
  - [Potential Enhancements](#potential-enhancements)

## Introduction

This project introduces a React-based web application that functions as a sophisticated AI chatbot interface. Lyrena AI provides a user-friendly interface for interacting with powerful language models through OpenRouter, allowing you to ask questions and receive informative responses in a conversational manner.

## Features

### Core Features

- **Chat Interface:** Provides a dedicated interface for interacting with AI models in a conversational style.
- **Simulated Typing Effect:** Enhances the user experience by mimicking a natural typing effect during responses.
- **OpenRouter Integration:** Utilizes OpenRouter to access multiple state-of-the-art language models for generating informative responses.
- **Model Selection:** Choose from various available models through OpenRouter's extensive catalog.

### Additional Features

- **React-based Development:** Leverages React's efficient component-based approach for building the application.
- **Modern CSS Styling:** Employs modern CSS to style the user interface for visual appeal and usability.
- **Responsive Design:** Works seamlessly across different device sizes and screen resolutions.

### Potential Enhancements

- **Conversation History:** Keeps a record of past interactions for reference.
- **Advanced UI Elements:** Introduces additional features like emojis, formatting options, or user avatars.
- **Enhanced Functionality:** Explores integrating functionalities like image processing or document analysis.

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd lyrena-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your OpenRouter API key:
   - Sign up for an account at [OpenRouter.ai](https://openrouter.ai/)
   - Get your API key from [OpenRouter Keys](https://openrouter.ai/keys)
   - Copy `.env.example` to `.env`: `cp .env.example .env`
   - Edit `.env` and replace `your_openrouter_api_key_here` with your actual API key

4. Start the development server:

   ```bash
   npm run dev
   ```

## Configuration

The application uses OpenRouter to access various language models. You can configure the model and parameters in the `src/config/OpenRouter.js` file.

## License

This project is open source and available under the [MIT License](LICENSE).