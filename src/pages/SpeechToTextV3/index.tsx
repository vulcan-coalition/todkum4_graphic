// React API
import React, { useState, useEffect, useContext } from "react";
// Component


import ErrorModal from "../../components/main/ConfirmModal";


// Styling
import { useStyles } from "./style";
import { Button, Box, Grid, Container, Paper } from "@material-ui/core/";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import mascotError from "../../assets/images/mascot/fail.png";
import Congrats from "../../assets/images/mascot/congrats.png";
import Notification from "../../assets/images/mascot/notification.png";
import Rest from "../../assets/images/mascot/rest.png";
// Common Utils
import {
  MarkSoundCategory,
  ErrorMarkSound,
  Category,
  MarkSoundSubCategory,
  TimeSlotAudio,
  SoundCategory
} from "../../models/markSound";
import { ThemeContext } from "../../contexts/theme";
import { SpeechToTextV3Provider } from "../../contexts/speechToTextV3";
import { soundEffect } from "../../plugins/SoundEffect";
import LocalStorage from "../../constants/LocalStorage";
import { baseurl, checkTimeDialogs } from "../../constants";
import { autoSpeak, speech } from "../../plugins/Speak";

// API
import {
  GetMarkSound,
  AddMarkSound,
  NextSound,
  PreviousSound,
  GetCurrentBook,
  GetCategory,
  InitialData,
} from "../../api/sttv3/SpeechToTextV3Api";
import { Book } from "../../models/book";
import GetUserInfo from "../../api/main/GetUserInfo";
import GetCoin from "../../api/main/GetCoin";
import ModalReview from "../../components/main/Modal";
import ConfirmModal from "../../components/main/ConfirmModal";
import { useHistory } from "react-router-dom";
import SubHeader from "../../components/speechToTextV3/SubHeader";
import AudioControl from "../../components/speechToTextV3/AudioControl";
import CategorizableSoundBox from "../../components/speechToTextV3/CategorizableSoundBox";
import { setBtnScale, setFontScale } from "../../plugins/setScaleElement";
import { setTheme } from "../../plugins/Theme";
import { GetSection, NextSection } from "../../api/sttv4/Section";

interface Action {
  play: string;
  pause: string;
  skipForward: string;
  skipBackward: string;
  volumeUp: string;
  volumeDown: string;
  speedUp: string;
  speedDown: string;
  reset: string;
}

type ActionKeys = keyof Action;

