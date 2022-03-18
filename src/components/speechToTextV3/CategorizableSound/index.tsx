// React API
import React, { useEffect, useState, useContext } from "react";
// Styling
import {
  Grid,
  Paper,
  Avatar,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Input,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CategoryItem from "../CategoryItem";
import SubCategoryItem from "../SubCategoryItem";
import ShowSelectedItem from "../ShowSelectedItem";
import { Box } from "../../main/Box";
import { useStyles } from "./style";
// Common Utils
import { ThemeContext } from "../../../contexts/theme";
import { SpeechToTextV3Context } from "../../../contexts/speechToTextV3";
import {
  MarkSoundCategory,
  SoundCategoryChoice,
  SubSoundCategoryChoice,
  SubSoundCategoryChoiceChild,
  ErrorMarkSound,
} from "../../../models/markSound";

interface Props {
  index: number;
  id: string;
  defaultExpanded: boolean;
  expanded: string | false;
  selected: MarkSoundCategory;
  onEdit: (index: number, selected: any) => void;
  onDelete: (index: number) => void;
  handleExpanded: (panel: string, isExpanded: boolean) => void;
  setExpanded: (panel: string | false) => void;
}

const CategorizableSound: React.FC<Props> = (props) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { soundCategory } = useContext(SpeechToTextV3Context);
  const classes = useStyles({ isDarkMode });
  const [categorySelected, setCategorySelected] =
    useState<SoundCategoryChoice>();
  const [showSubCat, setShowSubCat] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [choiceType, setChoiceType] = useState<string>("");
  const [isShowSelectedItem, setIsShowSelectedItem] = useState<boolean>(false);

  // update category
  useEffect(() => {
    if (soundCategory === undefined) return;

    const categorySelected = soundCategory.choices.find(
      (item: SoundCategoryChoice) =>
        item.description === props.selected.description
    );

    if (categorySelected) {
      setChoiceType(categorySelected.choiceType);
      setIsShowSelectedItem(true);
      setIsSelected(true);
      props.handleExpanded("panel-" + props.index, true);
      setShowSubCat(true);
    } else {
      setIsSelected(false);
    }
    setCategorySelected(categorySelected);

  }, [props.selected]);

  useEffect(() => {
    validateMarkSound(props.selected);
  }, [])

  const onClickCategory = (index: number) => {
    if (soundCategory === undefined) return;

    let subCat = [];
    let subCategoryChoiceType = soundCategory.choices[index].choiceType;

    setCategorySelected(soundCategory.choices[index]);
    setChoiceType(soundCategory.choices[index].choiceType);

    if (soundCategory.choices[index].choices.length > 0) {
      setShowSubCat(true);
    } else {
      setShowSubCat(false);
    }

    if (
      soundCategory.choices[index].description !== categorySelected?.description
    ) {
      if (
        subCategoryChoiceType === "mutual" &&
        soundCategory.choices[index].choices.length > 0
      ) {
        subCat = new Array(1);
      } else {
        subCat = new Array(soundCategory.choices[index].choices.length);
      }
      setIsSelected(false);
    } else {
      subCat = props.selected.value;
    }
    const cloneSelected = { ...props.selected };
    cloneSelected.description = soundCategory.choices[index].description;
    cloneSelected.value = subCat;
    cloneSelected.id = props.id;
    validateMarkSound(cloneSelected);
  };

  const onCloseSubCat = () => {
    setShowSubCat(false);
  };

  const onClickSubCategoryChild = (
    subCatIndex: number,
    subCatChildIndex: number,
    subCat: SubSoundCategoryChoice,
    subCatChild: SubSoundCategoryChoiceChild
  ) => {
    const cloneSelected = { ...props.selected };

    if (checkIsMutualType()) {
      subCatIndex = 0;
    }

    cloneSelected.value[subCatIndex] = {
      description: subCat.description,
      value: {
        description: subCatChild.description,
        value: subCatChild.inputType === "text" ? cloneSelected.value[subCatIndex]?.value?.value : null,
        index: subCatChildIndex,
        color: subCatChild.color,
      },
    };

    validateMarkSound(cloneSelected);
  };

  const onClickSoundCategoryChoice = (
    subCatIndex: number,
    soundCategoryChoice: SoundCategoryChoice,
    subCat: SubSoundCategoryChoice
  ) => {
    const cloneSelected = { ...props.selected };

    if (checkIsMutualType()) {
      subCatIndex = 0;
    }
    console.log(subCat);
    
    cloneSelected.value[subCatIndex] = {
      description: soundCategoryChoice.description,
      value: {
        description: subCat.description,
        value: subCat.inputType === "text" ? cloneSelected.value[subCatIndex]?.value?.value : null,
        index: subCatIndex,
        color: subCat.color,
      },
    };

    validateMarkSound(cloneSelected);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let subCatIndex = Number(event.target.name.split(",")[0]);
    const cloneSelected = { ...props.selected };

    if (checkIsMutualType()) {
      subCatIndex = 0;
    }

    cloneSelected.value[subCatIndex].value.value = event.target.value;
    validateMarkSound(cloneSelected);
  };

  const onEnterTextField = () => {
    validateMarkSound(props.selected);
    props.setExpanded(false);
  };

  const handleDeleteMark = () => {
    props.onDelete(props.index);
  };

  const setupSubCategoryItemActive = (
    selected: any,
    subCatChild: any,
    subCatIndex: number
  ) => {
    if (checkIsMutualType()) {
      return selected.value[0]?.value.description === subCatChild.description;
    } else {
      return (
        selected.value[subCatIndex]?.value.description ===
        subCatChild.description
      );
    }
  };

  const updateInputText = (subCatIndex: number) => {
    if (checkIsMutualType()) {
      return props.selected.value[0]?.value.value;
    } else {
      return props.selected.value[subCatIndex]?.value.value;
    }
  };

  const checkIsMutualType = () => {
    return choiceType === "mutual";
  };

  const validateMarkSound = (selected: MarkSoundCategory) => {
    const cloneSelected = { ...selected };
    const errorList = getError(selected);
    if (errorList === undefined) return;

    if (errorList.length > 0) {
      cloneSelected.error = errorList;
    } else {
      cloneSelected.error = [];
    }

    props.onEdit(props.index, cloneSelected);
  };

  const getError = (selected: MarkSoundCategory) => {
    const category = findCategory(selected.description);
    if (category === undefined) return;

    let errorDesc: ErrorMarkSound[] = [];
    if (category.choiceType === "mutual") {
      for (let i = 0; i < category.choices.length; i++) {
        if (!selected.value[0]) {
          if (category.choices[i]?.choices == undefined || category.choices[i]?.choices.length == 0) {
            const desc: ErrorMarkSound = {
              description: `ระบุประเภทของ ${category.description} ด้วยครับ`,
            };
            errorDesc.push(desc);
          } else {
            const desc: ErrorMarkSound = {
              description: `ระบุประเภทของ ${category.choices[i]?.description} ด้วยครับ`,
            };
            errorDesc.push(desc);
          }
        }
      }
      if (selected.value[0]?.value.value === "") {
        const desc: ErrorMarkSound = {
          description: `พิมพ์ข้อความในช่อง ${selected.value[0]?.value.description} ด้วยครับ`,
        };
        errorDesc.push(desc);
      }
    } else {
      for (let i = 0; i < selected.value.length; i++) {
        if (!selected.value[i]) {
          const desc: ErrorMarkSound = {
            description: `ระบุ ${category.choices[i]?.description} ด้วยครับ`,
          };
          errorDesc.push(desc);
        } else if (selected.value[i].value.value === "") {
          const desc: ErrorMarkSound = {
            description: `พิมพ์ข้อความในช่อง ${selected.value[i].value.description} ด้วยครับ`,
          };
          errorDesc.push(desc);
        }
      }
    }

    return errorDesc;
  };

  const findCategory = (description: string) => {
    if (soundCategory === undefined) return;

    const category = soundCategory.choices.filter(
      (item: SoundCategoryChoice) => item.description === description
    );
    return category[0];
  };

  return (
    <>
      <Accordion
        key={"panel-" + props.index}
        elevation={0}
        className={classes.accordion}
        expanded={props.expanded === "panel-" + props.index}
        defaultExpanded={props.defaultExpanded}
        onChange={(event: React.ChangeEvent<{}>, isExpanded: boolean) => {
          props.handleExpanded("panel-" + props.index, isExpanded);
          if (isExpanded && isSelected && props.selected.value.length === 0) {
            setShowSubCat(true);
          }
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`panel-header-${props.index}`}
          className={classes.accordionSum}
        >
          <Grid container direction="row" alignItems="center">
            <Grid
              item
              xs={
                isShowSelectedItem
                  ? 1
                  : 11
              }
            >
              <h3 className="wh3 my-0">
                เสียงที่ {props.index + 1}
                {props.selected.errorActive! && (
                  <span className={classes.error}>
                    * กรุณาเลือกหนึ่งในตัวเลือก
                  </span>
                )}
              </h3>
            </Grid>
            {isShowSelectedItem &&
              (
                <Grid item xs={10}>
                  <ShowSelectedItem selected={props.selected} />
                </Grid>
              )}
            <Grid item xs={1}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  aria-label="delete"
                  onClick={handleDeleteMark}
                  className={classes.btnDelete}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetail}>
          <Grid container spacing={2}>
            <Grid item md={showSubCat ? 4 : 12} xs={12}>
              {soundCategory?.choices.map(
                (item: SoundCategoryChoice, index: number) => (
                  <div onClick={() => onClickCategory(index)} key={index}>
                    <CategoryItem
                      desc={item.description}
                      abbreviation={item.abbreviation}
                      isActive={
                        categorySelected?.description === item.description
                          ? true
                          : false
                      }
                      isError={props.selected.errorActive!}
                    />
                  </div>
                )
              )}
            </Grid>
            {showSubCat && (
              <Grid
                item
                md={showSubCat ? 8 : 12}
                xs={12}
                id="sub-cat-container"
              >
                <Paper className={classes.paper}>
                  <IconButton
                    className={classes.closeIcon}
                    aria-label="ยกเลิก"
                    onClick={onCloseSubCat}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box
                    display="flex"
                    alignItems="center"
                    style={{ height: "100%" }}
                    mb={1}
                  >
                    <Box p={1}>
                      <Avatar
                        alt="Remy Sharp"
                        src=""
                        className={classes.avatar}
                      >
                        {categorySelected?.abbreviation}
                      </Avatar>
                    </Box>
                    <Box p={1}>
                      <h4 className="wh4 my-0">{categorySelected?.description}</h4>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    {categorySelected?.choices?.map(
                      (subCat: SubSoundCategoryChoice, i: number) => {

                        if (subCat.choices == undefined || subCat.choices.length == 0)
                          return <Grid
                            item
                            xs={6}
                            md={6}
                            key={(i).toString()}
                          >
                            <div
                              onClick={() =>
                                onClickSoundCategoryChoice(
                                  i,
                                  categorySelected,
                                  subCat
                                )
                              }
                            >
                                <SubCategoryItem
                                  title={subCat.description}
                                  isActive={setupSubCategoryItemActive(
                                    props.selected,
                                    subCat,
                                    i
                                  )}
                                  parentIndex={i}
                                  childIndex={i}
                                  type={categorySelected.choices[i]?.inputType}
                                  onChangeInput={onChangeInput}
                                  onEnterTextField={onEnterTextField}
                                  inputText={updateInputText(i)}
                                  color={`#${subCat.color}`}
                                  isError={
                                    props.selected?.errorSubActive &&
                                    !props.selected.value[i]
                                  }
                                />
                            </div>
                          </Grid>
                        return <Grid item xs={12} key={i}>
                          <h5 className="wh5">
                            {subCat.description}{" "}
                            {props.selected.errorSubActive! &&
                              !props.selected.value[i] && (
                                <span className={classes.error}>
                                  * กรุณาเลือกหนึ่งในตัวเลือก
                                </span>
                              )}
                          </h5>
                          <Grid container spacing={1}>
                            {subCat.choices?.map(
                              (
                                subCatChild: SubSoundCategoryChoiceChild,
                                j: number
                              ) => (
                                <Grid
                                  item
                                  xs={12}
                                  md={12}
                                  key={(i + j).toString()}
                                >
                                  <div
                                    onClick={() =>
                                      onClickSubCategoryChild(
                                        i,
                                        j,
                                        subCat,
                                        subCatChild
                                      )
                                    }
                                  >
                                    <SubCategoryItem
                                      title={subCatChild.description}
                                      isActive={setupSubCategoryItemActive(
                                        props.selected,
                                        subCatChild,
                                        i
                                      )}
                                      parentIndex={i}
                                      childIndex={j}
                                      type={subCat.choices[j]?.inputType}
                                      onChangeInput={onChangeInput}
                                      onEnterTextField={onEnterTextField}
                                      inputText={updateInputText(i)}
                                      color={`#${subCatChild.color}`}
                                      isError={
                                        props.selected?.errorSubActive &&
                                        !props.selected.value[i]
                                      }
                                    />
                                  </div>
                                </Grid>
                              )
                            )}
                          </Grid>
                        </Grid>
                      }
                    )}
                  </Grid>


                </Paper>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CategorizableSound;
