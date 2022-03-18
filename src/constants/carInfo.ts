import bus from "../assets/images/verifyCarPlate/bus.png";
import fourWheels from "../assets/images/verifyCarPlate/four-wheels.png";
import fourWheels2 from "../assets/images/verifyCarPlate/four-wheels-2.png";
import sixWheels from "../assets/images/verifyCarPlate/six-wheelers.png";
import tenWheels from "../assets/images/verifyCarPlate/ten-wheelers.png";
import trailer from "../assets/images/verifyCarPlate/trailer.png";
import trailer2 from "../assets/images/verifyCarPlate/trailer-2.png";
import van from "../assets/images/verifyCarPlate/van.png";
import pickup from "../assets/images/verifyCarPlate/pickup.png";
import pickup2 from "../assets/images/verifyCarPlate/pickup-2.png";

const carInfo = [
  {
    carTitle: "รถ 4 ล้อ",
    carDescription: "รถยนต์ทั่วไป สำหรับการใช้งานส่วนตัว",
    carImage: [fourWheels, fourWheels2],
  },
  {
    carTitle: "รถบรรทุก",
    carDescription: "รถขนาดเล็กที่มีพื้นที่สำหรับบรรจุของด้านหลัง",
    carImage: [pickup, pickup2],
  },
  {
    carTitle: "รถ 6 ล้อ",
    carDescription: "รถขนาดกลางถึงขนาดใหญ่ เห็นล้อ 2 ล้อด้านข้าง",
    carImage: [sixWheels],
  },
  {
    carTitle: "รถ 10 ล้อ",
    carDescription: "รถขนาดใหญ่ เห็นล้อ 3 ล้อด้านข้าง",
    carImage: [tenWheels],
  },
  {
    carTitle: "รถตู้",
    carDescription: "รถขนาดกลางที่มีผู้โดยสารเกิน 5 คน",
    carImage: [van],
  },
  {
    carTitle: "รถบัส",
    carDescription: "รถขนาดใหญ่ที่มีผู้โดยสารเกิน 20 คน",
    carImage: [bus],
  },
  {
    carTitle: "รถพ่วง",
    carDescription: "รถที่มีอุปกรณ์พ่วงด้านหลัง",
    carImage: [trailer, trailer2],
  },
  {
    carTitle: "อื่นๆ",
    carDescription: "รถที่ไม่ได้อยู่ในประเภทที่กล่าวมา",
    carImage: [],
  }
];

export default carInfo;