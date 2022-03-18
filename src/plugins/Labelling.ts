import { furnitureGroup, farmLabGroup } from "../constants/labellingData"
import { LabellingObject } from "../models/labelling"

const furnitureClass = ["furniture", "equipment", "person", "animal"]
const farmLabClass = ["person", "truck", "car"]

export const getIcon = (app: string, type: string, value: string) => {
  const icon = new Image();
  icon.src = ""
  if (furnitureClass.includes(type) && app === "furniture") {
    icon.src = furnitureGroup.filter((item: LabellingObject) => item.name === value)[0]?.imgUrl
  } else if (farmLabClass.includes(type) && app === "farmLab") {
    icon.src = farmLabGroup.filter((item: LabellingObject) => item.name === value)[0]?.imgUrl
  }
  return icon
}

export const mapValueToType = (app:string, type: string, value: string) => {
  var typeMapped: string = "";
  if (furnitureClass.includes(type) && app === "furniture") {
    typeMapped = furnitureGroup.filter((item: LabellingObject) => item.name === value)[0]?.type
  } else if (farmLabClass.includes(type) && app === "farmLab") {
    typeMapped = farmLabGroup.filter((item: LabellingObject) => item.name === value)[0]?.type
  }
  return typeMapped;
};


export const getTypeIcon = (type: string) => {
  const image = require(`../assets/images/labelling/${type}.svg`);
  if (image) {
    return image.default
  }
}

export const typeTH: any = {
  "furniture": "เฟอร์นิเจอร์",
  "equipment": "อุปกรณ์บนโต๊ะ",
  "person": "บุคคล",
  "animal": "สัตว์เลี้ยง",
  "truck": "รถขนของ",
  "car": "รถยนต์"
}