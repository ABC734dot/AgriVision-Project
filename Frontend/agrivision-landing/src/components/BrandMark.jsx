export default function BrandMark({ size = 30 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 30C16 30 6 23.5 6 14.5C6 8.5 10.5 4 16 4C21.5 4 26 8.5 26 14.5C26 23.5 16 30 16 30Z"
        fill="#4F7942"
      />
      <path
        d="M16 30C16 30 16 18 16 12"
        stroke="#E8A33D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 16C16 16 12 14 11 10"
        stroke="#F2E8D5"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16 20C16 20 20 18 21 14"
        stroke="#F2E8D5"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
