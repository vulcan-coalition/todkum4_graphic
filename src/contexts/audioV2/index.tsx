import React, { useState } from "react";

interface AudioContextV2Props {
  // currentTime?: number;
  // setCurrentTime?: any;
  totalTime?: number;
  setTotalTime?: any;
  markTime?: number;
  setMarkTime?: any;
  oldMarkText?: any;
  setOldMarkText?: any;
  modalIsOpen?: any;
  setModalIsOpen?: any;
  modalTutorialIsOpen?: any;
  setModalTutorialIsOpen?: any;
  isUpdatedMarkText?: any;
  setIsUpdatedMarkText?: any;
  isTriggerPlay?: boolean;
  setIsTriggerPlay?: any;
  startReadTime?: number;
  setStartReadTime?: any;
  isTriggerSetLatestTimeOfMark?: number;
  setIsTriggerSetLatestTimeOfMark?: any;
  lastMarkTime?: number;
  setLastMarkTime?: any;
  modalContent?: any;
  setModalContent?: any;
  isReviewTutorial?: boolean;
  setIsReviewTutorial?: any;
  stepTutorial?: any;
  setStepTutorial?: any;
  isTutorialTriggerPlay?: boolean;
  setIsTutorialTriggerPlay?: any;
  isTutorialStepEnded?: boolean;
  setIsTutorialStepEnded?: any;
  isTutorialSoundEnded?: boolean;
  setIsTutorialSoundEnded?: any;
  isFocusSetting?: boolean;
  setIsFocusSetting?: any;
  isSuccessTutorial?: boolean;
  setIsSuccessTutorial?: any;
  speed?: number;
  setSpeed?: any;
}
export const AudioContextV2 = React.createContext<AudioContextV2Props>({});
const AudioProviderV2 = (props: { children: React.ReactNode }) => {
  // const [currentTime, setCurrentTime] = useState();
  const [totalTime, setTotalTime] = useState();
  const [markTime, setMarkTime] = useState();
  const [oldMarkText, setOldMarkText] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTutorialIsOpen, setModalTutorialIsOpen] = useState(false);
  const [isUpdatedMarkText, setIsUpdatedMarkText] = useState();
  const [isTriggerPlay, setIsTriggerPlay] = useState(false);
  const [startReadTime, setStartReadTime] = useState();
  const [
    isTriggerSetLatestTimeOfMark,
    setIsTriggerSetLatestTimeOfMark,
  ] = useState();
  const [lastMarkTime, setLastMarkTime] = useState();
  const [modalContent, setModalContent] = useState();
  const [isReviewTutorial, setIsReviewTutorial] = useState(false);
  const [stepTutorial, setStepTutorial] = useState();
  const [isTutorialTriggerPlay, setIsTutorialTriggerPlay] = useState();
  const [isTutorialStepEnded, setIsTutorialStepEnded] = useState();
  const [isTutorialSoundEnded, setIsTutorialSoundEnded] = useState();
  const [isFocusSetting, setIsFocusSetting] = useState();
  const [isSuccessTutorial, setIsSuccessTutorial] = useState();
  const [speed, setSpeed] = useState();

  return (
    <AudioContextV2.Provider
      value={{
        // currentTime,
        // setCurrentTime,
        totalTime,
        setTotalTime,
        markTime,
        setMarkTime,
        oldMarkText,
        setOldMarkText,
        modalIsOpen,
        setModalIsOpen,
        modalTutorialIsOpen,
        setModalTutorialIsOpen,
        isUpdatedMarkText,
        setIsUpdatedMarkText,
        isTriggerPlay,
        setIsTriggerPlay,
        startReadTime,
        setStartReadTime,
        isTriggerSetLatestTimeOfMark,
        setIsTriggerSetLatestTimeOfMark,
        lastMarkTime,
        setLastMarkTime,
        modalContent,
        setModalContent,
        isReviewTutorial,
        setIsReviewTutorial,
        stepTutorial,
        setStepTutorial,
        isTutorialTriggerPlay,
        setIsTutorialTriggerPlay,
        isTutorialStepEnded,
        setIsTutorialStepEnded,
        isTutorialSoundEnded,
        setIsTutorialSoundEnded,
        isFocusSetting,
        setIsFocusSetting,
        isSuccessTutorial,
        setIsSuccessTutorial,
        speed,
        setSpeed,
      }}
    >
      {props.children}
    </AudioContextV2.Provider>
  );
};

export default AudioProviderV2;
