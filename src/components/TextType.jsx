import { useEffect, useRef, useState, useMemo, createElement } from "react";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const initialText = Array.isArray(text) ? (text[0] ?? "") : (text ?? "");
  const [displayedText, setDisplayedText] = useState(initialText);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const containerRef = useRef(null);

  // All animation state lives in a ref — mutations don't trigger re-renders
  const anim = useRef({ charIndex: initialText.length, textIndex: 0, isDeleting: false, displayed: initialText });

  // Latest props always accessible inside the stable timeout loop without re-running the effect
  const cfg = useRef({});
  cfg.current = { typingSpeed, deletingSpeed, pauseDuration, variableSpeed, loop, reverseMode, onSentenceComplete, initialDelay };

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const textArrayRef = useRef(textArray);
  useEffect(() => { textArrayRef.current = textArray; }, [textArray]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const state = anim.current;
    let timeout;

    const tick = () => {
      const { typingSpeed, deletingSpeed, pauseDuration, variableSpeed, loop, reverseMode, onSentenceComplete } = cfg.current;
      const texts = textArrayRef.current;
      const currentText = texts[state.textIndex] ?? "";
      const processed = reverseMode ? currentText.split("").reverse().join("") : currentText;

      if (state.isDeleting) {
        if (state.displayed === "") {
          if (state.textIndex === texts.length - 1 && !loop) return;
          onSentenceComplete?.(texts[state.textIndex], state.textIndex);
          state.isDeleting = false;
          state.textIndex = (state.textIndex + 1) % texts.length;
          state.charIndex = 0;
          timeout = setTimeout(tick, pauseDuration);
        } else {
          state.displayed = state.displayed.slice(0, -1);
          setDisplayedText(state.displayed);
          timeout = setTimeout(tick, deletingSpeed);
        }
      } else {
        if (state.charIndex < processed.length) {
          state.displayed += processed[state.charIndex];
          state.charIndex++;
          setDisplayedText(state.displayed);
          const speed = variableSpeed
            ? Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min
            : typingSpeed;
          timeout = setTimeout(tick, speed);
        } else if (texts.length > 1) {
          state.isDeleting = true;
          timeout = setTimeout(tick, pauseDuration);
        }
      }
    };

    timeout = setTimeout(tick, cfg.current.initialDelay);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  const a = anim.current;
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (a.charIndex < (textArray[a.textIndex]?.length ?? 0) || a.isDeleting);

  const currentColor = textColors.length > 0 ? textColors[a.textIndex % textColors.length] : undefined;

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span className="inline" style={currentColor ? { color: currentColor } : undefined}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
        style={{ animation: `blink ${cursorBlinkDuration * 2}s ease-in-out infinite alternate` }}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
