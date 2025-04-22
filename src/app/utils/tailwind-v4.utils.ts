export const TAILWIND_V4_MAPPINGS = {
  'text-gray-': 'text-neutral-',
  'bg-gray-': 'bg-neutral-',
  'border-gray-': 'border-neutral-',
} as const;

export const updateTailwindClasses = (classes: string): string => {
  return classes.split(' ')
    .map(cls => {
      for (const [pattern, replacement] of Object.entries(TAILWIND_V4_MAPPINGS)) {
        if (pattern.endsWith('-') && cls.startsWith(pattern)) {
          return cls.replace(pattern, replacement);
        }
      }
      return cls;
    })
    .join(' ');
};
