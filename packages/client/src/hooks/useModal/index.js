import { useState, useCallback } from 'react';

export const useModal = ({ defaultOpen = false } = {}) => {
  const [open, setOpen] = useState(defaultOpen);

  const onClose = useCallback(() => setOpen(false), [setOpen]);
  const onOpen = useCallback(() => setOpen(true), [setOpen]);
  const onToggle = useCallback(() => setOpen(!open), [setOpen, open]);

  return { open, onClose, onOpen, onToggle };
};

export default useModal;
