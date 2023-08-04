import styled from 'styled-components'
import { Badge } from 'antd'

import { COLORS } from '~su/constants'

const BADGE_DOT_SIZE = {
  medium: 10,
  large: 16
}

export const StyledBadge = styled(Badge)`
  &.ant-badge.ant-badge-status {
    .ant-badge-status-dot {
      // those styles should be !important here to override antd :where selector styles https://github.com/ant-design/ant-design/issues/38660#issuecomment-1325365203
      width: ${({ $size }) => BADGE_DOT_SIZE[$size]}px !important;
      height: ${({ $size }) => BADGE_DOT_SIZE[$size]}px !important;
    }

    .ant-badge-status-processing {
      color: ${COLORS.info};
      background-color: ${COLORS.info};
    }
  }
`
