// React API
import React, { useEffect, useState } from "react";
import { GetSection } from "../../api/sttv4/Section";
import LocalStorage from "../../constants/LocalStorage";

// Common Utils
import { SoundCategory } from "../../models/markSound";

interface Props {
  soundCategory?: SoundCategory;
  setSoundCategory: (soundCategory: SoundCategory) => void;

}

const defaultValue: Props = {
  soundCategory: undefined,
  setSoundCategory: () => { },
};

export const SpeechToTextV3Context = React.createContext<Props>(defaultValue);
export const SpeechToTextV3Provider = (props: { children: React.ReactNode }) => {
  const [soundCategory, setSoundCategory] =
    useState<SoundCategory | undefined>();
  useEffect(() => {
    GetSection(LocalStorage.getItem(
      "book_id"
    ), LocalStorage.getItem(
      "section_index"
    )).then((res) => {      
      if (res) {
        setSoundCategory(res.category)

      }
    }).catch((err) => {
      console.log(err.error)

    });
  }, []);
  return (
    <SpeechToTextV3Context.Provider
      value={{
        soundCategory,
        setSoundCategory,
      }}
    >
      {props.children}
    </SpeechToTextV3Context.Provider>
  );
};
