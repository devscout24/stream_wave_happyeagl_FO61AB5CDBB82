"use client";
import { ReactSVG } from "react-svg";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  src: string;
  title?: string;
  desc?: string;
  beforeInjection?: (svg: SVGSVGElement) => void;
  afterInjection?: (svg: SVGSVGElement) => void;
  evalScripts?: "always" | "once" | "never";
  fallback?: () => React.ReactNode;
  httpRequestWithCredentials?: boolean;
  loading?: () => React.ReactNode;
  onError?: (error: unknown) => void;
  renumerateIRIElements?: boolean;
  useRequestCache?: boolean;
  wrapper?: "div" | "span" | "svg";
}

const Icon: React.FC<IconProps> = (props) => {
  const { onClick, afterInjection, onError, ...rest } = props;
  // Attach onClick to SVG after injection if provided
  const handleAfterInjection = (svg: SVGSVGElement) => {
    if (onClick) {
      svg.onclick = (e) => {
        onClick(e as unknown as React.MouseEvent<SVGSVGElement, MouseEvent>);
      };
    }
    if (afterInjection) afterInjection(svg);
  };
  // Adapt onError to accept unknown
  const handleOnError = onError
    ? (error: unknown) => {
        onError(error);
      }
    : undefined;
  return (
    <ReactSVG
      {...rest}
      afterInjection={handleAfterInjection}
      onError={handleOnError}
    />
  );
};

export default Icon;
