// src/hooks/useExplanationModal.js
import { useState, useEffect } from "react";

export const useExplanationModal = (storageKey = "hideExplanationModal") => {
  const [showModal, setShowModal] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [hasShown, setHasShown] = useState(false); // untuk kontrol per komponen

  useEffect(() => {
    const preference = localStorage.getItem(storageKey);
    if (preference === "true") {
      setDontShowAgain(true);
    }
  }, [storageKey]);

  const toggleExplanation = (isVisible, setVisible) => {
    if (!dontShowAgain && !hasShown && !isVisible) {
      setShowModal(true);
    } else {
      setVisible(!isVisible);
    }
  };

  const handleContinue = (setVisible) => {
    if (dontShowAgain) {
      localStorage.setItem(storageKey, "true");
    }
    setShowModal(false);
    setVisible(true);
    setHasShown(true);
  };

  const handleCheckboxChange = (e) => {
    setDontShowAgain(e.target.checked);
  };

  return {
    showModal,
    dontShowAgain,
    setShowModal,
    toggleExplanation,
    handleContinue,
    handleCheckboxChange,
  };
};
