import * as React from 'react'
import { useId, useEffect, useState } from 'react'

interface ModalProps {
  titleElementId?: string;
  descriptionElementId?: string;
  open: boolean;
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;
}

export function Modal ({ className, children, titleElementId, descriptionElementId, open, onClose, onOpen }: ModalProps) {
  const modalId = useId();
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement>();

  useEffect(() => {
    const dialog = document.getElementById(modalId);
    setDialogElement(dialog as HTMLDialogElement);
  }, [modalId]);

  useEffect(() => {
    if (!dialogElement) {
      return;
    }

    if (open) {
      onOpen && onOpen();
      dialogElement.showModal();
      document.body.classList.add('policyModal--open');
    } else {
      dialogElement.close();
      document.body.classList.remove('policyModal--open');
    }
  }, [dialogElement, open])

  useEffect(() => {
    if (!!onClose) {
      const handler = (_event: Event) => {
        onClose();
      }
      if (dialogElement) {
        dialogElement?.addEventListener("cancel", handler);
        return (() => dialogElement?.removeEventListener("cancel", handler));
      }
    }
  }, [dialogElement, onClose]);

  let dialogClassList = [];
  if (className) dialogClassList.push(className);
  if (open) dialogClassList.push("policyModal--visible");
  const dialogClassStr = dialogClassList.join(" ");

  return (
    <dialog
      autoFocus={true}
      id={modalId}
      className={dialogClassStr}
      aria-labelledby={titleElementId}
      aria-describedby={descriptionElementId}>
      {children}
    </dialog>
  )
}