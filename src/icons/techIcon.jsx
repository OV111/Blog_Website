export function JavaScriptIcon(className) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#F7DF1E" />
      <path
        d="M12.5 38L15.7 35.9C16.4 37.1 17 38 18.5 38C19.9 38 20.8 37.4 20.8 35.2V22H24.8V35.3C24.8 39.6 22.3 41.3 18.7 41.3C15.5 41.3 13.6 39.6 12.5 38Z"
        fill="#323330"
      />
      <path
        d="M27 37.5L30.2 35.5C31.2 37.1 32.5 38.2 34.5 38.2C36.2 38.2 37.3 37.3 37.3 36.1C37.3 34.7 36.2 34.2 34.3 33.3L33.3 32.9C30.2 31.6 28.2 30 28.2 26.5C28.2 23.3 30.6 20.9 34.4 20.9C37.1 20.9 39 21.8 40.4 24.3L37.3 26.5C36.6 25.2 35.8 24.7 34.4 24.7C33 24.7 32.1 25.6 32.1 26.5C32.1 27.6 33 28.1 34.8 29L35.8 29.4C39.4 31 41.4 32.5 41.4 36.1C41.4 40 38.4 42 34.6 42C30.9 42 28.4 40.1 27 37.5Z"
        fill="#323330"
      />
    </svg>
  );
}

export function RedisIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#E5E7EB" />

      <g transform="translate(10, 11)">
        <path d="M14 0L2 5L14 10L26 5L14 0Z" fill="#D82C20" />
        <path d="M2 9L0 10V14L14 20L28 14V10L26 9L14 14L2 9Z" fill="#A41E16" />
        <path
          d="M2 17L0 18V22L14 28L28 22V18L26 17L14 22L2 17Z"
          fill="#A41E16"
        />
      </g>
    </svg>
  );
}

export function AWSIcon({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="42" rx="8" fill="#232F3E" />

      <path
        d="M14 28C14 28 17 31 24 31C31 31 34 26 33 29"
        stroke="#FF9900"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M34 28L31 26M34 28L32 31.5"
        stroke="#FF9900"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="24"
        y="22"
        fontSize="14"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        AWS
      </text>
    </svg>
  );
}
export function CSharpIcon({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#68217A" />
      <path
        d="M24 8C15.2 8 8 15.2 8 24C8 32.8 15.2 40 24 40C29.3 40 34 37.5 36.9 33.6L31.5 30.5C29.7 32.7 27 34 24 34C18.5 34 14 29.5 14 24C14 18.5 18.5 14 24 14C27 14 29.7 15.3 31.5 17.5L36.9 14.4C34 10.5 29.3 8 24 8Z"
        fill="white"
      />
      <path
        d="M35 20H33V18H31V20H29V22H31V24H29V26H31V28H33V26H35V28H37V26H39V24H37V22H39V20H37V18H35V20ZM35 24H33V22H35V24Z"
        fill="white"
      />
    </svg>
  );
}

export function DatabaseIcon(className) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#336791" />
      <ellipse cx="24" cy="14" rx="12" ry="4" fill="white" fillOpacity="0.9" />
      <path
        d="M12 14V34C12 36.2 17.4 38 24 38C30.6 38 36 36.2 36 34V14"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 22C12 24.2 17.4 26 24 26C30.6 26 36 24.2 36 22"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M12 28C12 30.2 17.4 32 24 32C30.6 32 36 30.2 36 28"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

// export function ApiIcon(className) {
//   return (
//     <svg className={className} viewBox="0 0 48 48" fill="none">
//       <rect width="48" height="48" rx="8" fill="#10B981" />
//       <path
//         d="M14 18L24 12L34 18V30L24 36L14 30V18Z"
//         stroke="white"
//         strokeWidth="2"
//         fill="none"
//       />
//       <path d="M24 12V24" stroke="white" strokeWidth="2" />
//       <path d="M24 24L34 18" stroke="white" strokeWidth="2" />
//       <path d="M24 24L14 18" stroke="white" strokeWidth="2" />
//       <circle cx="24" cy="24" r="3" fill="white" />
//     </svg>
//   );
// }

