import React from 'react'

export function PythonLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M62.6 3C32.7 3 34.4 16 34.4 16L34.5 29.4H63.6V33.6H23C23 33.6 3 31.4 3 61.9C3 92.4 20.3 90.7 20.3 90.7H30.5V76.5C30.5 76.5 29.5 59.4 47 59.4H74.3C47 59.4 75.6 59.4 75.6 59.4C75.6 59.4 92 58.7 92 41.5C92 24.3 76.2 27.5 76.2 27.5L76.2 16.5C76.2 16.5 78.4 3 62.6 3ZM46.9 12.3C49.9 12.3 52.3 14.7 52.3 17.7C52.3 20.7 49.9 23.1 46.9 23.1C43.9 23.1 41.5 20.7 41.5 17.7C41.5 14.7 43.9 12.3 46.9 12.3Z" fill="#3776AB"/>
      <path d="M65.1 125C95 125 93.3 112 93.3 112L93.2 98.6H64.1V94.4H104.7C104.7 94.4 125 96.6 125 66.1C125 35.6 107.7 37.3 107.7 37.3H97.5V51.5C97.5 51.5 98.5 68.6 81 68.6H53.7C81 68.6 52.4 68.6 52.4 68.6C52.4 68.6 36 69.3 36 86.5C36 103.7 51.8 100.5 51.8 100.5L51.8 111.5C51.8 111.5 49.6 125 65.1 125ZM80.8 115.7C77.8 115.7 75.4 113.3 75.4 110.3C75.4 107.3 77.8 104.9 80.8 104.9C83.8 104.9 86.2 107.3 86.2 110.3C86.2 113.3 83.8 115.7 80.8 115.7Z" fill="#FFD43B"/>
    </svg>
  )
}

export function CppLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M117.5 33.5L67.7 4.7C65.4 3.4 62.6 3.4 60.3 4.7L10.5 33.5C8.2 34.8 6.8 37.3 6.8 40V97.5C6.8 100.2 8.2 102.7 10.5 104L60.3 132.8C62.6 134.1 65.4 134.1 67.7 132.8L117.5 104C119.8 102.7 121.2 100.2 121.2 97.5V40C121.2 37.3 119.8 34.8 117.5 33.5Z" fill="#00599C"/>
      <path d="M47.5 50.5C41.5 50.5 37.5 55.5 37.5 64C37.5 72.5 41.5 77.5 47.5 77.5C52 77.5 55.5 75 56.5 71H66.5C65 79.5 57.5 86 47.5 86C35 86 27 76.5 27 64C27 51.5 35 42 47.5 42C57.5 42 65 48.5 66.5 57H56.5C55.5 53 52 50.5 47.5 50.5Z" fill="white"/>
      <path d="M77 60H83V54H87V60H93V64H87V70H83V64H77V60Z" fill="white"/>
      <path d="M96 60H102V54H106V60H112V64H106V70H102V64H96V60Z" fill="white"/>
    </svg>
  )
}

export function UbuntuLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="60" fill="#E95420"/>
      <circle cx="64" cy="64" r="34" stroke="white" strokeWidth="12" fill="none"/>
      <circle cx="30" cy="64" r="11" fill="#E95420" stroke="white" strokeWidth="4"/>
      <circle cx="81" cy="34" r="11" fill="#E95420" stroke="white" strokeWidth="4"/>
      <circle cx="81" cy="94" r="11" fill="#E95420" stroke="white" strokeWidth="4"/>
    </svg>
  )
}

export function RosLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="24" fill="#22272E"/>
      <circle cx="34" cy="34" r="14" fill="#22B573"/>
      <circle cx="64" cy="34" r="14" fill="#22B573"/>
      <circle cx="94" cy="34" r="14" fill="#22B573"/>
      <circle cx="34" cy="64" r="14" fill="#22B573"/>
      <circle cx="64" cy="64" r="14" fill="#22B573"/>
      <circle cx="94" cy="64" r="14" fill="#22B573"/>
      <circle cx="34" cy="94" r="14" fill="#22B573"/>
      <circle cx="64" cy="94" r="14" fill="#22B573"/>
      <circle cx="94" cy="94" r="14" fill="#22B573"/>
    </svg>
  )
}

export function OpenCVLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="38" r="26" fill="#FF2D2D"/>
      <circle cx="38" cy="84" r="26" fill="#00E640"/>
      <circle cx="90" cy="84" r="26" fill="#2D72FF"/>
      <circle cx="64" cy="38" r="10" fill="#121212"/>
      <circle cx="38" cy="84" r="10" fill="#121212"/>
      <circle cx="90" cy="84" r="10" fill="#121212"/>
    </svg>
  )
}

export function PyTorchLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M72 16L60 38C76 46 84 62 84 80C84 100 68 116 48 116C28 116 12 100 12 80C12 60 28 44 48 44V28C20 28 0 51 0 80C0 109 23 132 52 132C81 132 104 109 104 80C104 53 87 30 72 16Z" fill="#EE4C2C"/>
      <circle cx="78" cy="24" r="8" fill="#EE4C2C"/>
    </svg>
  )
}

export function TensorFlowLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 4L8 36V92L36 76V44L64 60V124L92 108V76L120 92V36L64 4Z" fill="#FF6F00"/>
      <path d="M64 4L120 36V92L92 76V44L64 60V4Z" fill="#FF8F00"/>
    </svg>
  )
}
