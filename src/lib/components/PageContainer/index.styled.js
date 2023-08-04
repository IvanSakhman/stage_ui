import styled from 'styled-components'
import { Typography } from 'antd'

import Card from '../Card'
import Tabs from '../Tabs'
import { COLORS } from '../../constants'

export const Header = styled(Card)`
  border-radius: 0 0 6px 6px;
  margin-bottom: 8px;

  .ant-card-body {
    padding: 12px 40px;
  }
`

export const Title = styled(Typography.Title)`
  margin-top: 6px;
  padding-bottom: 8px;
`

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    min-height: 50vh;
    background: ${COLORS.white};
    border-radius: 6px;

    .ant-tabs-nav-list {
      margin: 8px 0 8px 20px;
    }
  }

  .ant-tabs-content-holder {
    border-color: transparent;
  }
`