export function DockerIcon(className) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#2496ED" />
      <path
        d="M42 22C41.5 21.5 40 21 38 21C37.5 19 36 17.5 34 17L33 18C35 18.5 36 20 36.5 21H10C9.5 21 9 21.5 9 22V28C9 32 12 35 16 35H32C36 35 40 32 42 28C43 26 43 23 42 22Z"
        fill="white"
      />
      <rect x="12" y="23" width="4" height="4" rx="0.5" fill="#2496ED" />
      <rect x="18" y="23" width="4" height="4" rx="0.5" fill="#2496ED" />
      <rect x="24" y="23" width="4" height="4" rx="0.5" fill="#2496ED" />
      <rect x="30" y="23" width="4" height="4" rx="0.5" fill="#2496ED" />
      <rect x="18" y="17" width="4" height="4" rx="0.5" fill="white" />
      <rect x="24" y="17" width="4" height="4" rx="0.5" fill="white" />
      <rect x="24" y="11" width="4" height="4" rx="0.5" fill="white" />
    </svg>
  );
}

export function ReactIcon(className) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#20232A" />
      <circle cx="24" cy="24" r="4" fill="#61DAFB" />
      <ellipse
        cx="24"
        cy="24"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 24 24)"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="14"
        ry="5.5"
        stroke="#61DAFB"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(120 24 24)"
      />
    </svg>
  );
}

export function NodeJSIcon({ className = "w-12 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#68A063" />

      {/* Node.js hexagon with JS text inside */}
      <g transform="translate(24, 24)">
        {/* Hexagon outline */}
        <path
          d="M0 -12L10.4 -6L10.4 6L0 12L-10.4 6L-10.4 -6Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
        />

        {/* JS Text */}
        <text
          x="0"
          y="2"
          fontSize="12"
          fontWeight="700"
          fontFamily="Arial, sans-serif"
          fill="#FFFFFF"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          JS
        </text>
      </g>
    </svg>
  );
}
export function GitIcon(className) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="#F05032" />
      <path
        d="M41.2 22.2L25.8 6.8C25 6 23.5 6 22.7 6.8L19.3 10.2L23.6 14.5C24.5 14.2 25.5 14.3 26.3 14.9C27.1 15.5 27.5 16.4 27.5 17.4C27.5 17.9 27.4 18.3 27.2 18.7L31.3 22.8C32.2 22.4 33.4 22.5 34.2 23.3C35.2 24.3 35.2 25.9 34.2 26.9C33.2 27.9 31.6 27.9 30.6 26.9C29.8 26.1 29.6 24.9 30.1 23.9L26.2 20V30.5C26.5 30.7 26.8 30.9 27 31.2C28 32.2 28 33.8 27 34.8C26 35.8 24.4 35.8 23.4 34.8C22.4 33.8 22.4 32.2 23.4 31.2C23.7 30.9 24 30.7 24.4 30.5V19.9C24 19.7 23.7 19.5 23.4 19.2C22.6 18.4 22.4 17.3 22.8 16.3L18.6 12.1L6.8 23.9C6 24.7 6 26.2 6.8 27L22.2 42.4C23 43.2 24.5 43.2 25.3 42.4L41.2 26.5C42 25.7 42 24.2 41.2 23.4V22.2Z"
        fill="white"
      />
    </svg>
  );
}

export function PythonIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="8" fill="" />
      <path
        d="M24 8C18.5 8 18.8 10.3 18.8 10.3L18.8 13.5H24.1V14.2H16.8C16.8 14.2 13 13.9 13 19.5C13 25.1 15.8 24.8 15.8 24.8H17.8V22.1C17.8 22.1 17.6 19.3 20.5 19.3H25.9C25.9 19.3 28.4 19.4 28.4 16.9V10.5C28.4 10.5 28.8 8 24 8ZM21.5 9.8C21.5 9.2 22 8.7 22.6 8.7C23.2 8.7 23.7 9.2 23.7 9.8C23.7 10.4 23.2 10.9 22.6 10.9C22 10.9 21.5 10.4 21.5 9.8Z"
        fill="#3776AB"
      />
      <path
        d="M24 40C29.5 40 29.2 37.7 29.2 37.7L29.2 34.5H23.9V33.8H31.2C31.2 33.8 35 34.1 35 28.5C35 22.9 32.2 23.2 32.2 23.2H30.2V25.9C30.2 25.9 30.4 28.7 27.5 28.7H22.1C22.1 28.7 19.6 28.6 19.6 31.1V37.5C19.6 37.5 19.2 40 24 40ZM26.5 38.2C26.5 38.8 26 39.3 25.4 39.3C24.8 39.3 24.3 38.8 24.3 38.2C24.3 37.6 24.8 37.1 25.4 37.1C26 37.1 26.5 37.6 26.5 38.2Z"
        fill="#FFD43B"
      />
    </svg>
  );
}
