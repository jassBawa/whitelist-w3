import * as React from 'react';
import { SVGProps } from "react"

const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className="w-6 h-6 text-blue-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2} "
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);
export default SVGComponent;
