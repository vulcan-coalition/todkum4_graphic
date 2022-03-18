
import animal from "../assets/images/labelling/animal.svg"
import armchair from "../assets/images/labelling/armchair.svg"
import bed from "../assets/images/labelling/bed.svg"
import book from "../assets/images/labelling/book.svg"
import computer from "../assets/images/labelling/computer.svg"
import glass from "../assets/images/labelling/glass.svg"
import person from "../assets/images/labelling/person.svg"
import phone from "../assets/images/labelling/phone.svg"
import table from "../assets/images/labelling/desk-chair.svg"
import wardrobe from "../assets/images/labelling/wardrobe.svg"
import truck from "../assets/images/labelling/truck.svg"
import car from "../assets/images/labelling/car.svg"

import { LabellingObject } from "../models/labelling"
export const furnitureGroup: LabellingObject[] = [{
  name: "โต๊ะ",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "furniture",
  typeTH: "เฟอร์นิเจอร์",
  imgUrl: table,
},
{
  name: "เก้าอี้",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "furniture",
  typeTH: "เฟอร์นิเจอร์",
  imgUrl: armchair,
},
{
  name: "ตู้",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "furniture",
  typeTH: "เฟอร์นิเจอร์",
  imgUrl: wardrobe,
},
{
  name: "เตียง",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "furniture",
  typeTH: "เฟอร์นิเจอร์",
  imgUrl: bed,
}, {
  name: "คอมพิวเตอร์",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "equipment",
  typeTH: "อุปกรณ์บนโต๊ะ",
  imgUrl: computer,
},
{
  name: "หนังสือ",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "equipment",
  typeTH: "อุปกรณ์บนโต๊ะ",
  imgUrl: book,
},
{
  name: "แก้ว",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "equipment",
  typeTH: "อุปกรณ์บนโต๊ะ",
  imgUrl: glass,
},
{
  name: "โทรศัพท์",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "equipment",
  typeTH: "อุปกรณ์บนโต๊ะ",
  imgUrl: phone,
}, {
  name: "คน",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "person",
  typeTH: "คน",
  imgUrl: person,
}, {
  name: "สัตว์เลี้ยง",
  desc: "เลือกประเภทของตามรูปที่ขีดกรอบไว้",
  type: "animal",
  typeTH: "สัตว์เลี้ยง",
  imgUrl: animal,
}
]

export const farmLabGroup = [
  {
    name: "person",
    desc: "คนที่อยู่ในกรอบ",
    type: "person",
    typeTH: "บุคคล",
    imgUrl: person,
  },
  {
    name: "truck",
    desc: "ยานพาหนะใด ๆ ที่ใช้ในการขนส่งปศุสัตว์หรือวัสดุ",
    type: "truck",
    typeTH: "รถขนของ",
    imgUrl: truck,
  },
  {
    name: "car",
    desc: "ยานพาหนะใด ๆ ที่ใช้ในการโดยสาร",
    type: "car",
    typeTH: "รถยนต์",
    imgUrl: car,
  }
]
