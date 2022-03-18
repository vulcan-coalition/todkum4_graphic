import { App } from "../models/app"

import speech from "../assets/images/logo_stt.svg";
import furniture from "../assets/images/furniture.svg";
import home from "../assets/images/logo_home.svg";
import chatbot from "../assets/images/chatbot-app.svg";

export const appName: App[] = [{
  name: "ถอดคำ",
  path: "/stt-v1",
  icon: speech,
  activateCode: 16359
},
{
  name: "ถอดคำ 2",
  path: "/stt-v2",
  icon: speech,
  activateCode: 16359
},
{
  name: "ถอดคำ 3",
  path: "/stt-v3",
  icon: speech,
  activateCode: 16359
},
{
  name: "เฟอร์นิเจอร์",
  path: "/furniture-labelling",
  icon: furniture,
  activateCode: 16380
},
{
  name: "บ้านอัจฉริยะ",
  path: "/sound",
  icon: home,
  activateCode: 16351
},
{
  name: "แชทบอท สำหรับ screen reader",
  path: "https://vulcan.pvirie.com/nographic/index.html",
  icon: chatbot,
  activateCode: 6649
},
{
  name: "แชทบอท",
  path: "https://vulcan.pvirie.com/vanilla/index.html",
  icon: chatbot,
  activateCode: 6654
},
{
  name: "แชทบอท 2 สำหรับ screen reader",
  path: "https://vc-chatbot.lab.ai/nographic/index.html",
  icon: chatbot,
  activateCode: 6649
},
{
  name: "แชทบอท 2",
  path: "https://vc-chatbot.lab.ai/vanilla/index.html",
  icon: chatbot,
  activateCode: 6654
}
]