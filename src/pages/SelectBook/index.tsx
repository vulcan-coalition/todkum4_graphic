
import { Box, Button, Container, Grid, Paper } from "@material-ui/core/";
import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { Exchange } from "../../api/sttv4/Exchange";
import { GetUserWork } from "../../api/sttv4/Section";
import { ThemeContext } from "../../contexts/theme";
import { setBtnScale, setFontScale } from "../../plugins/setScaleElement";
import { useStyles } from "./style";


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

const SelectBook = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const history = useHistory();
  const classes = useStyles({ isDarkMode });
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>();


  useEffect(() => {
    Exchange().then(res => {
      localStorage.setItem('token_exchange', res.access_token)
      localStorage.setItem('refresh_token_exchange', res.refresh_token)
      localStorage.setItem('token_type_exchange', res.token_type)
    })
  }, []);

  useEffect(() => {
    const book = localStorage.getItem('book_id')
    if (book != undefined) {
      setSelectedBook(book)
    }
    GetUserWork().then(res => {
      setBooks(res);
      console.log(res);
    })
  }, []);

  const goToStt4 = (book_id: any, section_index: any) => {
    localStorage.setItem('book_id', book_id);
    localStorage.setItem('section_index', section_index);
    history.push('/stt-v3')
  };


  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  const keyDown = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
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
  
  };

  const keyUp = (event: KeyboardEvent) => {
    if (event.repeat) {
      return;
    }
  };

  return (
    <>
      <Container className={classes.container}>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={2}
          alignItems="stretch"
        >
          <p
            className="wp2 my-0"
          >
            เลือกหนังสือที่ต้องการทำ
          </p>
          <Grid item xs={12} md={12} lg={12} className={classes.root}>
            {books.sort(s => s.book_id).map((item: any, index: number) => (
              <div className={classes.container} key={index}>
                <Grid item xs={12} >
                  <Button
                    fullWidth={true}
                    variant="outlined"
                    color="primary"
                    onClick={() => { goToStt4(item.book_id, item.section_index) }}
                  >
                    หนังสือ: {item.book_id} {selectedBook === item.book_id ? ' ** เลือกหนังสือนี้ไว้อยู่ ** ' : ''}
                  </Button>
                </Grid>
              </div>
            ))}
          </Grid>

        </Grid>

      </Container>
    </>
  );
};

export default SelectBook;
