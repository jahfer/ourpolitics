import * as React from 'react'
import { useId, useEffect, useState, useCallback, useMemo } from 'react'

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
      document.body.classList.add('modal--open');
    } else {
      dialogElement.close();
      document.body.classList.remove('modal--open');
    }
  }, [dialogElement, open])

  const handler = useCallback(() => {
    onClose && onClose();
    // dialogElement?.classList.add("modal--closing");
    // requestAnimationFrame(() => {
    //   dialogElement?.addEventListener("animationend", () => {
    //     dialogElement?.classList.remove("modal--closing");
    //   }, { once: true });
    // });
  }, [dialogElement, onClose]);

  useEffect(() => {
    if (!!onClose && dialogElement) {

      dialogElement.addEventListener("cancel", handler);
      return (() => dialogElement?.removeEventListener("cancel", handler));
    }
  }, [dialogElement, handler]);

  let dialogClassList = ["modal--content"];
  if (className) dialogClassList.push(...className.split(" "));
  if (open) dialogClassList.push("modal--visible");
  dialogClassList.push("");

  const dialogClassStr = useMemo(() => dialogClassList.join(" "), [dialogClassList]);
  const dialogBackdropClassStr = useMemo(() => dialogClassList.join("--backdrop "), [dialogClassList]);

  return (
    <>
      <div className={dialogBackdropClassStr}></div>
      <dialog
        autoFocus={true}
        id={modalId}
        className={dialogClassStr}
        aria-labelledby={titleElementId}
        aria-describedby={descriptionElementId}>
        {children}
      </dialog>
    </>
  )
}