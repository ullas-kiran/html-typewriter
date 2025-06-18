import  { useState, useEffect, useRef } from "react";

/**
 * Props for the HTMLTypewriter component.
 */
export interface HTMLTypewriterProps {
  /** The text (plain or HTML) to animate. */
  text: string;

  /** Typing speed in milliseconds (default: 50ms). */
  speed?: number;

  /** Optional callback function triggered after typing completes. */
  onComplete?: () => void;

  /** Whether to show the blinking cursor (default: true). */
  showCursor?: boolean;

  /** Character used as the cursor (default: "|"). */
  cursorChar?: string;

  /** Optional custom className for styling the wrapper. */
  className?: string;
}

/**
 * A React component that types out HTML or plain text character-by-character
 * with optional blinking cursor, similar to a typewriter effect.
 *
 * @param text The HTML or plain text string to animate.
 * @param speed Delay in milliseconds between each character.
 * @param onComplete Callback after typing is complete.
 * @param showCursor Whether to show a blinking cursor.
 * @param cursorChar The character to display as the cursor.
 * @param className Additional class name for the wrapper div.
 */
const HTMLTypewriter: React.FC<HTMLTypewriterProps> = ({
  text,
  speed = 50,
  onComplete,
  showCursor = true,
  cursorChar = "|",
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  /**
   * Checks if the string contains HTML tags.
   * @param str The input string.
   * @returns True if HTML is detected, otherwise false.
   */
  const containsHTML = (str: string): boolean => {
    return /<[a-z][\s\S]*>/i.test(str);
  };

  /**
   * Parses HTML content and extracts text content along with structure info.
   * @param htmlString The HTML string to parse.
   * @returns An array of text parts with tag details.
   */
  const parseHTML = (htmlString: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;

    const parts: {
      type: "text";
      content: string;
      tagName?: string;
      className?: string;
      style?: string;
    }[] = [];

    const walker = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_ALL,
      null
    );

    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent?.trim()
      ) {
        const parent = node.parentElement;
        parts.push({
          type: "text",
          content: node.textContent,
          tagName: parent?.tagName.toLowerCase(),
          className: parent?.className || "",
          style: parent?.getAttribute("style") || "",
        });
      }
    }

    return parts;
  };

  /**
   * Generates a typing sequence from structured HTML.
   * @param htmlString The HTML string to animate.
   * @returns An array of partially built HTML strings per character.
   */
  const createHTMLSequence = (htmlString: string): string[] => {
    const parts = parseHTML(htmlString);
    const sequence: string[] = [];
    let builtHTML = "";

    for (const part of parts) {
      const { content, tagName, className, style } = part;

      if (tagName && tagName !== "div") {
        let openTag = `<${tagName}`;
        if (className) openTag += ` class="${className}"`;
        if (style) openTag += ` style="${style}"`;
        openTag += ">";
        const closeTag = `</${tagName}>`;

        for (let i = 1; i <= content.length; i++) {
          const current = content.slice(0, i);
          const fullHTML = builtHTML + openTag + current + closeTag;
          sequence.push(fullHTML);
        }

        builtHTML += openTag + content + closeTag;
      } else {
        for (let i = 1; i <= content.length; i++) {
          const current = content.slice(0, i);
          const fullHTML = builtHTML + current;
          sequence.push(fullHTML);
        }
        builtHTML += content;
      }
    }

    return sequence;
  };

  /**
   * Generates a typing sequence from plain text.
   * @param plainText The plain string to animate.
   * @returns An array of text strings, one per character.
   */
  const createTextSequence = (plainText: string): string[] => {
    const sequence: string[] = [];
    for (let i = 1; i <= plainText.length; i++) {
      sequence.push(plainText.slice(0, i));
    }
    return sequence;
  };

  useEffect(() => {
    if (!text) return;

    setDisplayText("");
    setIsComplete(false);
    indexRef.current = 0;

    const sequence = containsHTML(text)
      ? createHTMLSequence(text)
      : createTextSequence(text);

    const typeNext = () => {
      if (indexRef.current < sequence.length) {
        setDisplayText(sequence[indexRef.current]);
        indexRef.current++;

        const randomDelay =
          speed + (Math.random() - 0.5) * (speed * 0.3);
        timeoutRef.current = setTimeout(typeNext, randomDelay);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    typeNext();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, onComplete]);

  const cursorStyle: React.CSSProperties = {
    opacity: !showCursor || isComplete ? 0 : 1,
    animation: !showCursor || isComplete ? "none" : "blink 1s infinite",
    marginLeft: "2px",
  };

  return (
    <div className={className}>
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
      <span
        className="text-2xl"
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: displayText }}
      />
      <span className="text-2xl" style={cursorStyle}>
        {cursorChar}
      </span>
    </div>
  );
};

export default HTMLTypewriter;
