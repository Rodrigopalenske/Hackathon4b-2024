'use client';
import { createGlobalStyle } from 'styled-components'

// Váriaveis que serão armazenadas globalmente
export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #fff;
    --padrao: #0B5ED7;
    --titulo: #363f5f;
    --texto: #363f5f;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.75%;
    }
  }

  body, input, textarea, button {
    font-family: Tahoma, Verdana, sans-serif;
    font-weight: 400;
  }

  h1{
    font-weight: 2em;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