const SpeechToTextV3 = () => {
  const history = useHistory();

  const [action, setAction] = useState<ActionKeys>("reset");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isAudioLoaded, setIsAudioLoaded] = useState<boolean>(false);
  const [isCompleteAudio, setIsCompleteAudio] = useState<boolean>(false);
  const [book, setBook] = useState<Book>({ id: "", bookName: "ชื่อหนังสือ", chapterName: "ตอนที่" });
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any[]>([]);
  const { isDarkMode } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);

  const classes = useStyles({ isDarkMode });
  const DEFAULT_ERROR: ErrorMarkSound = {
    description: "ระบุประเภทด้วยนะครับ",
  };
  const DEFAULT_MARKSOUND: MarkSoundCategory = {
    id: "",
    description: "",
    value: [],
    error: [DEFAULT_ERROR],
  };
  const [markSound, setMarkSound] = useState<MarkSoundCategory[]>([]);
  const [timeSlotAudio, setTimeSlotAudio] = useState<TimeSlotAudio>({
    start: 0,
    end: 1
  })


  useEffect(() => {
    setAudioUrl(
      `${baseurl}/audio_file?book_id=${LocalStorage.getItem(
        "book_id"
      )}`
    );
  }, []);


  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [markSound, isCompleteAudio]);



  useEffect(() => {
    if (isAudioLoaded) {
      GetMarkSoundLabel()
    }
  }, [isAudioLoaded]);

  const resetState = () => {
    setIsCompleteAudio(false)
    setAction("reset");
    setErrorMsg("");
    setErrorModal(false);
    setMarkSound([]);
    setAudioUrl(
      `${baseurl}/audio_file?book_id=${LocalStorage.getItem(
        "book_id"
      )}`
    );
    GetMarkSoundLabel()
  };

  const GetMarkSoundLabel = async () => {
    await GetSection(LocalStorage.getItem(
      "book_id"
    ), LocalStorage.getItem(
      "section_index"
    )).then((res) => {
      console.log(res);
      if (res.status == 303) {
        console.log(res.data.next_book_id);
        localStorage.setItem('book_id', res.data.next_book_id)
        localStorage.setItem('section_index', '0')
        resetState()
      }
      if (res &&  !res.status) {
        const bookName = { bookName: LocalStorage.getItem('book_id').split('/')[1], chapterName: LocalStorage.getItem('book_id').split('/')[2] } as Book
        setBook(bookName);


        const labelsData =
          res.previous_answer && res.previous_answer != undefined && res.category
            ? res.previous_answer.map((label: MarkSoundCategory) => {

              return res.category.choices
                .map((category: any) => {

                  if (
                    category.description === label.description &&
                    category.choiceType === "property"
                  ) {
                    return {
                      ...label,
                      error: category.choices
                        .map((choice: any) => {
                          if (
                            !label.value.find(
                              (value) =>
                                value.description === choice.description
                            )
                          ) {
                            return {
                              description: `ระบุ ${choice.description} ด้วยครับ`,
                            };
                          }
                        })
                        .filter((element: any) => element !== undefined),
                      value: category.choices.map(
                        (subSoundCategoryChoice: any) => {
                          return label.value.find(
                            (value) =>
                              value.description ===
                              subSoundCategoryChoice.description
                          );
                        }
                      ),
                    };
                  }
                  return label;
                })
                .find((element: any) => element !== undefined);
            })
            : new Array(
              {
                description: "เสียงบรรยาย",
                value: [
                  {
                    description: "ภาษา",
                    value: {
                      description: "ไทย",
                      value: ""
                    }
                  },
                  undefined,
                  undefined
                ]
              }
            ) as MarkSoundCategory[];

        setMarkSound(labelsData);
        setTimeSlotAudio(res.section);
      }
   
    })
      .catch((err) => {
        console.log(err);
        showErrorMessage("ไม่สามารถโหลดรายการล่าสุดได้กรุณาลองใหม่อีกครั้ง");
      });
  }
  const keyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (event.altKey && event.keyCode === 72) {
      onClickPrevious();
    }
    if (event.altKey && event.keyCode === 186) {
      onClickNext();
    }
    if (event.altKey && event.keyCode === 189) {
      const fontScale = localStorage.getItem('fontScale');
      if (fontScale != null) {
        if (Number(fontScale.split('px')[0]) > -10) {
          const fontSize = (Number(fontScale.split('px')[0]) - 1) + 'px';
          setFontScale(fontSize)
        }
      }
    }
    if (event.altKey && event.keyCode === 187) {
      const fontScale = localStorage.getItem('fontScale');
      if (fontScale != null) {
        if (Number(fontScale.split('px')[0]) < 99) {
          const fontSize = (Number(fontScale.split('px')[0]) + 1) + 'px';
          setFontScale(fontSize)
        }
      }
    }
    if (event.altKey && event.keyCode === 188) {
      const fontScale = localStorage.getItem('btnScale');
      if (fontScale != null) {
        if (Number(fontScale.split('px')[0]) > -10) {
          const btnSize = (Number(fontScale.split('px')[0]) - 1) + 'px';
          setBtnScale(btnSize)
        }
      }
    }
    if (event.altKey && event.keyCode === 190) {
      const fontScale = localStorage.getItem('btnScale');
      if (fontScale != null) {
        if (Number(fontScale.split('px')[0]) < 10) {
          const btnSize = (Number(fontScale.split('px')[0]) + 1) + 'px';
          setBtnScale(btnSize)
        }
      }
    }
    if (event.altKey && event.keyCode === 191) {
      const theme = localStorage.getItem('theme');
      if (theme == 'dark') {
        setTheme('light')

      } else if (theme == 'light') {
        setTheme('dark')
      }
    }
    if (event.altKey && event.keyCode === 75) {
      setAction("play");
    }
    if (event.altKey && event.keyCode === 74) {
      setAction("skipBackward");
      soundEffect.back3SecEffect.play();
    }
    if (event.altKey && event.keyCode === 76) {
      setAction("skipForward");
      soundEffect.next3SecEffect.play();
    }
    if (event.altKey && event.keyCode === 77) {
      setAction("speedUp");
    }
    if (event.altKey && event.keyCode === 78) {
      setAction("speedDown");
    }
    if (event.altKey && event.keyCode === 73) {
      setAction("volumeUp");
    }
    if (event.altKey && event.keyCode === 85) {
      setAction("volumeDown");
    }
    if (event.altKey && event.keyCode === 80) {
      setIsCompleteAudio(true)
      var focus = document.activeElement?.getAttribute('value');
      var inputCategory = document.getElementById("input-choiec")?.getAttribute('value');
      if (focus) {
        autoSpeak(focus);
      } else if (inputCategory) {
        autoSpeak(inputCategory);
      }
    }
    if (markSound.length === 0) {
      const defaultValue = new Array(
        {
          description: "เสียงบรรยาย",
          value: [
            {
              description: "ภาษา",
              value: {
                description: "ไทย",
                value: ""
              }
            },
            undefined,
            undefined
          ]
        }
      ) as MarkSoundCategory[]
      setMarkSound(defaultValue);
    }
  };

  const keyUp = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (event.altKey && event.keyCode === 75) {
      setAction("pause");
    } else {
      setAction("reset");
    }
  };

  const onClickNext = () => {
    if (validateMarkSound() && isCompleteAudio) {
      NextSection(markSound, LocalStorage.getItem('book_id'), LocalStorage.getItem("section_index")).then((res) => {
        const oldcurrent = LocalStorage.getItem("section_index")
        localStorage.setItem("section_index", String(Number(oldcurrent) + 1))
        resetState();
      });
    }
  };

  const onClickPrevious = () => {
    let isValid = validateMarkSound();
    if (isValid) {
      const oldcurrent = LocalStorage.getItem("section_index");
      if (Number(oldcurrent) > 0) {
        localStorage.setItem("section_index", String(Number(oldcurrent) - 1))
        resetState();
      }
    }
  };

  const onEditMarkSound = (index: number, selected: MarkSoundCategory) => {
    const clone = [...markSound];
    clone[index] = {
      id: selected.id,
      description: selected.description,
      value: selected.value,
      error: selected.error,
    };
    setMarkSound(clone);
  };

  const onAddMarkSound = () => {
    const clone = [...markSound];
    clone.push(DEFAULT_MARKSOUND);

    let isValid = validateMarkSound();
    if (isValid) {
      setMarkSound(clone);
    }
  };

  const onDeleteMarkSound = (index: number) => {
    setMarkSound(markSound.filter((item: any, i: number) => i !== index));
  };

  const showErrorMessage = (error: string | null) => {
    if (error !== null) {
      setErrorMsg(error);
      setErrorModal(true);
    } else {
      setErrorModal(false);
    }
  };

  const validateMarkSound = () => {
    let isValid = false;
    if (markSound.length === 0) {
      isValid = true;
    } else {
      const errorList = markSound.filter((item: MarkSoundCategory) =>
        item.error && item.error.length > 0 ? true : false
      );
      if (errorList.length > 0) {
        const latestMarkSoundError = errorList[errorList.length - 1];
        const latestError = latestMarkSoundError?.error;
        if (latestError) {
          showErrorMessage(latestError[0].description);
        }
      } else {
        isValid = true;
      }
    }

    return isValid;
  };

  const triggerModal = (modalContent: any[]) => {
    setModalContent(modalContent);
    setModalIsOpen(true);
  };

  // MARK TO DO: Handle Error Undefined length
  const handleConfirmErrorMsg = () => {
    const clone: MarkSoundCategory[] = [...markSound];
    clone.map((item: MarkSoundCategory) => {
      item.errorActive = item.value.length === 0 && item.description === "";
      item.errorSubActive = item.error?.length > 0;
    });
    setErrorModal(false);
    setMarkSound(clone);
  };

  const checkShouldAutoSpeak = (markSound: MarkSoundCategory) => {
    if (markSound.description === Category.Speech || markSound.description === Category.MusicAndAmbient || markSound.description === Category.SoundEffect) {
      markSound.value.forEach((item: MarkSoundSubCategory) => {
        if (item.value.value) {
          autoSpeak(`${item.value.value}`);
        }
      });
    }
  };

  const handleGetCoins = () => {
    NextSound().then(() => {
      setModalIsOpen(false)
      resetState();
    });
  }

  const backToDashboard = () => {
    setModalIsOpen(false);
    window.parent.location.href = window.location.ancestorOrigins[0];
  };

  return (
    <>
      
      <Container className={classes.container}>
    
      <SubHeader
          bookName={book?.bookName}
          chapterName={book?.chapterName}
          totalTime={timeSlotAudio.end}
          appName="ถอดคำ 4"
          autoFocus={false}
        />
        <Box mt={2} mb={2} >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs>
              <Box mx={1}>
                <Button
                  color="primary"
                  variant="outlined"
                  disableElevation
                  onClick={onClickPrevious}
                  fullWidth={true}
                  startIcon={<NavigateBeforeIcon />}
                  disabled={!isAudioLoaded}
                >
                  ก่อนหน้า
                </Button>
              </Box>
            </Grid>
            <Grid item xs>
              <Box mx={1}>
                <Button
                  color="primary"
                  variant="contained"
                  disableElevation
                  onClick={onClickNext}
                  fullWidth={true}
                  endIcon={<NavigateNextIcon />}
                  disabled={!isCompleteAudio}
                >
                  ต่อไป
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12} md={12} lg={12} className={classes.audioControl}>
            <Paper className={classes.paper}>
              <AudioControl
                action={action}
                url={audioUrl}
                fileName={book?.chapterName}
                setIsAudioLoaded={setIsAudioLoaded}
                setIsCompleteAudio={setIsCompleteAudio}
                setBookName={setBook}
                srcAudio={timeSlotAudio}
              />

            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12} className={classes.categorizableBox}>
            <Paper className={classes.paper}>
              <SpeechToTextV3Provider>
                <CategorizableSoundBox
                  isAudioLoaded={isAudioLoaded}
                  markSound={markSound}
                  setMarkSound={setMarkSound}
                  onAddMarkSound={onAddMarkSound}
                  onDeleteMarkSound={onDeleteMarkSound}
                  onEditMarkSound={onEditMarkSound}
                />
              </SpeechToTextV3Provider>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      {modalIsOpen &&
        (
          <ConfirmModal
            isOpen={modalIsOpen}
            handleClose={() => handleGetCoins()}
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
                    onClick={() => modalContent.length - 1 == index ?
                      handleGetCoins() : setIndex(index + 1)}
                    onFocus={() => {
                      speech.speak(
                        modalContent[index].textBtn[0],
                        "",
                        () => { }
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
                    onClick={() => handleGetCoins()}
                    onFocus={() => {
                      speech.speak(
                        modalContent[index].textBtn[0],
                        "",
                        () => { }
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
                    onClick={() => backToDashboard()
                    }
                    onFocus={() => {
                      speech.speak(
                        modalContent[index].textBtn[1],
                        "",
                        () => { }
                      );
                    }}
                    aria-label={modalContent[index].textBtn[1]}
                  >
                    {modalContent[index].textBtn[1]}
                  </Button>
                </Box>
              </>
            )}
          </ConfirmModal>
        )}
      <ErrorModal
        isOpen={errorModal}
        title={errorMsg}
        handleClose={() => setErrorModal(false)}
        mascot={mascotError}
      >
        <Button
          fullWidth={true}
          className="green-btn"
          variant="contained"
          autoFocus
          onClick={handleConfirmErrorMsg}
        >
          ตกลง
        </Button>
      </ErrorModal>
    </>
  );
};

export default SpeechToTextV3;
