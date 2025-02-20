import * as React from 'react'
import { useId, useEffect, useState, useCallback, useMemo } from 'react'

interface ModalProps {
  titleElementId?: string;
  descriptionElementId?: string;
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  className?: string;
  children?: React.ReactNode;
  useCustomCloseButton?: boolean;
}

export function Modal ({ className, children, titleElementId, descriptionElementId, open, onClose, onOpen, useCustomCloseButton }: ModalProps) {
  const modalId = useId();
  const modalDialogId = useId();
  const [dialogElement, setDialogElement] = useState<HTMLDialogElement>();
  const [dialogBackdropElement, setDialogBackdropElement] = useState<HTMLDivElement>();

  useEffect(() => {
    const dialog = document.getElementById(modalId);
    setDialogElement(dialog as HTMLDialogElement);
    const dialogBackdrop = document.getElementById(modalDialogId);
    setDialogBackdropElement(dialogBackdrop as HTMLDivElement);
  }, [modalId]);

  useEffect(() => {
    if (!dialogElement) {
      return;
    }

    if (open) {
      onOpen && onOpen();
      dialogElement.showModal();
      // dialogBackdropElement?.classList.add('modal--open');
    } else {
      dialogElement.close();
      // dialogBackdropElement?.classList.remove('modal--open');
    }
  }, [dialogElement, open])

  const onCloseHandler = useCallback((event: Event) => {
    event.preventDefault();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (dialogElement && dialogBackdropElement) {
      dialogElement.addEventListener("cancel", onCloseHandler);
      dialogBackdropElement.addEventListener("click", onCloseHandler);
      return (() => {
        dialogElement?.removeEventListener("cancel", onCloseHandler);
        dialogBackdropElement?.removeEventListener("click", onCloseHandler);
      });
    }
  }, [dialogElement, dialogBackdropElement, onCloseHandler]);

  let dialogClassList = ["modal--content"];
  if (className) dialogClassList.push(...className.split(" "));
  if (open) {
    dialogClassList.push("modal--visible");
    dialogClassList.push("modal--open");
  }

  const dialogClassStr = useMemo(() => dialogClassList.join(" "), [dialogClassList]);
  const dialogBackdropClassStr = useMemo(() => dialogClassList.join("--backdrop "), [dialogClassList]);

  return (
    <>
      <div id={modalDialogId} className={dialogBackdropClassStr}></div>
      <dialog
        autoFocus={true}
        id={modalId}
        className={dialogClassStr}
        aria-labelledby={titleElementId}
        aria-describedby={descriptionElementId}>
        {
          (!useCustomCloseButton)
            ? <a href="#" className="modal--close" aria-label="Close" onClick={onCloseHandler} />
            : null
        }
        {children}
      </dialog>
    </>
  )
}