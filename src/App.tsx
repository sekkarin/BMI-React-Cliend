import { useState } from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, FormControl, Input, InputLabel } from "@mui/material";
import axios from "axios";
interface Info {
  bmi: number;
  info: string;
}
function App() {
  const [weight, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [infoUser, setinfoUser] = useState<Info | undefined>(undefined);
  const handleOnsubmit = async () => {
    console.log(weight, height);
    const res = await axios.post("/api/calbmi", {
      height: height,
      weight: weight,
    });
    // console.log(res.data);
    setinfoUser(res.data);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BMI
            </Typography>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth={"md"}
          sx={{
            mt: 10,
          }}
        >
          <Typography variant="h3" color={"green"}>
            โปรแกรมคำนวนค่าดัชนีมวลกาย - BMI
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              textAlign: "justify",
              textAlignLast: "start",
            }}
          >
            ค่า <b>BMI</b> คือค่าดัชนีที่ใช้ชี้วัดความสมดุลของน้ำหนักตัว
            (กิโลกรัม) และส่วนสูง (เซนติเมตร) ซึ่งสามารถระบุได้ว่า
            ตอนนี้รูปร่างของคนคนนั้นอยู่ในระดับใด ตั้งแต่อ้วนมากไปจนถึงผอมเกินไป
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              mb: 2,
              textAlign: "justify",
              textAlignLast: "start",
            }}
          >
            <b> Body Mass Index (BMI) </b> มีสูตรการคำนวณ = น้ำหนักตัว[Kg] /
            (ส่วนสูง[m] ยกกำลังสอง)
            สูตรคำนวณเหมาะสำหรับใช้ประเมินผู้ที่มีอายุตั้งแต่ 20 ปีขึ้นไป
            ประโยชน์ของการวัดค่า BMI เพื่อดูอัตราเสี่ยงต่อการเกิดโรคต่าง ๆ
            ตรวจสอบภาวะไขมันและความอ้วน
            ดังนั้นการทำให้ร่างกายอยู่ในเกณฑ์ปกติจึงมีความสำคัญอย่างยิ่งกับผู้ที่ต้องการรักษาสุขภาพในระยะยาว
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              mb: 2,
              textAlign: "center",
              bgcolor: "green",
              color: "white",
              paddingY: 2,
            }}
          >
            ใส่ค่าน้ำหนัก - ส่วนสูงของคุณ
          </Typography>
          <form noValidate autoComplete="off">
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
              <InputLabel htmlFor="wight">น้ำหนัก :</InputLabel>
              <Input
                id="wight"
                placeholder="นํ้าหนัก (kg)"
                required
                type="number"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setWidth(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard" required>
              <InputLabel htmlFor="hight">ส่วนสูง :</InputLabel>
              <Input
                id="hight"
                placeholder="ส่วนสูง (cm.)"
                type="number"
                onChange={(e) => {
                  // console.log(e.target.value);
                  setHeight(e.target.value);
                }}
              />
            </FormControl>
            <Button
              // type="submit"
              fullWidth
              sx={{ marginY: 2 }}
              size="medium"
              variant="contained"
              onClick={() => {
                handleOnsubmit();
              }}
            >
              คำนวณ BMI
            </Button>
          </form>
          <Typography variant="body2">
            ค่า BMI ของคุณคือ :{" "}
            {infoUser?.bmi !== undefined ? infoUser?.bmi : ""}
          </Typography>
          <Typography variant="body2">ผลทดสอบ : {infoUser?.info}</Typography>
          <Typography
            variant="h5"
            sx={{
              marginY: 2,
              fontWeight: 900,
              color: "darkblue",
            }}
          >
            อ้วนมาก = 30.0 ขึ้นไป
          </Typography>

          <Typography
            variant="body2"
            sx={{
              pl: 2,
              mb: 2,
            }}
          >
            ค่อนข้างอันตราย เสี่ยงต่อการเกิดโรคร้ายแรงที่แฝงมากับความอ้วน หากค่า
            BMI อยู่ในระดับนี้ จะต้องปรับพฤติกรรมการทานอาหาร
            และควรเริ่มออกกำลังกาย และหากเลขยิ่งสูงกว่า 40.0
            ยิ่งแสดงถึงความอ้วนที่มากขึ้น ควรไปตรวจสุขภาพ และปรึกษาแพทย์
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginY: 2,
              fontWeight: 900,
              color: "darkblue",
            }}
          >
            อ้วน = 25.0 - 29.9
          </Typography>

          <Typography
            variant="body2"
            sx={{
              pl: 2,
              mb: 2,
            }}
          >
            อ้วนในระดับหนึ่ง ถึงแม้จะไม่ถึงเกณฑ์ที่ถือว่าอ้วนมาก ๆ
            แต่ก็ยังมีความเสี่ยงต่อการเกิดโรคที่มากับความอ้วนได้เช่นกัน
            ทั้งโรคเบาหวาน และความดันโลหิตสูง ควรปรับพฤติกรรมการทานอาหาร
            ออกกำลังกาย และตรวจสุขภาพ
          </Typography>

          <Typography
            variant="h5"
            sx={{
              marginY: 2,
              fontWeight: 900,
              color: "darkblue",
            }}
          >
            น้ำหนักปกติ เหมาะสม = 18.6 - 24
          </Typography>
          <Typography
            variant="body2"
            sx={{
              pl: 2,
              mb: 2,
            }}
          >
            น้ำหนักที่เหมาะสมสำหรับคนไทยคือค่า BMI ระหว่าง 18.5-24
            จัดอยู่ในเกณฑ์ปกติ ห่างไกลโรคที่เกิดจากความอ้วน
            และมีความเสี่ยงต่อการเกิดโรคต่าง ๆ น้อยที่สุด ควรพยายามรักษาระดับค่า
            BMI ให้อยู่ในระดับนี้ให้นานที่สุด และควรตรวจสุขภาพทุกปี
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginY: 2,
              fontWeight: 900,
              color: "darkblue",
            }}
          >
            ผอมเกินไป = น้อยกว่า 18.5
          </Typography>
          <Typography
            variant="body2"
            sx={{
              pl: 2,
              mb: 2,
            }}
          >
            น้ำหนักน้อยกว่าปกติก็ไม่ค่อยดี หากคุณสูงมากแต่น้ำหนักน้อยเกินไป
            อาจเสี่ยงต่อการได้รับสารอาหารไม่เพียงพอหรือได้รับพลังงานไม่เพียงพอ
            ส่งผลให้ร่างกายอ่อนเพลียง่าย การรับประทานอาหารให้เพียงพอ
            และการออกกำลังกายเพื่อเสริมสร้างกล้ามเนื้อสามารถช่วยเพิ่มค่า BMI
            ให้อยู่ในเกณฑ์ปกติได้
          </Typography>
          <Typography
            variant="body2"
            sx={{
              pl: 2,
              mb: 2,
              color: "GrayText",
              fontWeight: 600,
            }}
          >
            ค่า BMI จากโปรแกรมคำนวณนี้ เป็นค่าสำหรับชาวเอเชียและคนไทย
            ซึ่งอาจแตกต่างกันไปในแต่ละเชื้อชาติ ค่า BMI เฉลี่ยของหญิงไทยคือ 24.4
            และของชายไทยคือ 23.1 (อายุตั้งแต่ 20 ปีขึ้นไป)
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default App;
