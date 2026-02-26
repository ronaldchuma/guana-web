"use client";

import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn(
        "h-5 w-5 flex-shrink-0 text-deep/40 transition-transform duration-300 ease-[var(--ease-out)]",
        open && "rotate-180",
      )}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function AccordionPanel({
  item,
  index,
  isOpen,
  onToggle,
  baseId,
}: {
  item: AccordionItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  baseId: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerId = `${baseId}-trigger-${index}`;
  const panelId = `${baseId}-panel-${index}`;

  return (
    <div
      className={cn(
        "border-b border-deep/[0.06]",
        index === 0 && "border-t",
      )}
    >
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className={cn(
            "flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-deep",
            "transition-colors duration-200 hover:text-teal-600",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light",
          )}
        >
          <span>{item.question}</span>
          <ChevronIcon open={isOpen} />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div ref={contentRef} className="pb-5 text-deep/60 leading-relaxed">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, index) => (
        <AccordionPanel
          key={index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={handleToggle}
          baseId={baseId}
        />
      ))}
    </div>
  );
}
