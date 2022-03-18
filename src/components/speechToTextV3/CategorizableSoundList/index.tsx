// React API
import React from "react";
// Component
import CategorizableSound from "../CategorizableSound";
// Styling
import { useStyles } from "./style";
// Common Utils
import { MarkSoundCategory } from "../../../models/markSound";
interface Props {
  markItems: any[];
  onEdit: (index: number, selected: any) => void;
  onDelete: (index: number) => void;
}

const CategorizableSoundList: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const classes = useStyles();
  
  const handleChange = (panel: string, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className={classes.root}>
        {props.markItems.map((item: MarkSoundCategory, index: number) => (
          <CategorizableSound
            onEdit={props.onEdit}
            onDelete={props.onDelete}
            key={item.id ? item.id : index.toString()}
            id={item.id ? item.id : ""}
            index={index}
            defaultExpanded={index === props.markItems.length - 1}
            expanded={expanded}
            handleExpanded={handleChange}
            selected={item}
            setExpanded={setExpanded}
          />
        ))}
      </div>
    </>
  );
};

export default CategorizableSoundList;
