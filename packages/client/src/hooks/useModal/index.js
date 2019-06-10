import { useState, useCallback } from 'react';

export const useModal = ({ defaultOpen = false } = {}) => {
  const [isOpen, setOpen] = useState(defaultOpen);

  const close = useCallback(() => setOpen(false), [setOpen]);
  const open = useCallback(() => setOpen(true), [setOpen]);
  const toggle = useCallback(() => setOpen(!isOpen), [setOpen, isOpen]);

  return { isOpen, close, open, toggle };
};

export default useModal;
