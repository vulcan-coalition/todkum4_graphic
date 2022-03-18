export interface MarkSoundCategory {
  id?: string
  description: string;
  value: MarkSoundSubCategory[];
  error: ErrorMarkSound[];
  errorActive?: boolean;
  errorSubActive?: boolean;
}
export interface MarkSoundSubCategory {
  description: string;
  value: MarkSoundSubCategoryChild;
  color?: string;
}

export interface MarkSoundSubCategoryChild {
  description: string;
  value: string | null;
  index?: number;
  color?: string;
}

export interface SoundCategory {
  choiceType: string;
  choices: SoundCategoryChoice[]
}

export interface SoundCategoryChoice {
  abbreviation: string;
  description: string;
  choiceType: string;
  choices: SubSoundCategoryChoice[];
}

export interface SubSoundCategoryChoice {
  description: string;
  choiceType: string;
  color: string;
  inputType?: string;
  choices: SubSoundCategoryChoiceChild[];
}

export interface SubSoundCategoryChoiceChild {
  description: string;
  color: string;
  inputType?: string;

}
export interface ErrorMarkSound {
  description: string;
}

export enum Category {
  Speech = "เสียงบรรยาย",
  MusicAndAmbient = "เสียงดนตรีหรือเสียงบรรยาย",
  SoundEffect = "เสียงประกอบสั้นๆ",
  Undefined = "ไม่สามารถระบุประเภท"
}
export interface TimeSlotAudio {
  start: number;
  end: number
}