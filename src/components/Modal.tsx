import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {children}
        <button onClick={onClose} style={styles.closeButton}>
          <div style={styles.confirm}>確認</div>
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "20",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "15px",
    minWidth: "300px",
    minHeight: "120px",
    position: "relative" as "relative",
    fontSize: "1.2rem",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
  },
  closeButton: {
    width: "80%",
    // height: "2rem",
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#a0937d",
  },
  confirm: {
    width: "100%",
    color: "white",
    height: "2.5rem",
    backgroundColor: "#a0937d",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Modal;
