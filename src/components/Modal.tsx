import { useEffect, type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  type?: "success" | "error" | "info";
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  type = "info",
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="surface-card w-full max-w-[520px] p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-2xl font-semibold headline-serif">
                {title}
              </h2>
            )}
            <div className="mt-2 text-sm text-black/70">{children}</div>
          </div>
          <button
            className="nav-pill w-9 h-9 flex items-center justify-center"
            onClick={onClose}
            aria-label="關閉"
          >
            ✕
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="cta-primary" onClick={onClose}>
            確認
          </button>
        </div>
        <span
          className={`absolute top-4 right-16 text-xs font-semibold px-2 py-1 rounded-full ${
            type === "success"
              ? "bg-emerald-100 text-emerald-700"
              : type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"
          }`}
        >
          {type === "success"
            ? "SUCCESS"
            : type === "error"
              ? "ERROR"
              : "INFO"}
        </span>
      </div>
    </div>
  );
};

export default Modal;
