declare global {
  interface Window {
    klaviyo?: {
      push: (args: unknown[]) => void;
    };
    _klOnsite?: unknown[];
  }
}

export {};
