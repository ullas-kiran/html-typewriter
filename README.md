# HTMLTypewriter ✍️

A lightweight React component that brings your text to life with a typewriter effect — typing out HTML or plain text character by character. Add a customizable blinking cursor for extra flair!

[![npm version](https://img.shields.io/npm/v/html-typewriter.svg)](https://www.npmjs.com/package/html-typewriter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue.svg)](https://www.typescriptlang.org/)

---

## ✨ Features

- 📝 **Type HTML or Plain Text** — Animate text including tags like `<strong>`, `<em>`, etc.
- ⏱ **Customizable Speed** — Control how fast each character appears.
- ✨ **Blinking Cursor** — Show an animated, customizable cursor (`|`, `_`, etc.).
- ⚙️ **TypeScript Support** — Full types included for seamless dev experience.
- ⚛️ **React 18 & 19 Compatible** — Works out of the box with modern React.
- 🎨 **Styling Flexibility** — Style easily with the `className` prop.

---

## 📦 Installation

```bash
npm install html-typewriter
```

---

## 🚀 Usage

```tsx
import HTMLTypewriter from 'html-typewriter';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to HTMLTypewriter</h1>
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
```

---

## 🎨 Styling Example

```css
/* App.css */
.typewriter {
  font-family: monospace;
  font-size: 18px;
  color: #333;
}
```

---

## 🧩 Props

| Prop         | Type         | Description                                   | Default     |
|--------------|--------------|-----------------------------------------------|-------------|
| `text`       | `string`     | HTML or plain text to animate                 | **required**|
| `speed`      | `number`     | Delay between characters (in ms)              | `50`        |
| `onComplete` | `() => void` | Callback fired after typing completes         | `undefined` |
| `showCursor` | `boolean`    | Whether to show the blinking cursor           | `true`      |
| `cursorChar` | `string`     | Character used as the cursor                  | `|`         |
| `className`  | `string`     | CSS class for the wrapper `<div>`            | `""`        |

---

## 🧪 Example with TypeScript

```tsx
import HTMLTypewriter from 'html-typewriter';

const App: React.FC = () => {
  return (
    <HTMLTypewriter
      text="Type <em>awesome</em> content!"
      speed={80}
      onComplete={() => console.log('Done!')}
      showCursor={true}
      cursorChar="_"
      className="typewriter"
    />
  );
};

export default App;
```



## 🤝 Contributing

We welcome contributions of all kinds!

1. **Fork the repo**: [html-typewriter on GitHub](https://github.com/ullas-kiran/html-typewriter)
2. **Create a feature branch**:
   ```bash
   git checkout -b my-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add my feature"
   ```
4. **Push to GitHub**:
   ```bash
   git push origin my-feature
   ```
5. **Open a Pull Request**

💬 Found a bug or have an idea? [Open an issue](https://github.com/ullas-kiran/html-typewriter/issues)!

---

## 📄 License

MIT License  
See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with ❤️ by [Ullas Kiran](https://github.com/ullas-kiran)  
Happy typing! 🎉
