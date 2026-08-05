import React from 'react'
import { SiRos, SiPytorch, SiPython, SiCplusplus, SiUbuntu, SiOpencv } from 'react-icons/si'

export function PythonLogo({ className = "w-8 h-8" }: { className?: string }) {
  return <SiPython className={`${className} text-[#3776AB]`} />
}

export function CppLogo({ className = "w-8 h-8" }: { className?: string }) {
  return <SiCplusplus className={`${className} text-[#00599C]`} />
}

export function UbuntuLogo({ className = "w-8 h-8" }: { className?: string }) {
  return <SiUbuntu className={`${className} text-[#E95420]`} />
}

export function RosLogo({ className = "w-8 h-8" }: { className?: string }) {
  return <SiRos className={`${className} text-[#22B573]`} />
}

export function OpenCVLogo({ className = "w-8 h-8" }: { className?: string }) {
  return <SiOpencv className={`${className} text-[#5C3EE8]`} />
}

export function PyTorchLogo({ className = "w-8 h-8" }: { className?: string }) {
  return <SiPytorch className={`${className} text-[#EE4C2C]`} />
}

export function TensorFlowLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 4L8 36V92L36 76V44L64 60V124L92 108V76L120 92V36L64 4Z" fill="#FF6F00"/>
      <path d="M64 4L120 36V92L92 76V44L64 60V4Z" fill="#FF8F00"/>
    </svg>
  )
}
