'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';

export type DropdownItem = {
  label: string;
  href: string;
};

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  /** desktop = click-to-open menu; accordion = inline expand for mobile */
  mode?: 'dropdown' | 'accordion';
  onItemClick?: (label: string) => void;
}

export function NavDropdown({ label, items, mode = 'dropdown', onItemClick }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const panelId = useId();

  // Close on click outside (dropdown mode only)
  useEffect(() => {
    if (mode !== 'dropdown' || !isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, mode]);

  // Focus the highlighted item when navigating with keyboard
  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const close = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
    if (mode === 'dropdown') triggerRef.current?.focus();
  };

  const handleTriggerKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (mode !== 'dropdown') return;
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    } else if (event.key === 'Escape') {
      close();
    }
  };

  const handleItemKey = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex((index + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((index - 1 + items.length) % items.length);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setFocusedIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setFocusedIndex(items.length - 1);
    }
  };

  const handleItemClick = (label: string) => {
    onItemClick?.(label);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const chevron = (
    <svg
      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  if (mode === 'accordion') {
    return (
      <div className="space-y-1">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between text-text-secondary hover:text-primary-500 font-medium py-2"
        >
          <span>{label}</span>
          {chevron}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ul role="menu" className="pl-4 border-l border-border-subtle space-y-1">
                {items.map((item) => (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      role="menuitem"
                      onClick={() => handleItemClick(item.label)}
                      className="block py-2 text-sm text-text-secondary hover:text-primary-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setIsOpen((v) => !v);
          setFocusedIndex(-1);
        }}
        onKeyDown={handleTriggerKey}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="inline-flex items-center gap-1 text-text-secondary hover:text-primary-500 font-medium transition-colors whitespace-nowrap"
      >
        <span>{label}</span>
        {chevron}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={panelId}
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-2 min-w-[14rem] rounded-xl border border-border-subtle bg-surface shadow-xl overflow-hidden z-50"
          >
            <ul className="py-2">
              {items.map((item, index) => (
                <li key={item.href} role="none">
                  <Link
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    href={item.href}
                    role="menuitem"
                    onClick={() => handleItemClick(item.label)}
                    onKeyDown={(e) => handleItemKey(e, index)}
                    className="block px-4 py-2.5 text-sm text-text-secondary hover:text-primary-500 hover:bg-surface-elevated focus:text-primary-500 focus:bg-surface-elevated focus:outline-none transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
