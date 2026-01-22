"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

interface HeadingProps extends useRender.ComponentProps<"h1"> {}

export function Heading(props: HeadingProps) {
  const { render, children, id, ...otherProps } = props;

  const headingContent = id ? (
    <a href={`#${id}`} className="no-underline hover:underline">
      {children}
    </a>
  ) : (
    children
  );

  const defaultProps: useRender.ElementProps<"h1"> = {
    className:
      "text-text-high font-semibold tracking-tight font-mono leading-[140%]",
    children: headingContent,
  };

  const element = useRender({
    defaultTagName: "h1",
    render,
    props: mergeProps<"h1">(defaultProps, otherProps),
  });

  return element;
}
