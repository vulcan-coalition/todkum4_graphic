import { useState, useEffect, useContext } from "react";

import { UserContext } from "../contexts/user";

export default function useLongPressSpacebar(
  callback = () => {},
  ms = 300,
  callback2 = () => {}
) {
  const [startLongPress, setStartLongPress] = useState<boolean>(false);
  const [isCallback, setIsCallback] = useState<boolean>(false);
  const [numberUp, setNumberUp] = useState<number>(0);
  const [isUp, setIsUp] = useState<boolean>(false);
  const [isCallbackOneTouch, setIsCallbackOneTouch] = useState<boolean>(false);
  const { isHelp } = useContext(UserContext);
  const [modalIsFocus, setModalIsFocus] = useState<boolean>(false);

  let timerId: NodeJS.Timeout;
  useEffect(() => {
    if (startLongPress && (numberUp >= 1 || numberUp === 0 )) {
      setIsUp(false);      
      timerId = setTimeout(() => {
        setIsCallback(true);
      }, ms);
    } else {
      setIsCallback(false);
      clearTimeout(timerId);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress, numberUp, isUp]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
    if (
      event.key === " " ||
      event.key === "Spacebar"
    ) {
      setIsUp(false);
      setStartLongPress(true);
      event.stopPropagation();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    var btnLongPress = document.getElementById("btn-longPress") as HTMLElement;
    var btnHasFocus =  document.activeElement === btnLongPress
    if (event.repeat) {
      return;
    }
    if (
      event.key === " " ||
      event.key === "Spacebar" && !btnHasFocus
    ) {
      setStartLongPress(false);
      setIsCallback(false);
      setIsUp(true);
      event.stopPropagation();
    }
  };

  var modal = document.getElementById("modal-sound") as HTMLElement;
  useEffect(() =>{
 if( document.activeElement === modal){
   setModalIsFocus(true);
 }else{
   setModalIsFocus(false);
 }
  },[ document.activeElement])

  useEffect(() => {
    if (isUp && !isCallbackOneTouch && numberUp < 2 && !modalIsFocus) {
      setNumberUp((prev) => prev + 1);
      setIsUp(false);
    }
    if (numberUp === 2) {
      setIsCallbackOneTouch(true);
    }
    if (isCallbackOneTouch) {
      callback2();
      setNumberUp(0)
      setIsCallbackOneTouch(false);
      setIsUp(false);
      setIsCallback(false)
    }

    if(isHelp){
      setNumberUp(0)
      setIsCallbackOneTouch(false);
      setIsUp(false);

    }

    if(modalIsFocus){
      setNumberUp(0)
    }
  }, [numberUp, isUp, isCallbackOneTouch, callback2, isHelp, modalIsFocus]);

  useEffect(() => {
    if (isCallback) {
      callback();
      setIsCallback(false);
     setNumberUp(0)
    }
  }, [isCallback]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [callback]);
}
