HTMLTypewriter
   A React component that types out HTML or plain text character-by-character with a typewriter effect, including an optional blinking cursor.
Installation
npm install html-typewriter

Usage
import React from 'react';
import HTMLTypewriter from 'html-typewriter';

function App() {
  return (
    <div>
      <HTMLTypewriter
        text="Hello, <strong>World!</strong>"
        speed={100}
        onComplete={() => console.log('Typing complete!')}
        showCursor={true}
        cursorChar="|"
        className="typewriter"
      />
    </div>
  );
}

export default App;

Props

text (string): The HTML or plain text to animate.
speed (number, optional): Delay in milliseconds between characters (default: 50).
onComplete (function, optional): Callback triggered after typing completes.
showCursor (boolean, optional): Whether to show a blinking cursor (default: true).
cursorChar (string, optional): Character used as the cursor (default: "|").
className (string, optional): Custom class for the wrapper div.

License
   MIT
