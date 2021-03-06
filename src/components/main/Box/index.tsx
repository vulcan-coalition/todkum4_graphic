// this component create for fixed this issue https://github.com/mui-org/material-ui/issues/21657
import {
  borders,
  display,
  flexbox,
  grid,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  PropsFor,
  ComposedStyleFunction,
} from '@material-ui/system'
import styled from 'styled-components'

// Borrowed from Box.d.ts
type BoxStyleFunction = ComposedStyleFunction<
  [
    typeof borders,
    typeof display,
    typeof flexbox,
    typeof grid,
    typeof palette,
    typeof positions,
    typeof shadows,
    typeof sizing,
    typeof spacing,
    typeof typography
  ]
>
type SystemProps = PropsFor<BoxStyleFunction>

export const Box = styled.div<
  SystemProps
>`${borders}${display}${flexbox}${grid}${palette}${positions}${shadows}${sizing}${spacing}${typography}`