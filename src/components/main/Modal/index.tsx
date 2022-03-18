import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";

import { AudioContext } from "../../../contexts/audio";
import { UserContext } from "../../../contexts/user";

import { speech } from "../../../plugins/Speak";

import Project from "../../../api/stt/Project";
import UpdateCoins from "../../../api/main/UpdateCoins";
import UpdateStateSttMode from "../../../api/stt/UpdateStateSttMode";
import Congrats from "../../../assets/images/mascot/congrats.png";

import Mascot from "../Mascot";
import ConfirmModal from "../ConfirmModal";

import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Box,
  Checkbox,
} from "@material-ui/core";
import { UpdateStateSttModeRequest } from "../../../models/user";

interface Props {
  totalTime: number;
}

const ModalReview: React.FC<Props> = (props) => {
  const {
    modalIsOpen,
    setModalIsOpen,
    setIsReviewMode,
    isReviewMode,
    modalContent,
    // totalTime,
  } = useContext(AudioContext);
  const [index, setIndex] = useState(0);
  const [isModalContentNotExistence, setIsModalContentNotExistence] =
    useState(true);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (modalIsOpen) {
      setIsModalContentNotExistence(false);
      if (modalContent[index].soundEffectOpenModal !== null) {
        setTimeout(() => {
          modalContent[index].soundEffectOpenModal.play();
        }, 200);
      }
      speech.speak(modalContent[index].textTitle, "", () => {});
    }
  }, [modalIsOpen, index, modalContent]);

  const handleModalToReviewMode = async () => {
    const body: UpdateStateSttModeRequest = {
      state: true,
      projectType: "stt",
    };
    
    const res = await UpdateStateSttMode(body);
    if (res) {
      if (res?.status === 200) {
        setModalIsOpen(false);
        setIsModalContentNotExistence(true);
        setIsReviewMode(true);
        setIndex(0);
        modalContent[index].soundEffectButton.play();
      }
    }
  };
  const { setIsUpdateUserInfo } = useContext(UserContext);

  const handleNewProject = () => {
    if (isReviewMode) {
      setIsUpdateUserInfo(true);
      Project("stt").then(() => {
        if (modalContent.length > 1) {
          setIndex(index + 1);
        } else {
          handleContinuous();
        }
        modalContent[index].soundEffectButton.play();
      });
      localStorage.removeItem("currentReview");
    } else {
      setIsReviewMode(true);
      if (modalContent.length > 1) {
        setIndex(index + 1);
      }
      modalContent[index].soundEffectButton.play();
    }
  };

  const handleGetCoins = () => {
    if (isReviewMode) {
      UpdateCoins("stt-coins", props.totalTime as number, 0).then(() => {
        setIsUpdateUserInfo(true);
        var maxIndex = modalContent.length - 1;
        maxIndex == index ? handleClose() : setIndex(index + 1);
        modalContent[index].soundEffectButton.play();
      });
    }
  };

  const handleClose = () => {
    setModalIsOpen(false);
    setIsModalContentNotExistence(true);
    handleNewProject();
    handleContinuous();
  };

  const handleContinuous = () => {
    setModalIsOpen(false);
    setIsModalContentNotExistence(true);
    window.location.reload();
    setIsReviewMode(false);
    setIndex(0);
  };

  const backToDashboard = () => {
    setModalIsOpen(false);
    setIsReviewMode(false);
    setIsModalContentNotExistence(true);
    window.parent.location.href = window.location.ancestorOrigins[0];
  };

  return (
    <React.Fragment>
      {isModalContentNotExistence ? (
        <></>
      ) : (
        <>
          <ConfirmModal
            isOpen={modalIsOpen}
            handleClose={() => handleClose()}
            title={modalContent[index].textTitle}
            mascot={modalContent[index].mascot}
            isCheckBox={modalContent[index].isCheckBox}
          >
            {modalContent[index].textBtn.length === 1 ? (
              <>
                <Box mt={2}>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    onClick={() =>
                      modalContent[index].textBtn[0] === "ไปฟังกันเลย"
                        ? handleModalToReviewMode()
                        : handleGetCoins()
                    }
                    onFocus={() => {
                      speech.speak(
                        modalContent[index].textBtn[0],
                        "",
                        () => {}
                      );
                    }}
                    aria-label={modalContent[index].textBtn[0]}
                  >
                    {modalContent[index].textBtn[0]}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box mt={2}>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    onClick={() =>
                      modalContent[index].textBtn[0] === "ใช่"
                        ? handleNewProject()
                        : handleContinuous()
                    }
                    onFocus={() => {
                      speech.speak(
                        modalContent[index].textBtn[0],
                        "",
                        () => {}
                      );
                    }}
                    aria-label={modalContent[index].textBtn[0]}
                  >
                    {modalContent[index].textBtn[0]}
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    fullWidth={true}
                    variant="contained"
                    onClick={() =>
                      modalContent[index].textBtn[1] === "ไม่ใช่"
                        ? handleClose()
                        : backToDashboard()
                    }
                    onFocus={() => {
                      speech.speak(
                        modalContent[index].textBtn[1],
                        "",
                        () => {}
                      );
                    }}
                    aria-label={modalContent[index].textBtn[1]}
                  >
                    {modalContent[index].textBtn[1]}
                  </Button>
                </Box>
              </>
            )}
            <div className={classes.positionMascot}>
              <Mascot
                status={modalContent[index].statusMascot}
                type={"modal"}
              ></Mascot>
            </div>
          </ConfirmModal>
        </>
      )}
    </React.Fragment>
  );
};

export default ModalReview;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    positionMascot: {
      position: "fixed",
      right: "5%",
      bottom: "15%",
      zIndex: 1000,
    },
  })
);
