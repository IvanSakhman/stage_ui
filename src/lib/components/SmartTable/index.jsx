import PropTypes from 'prop-types'
import { SearchOutlined } from '@ant-design/icons'

import Card from '../Card'
import TableSearchBox from './SearchBox'

import string from '~su/utilities/string'
import { buildColumns } from './utilities'

const SmartTable = ({ title, columnsConfig, pagination, filtersSchema, urlParams, dataKey = '', ...rest }) => {
  const columns = buildColumns(columnsConfig.columns, urlParams, filtersSchema).map((column) => {
    if (column.searchable) {
      column.filterIcon = (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      column.filterDropdown = (filterDropdownProps) => {
        return <TableSearchBox columnKey={column.key} {...filterDropdownProps} />
      }
    }

    return column
  })

  const paginationProps = {
    position: ['topRight'],
    style: { position: 'absolute', right: 16, top: -60, zIndex: 1 },
    showSizeChanger: false,
    ...pagination
  }

  return (
    <Card.Table
      headStyle={{ fontWeight: 'normal' }}
      columnsConfig={columnsConfig}
      columns={columns}
      title={[title || <span style={{ lineHeight: '32px' }}>{string.humanize(dataKey, { titleize: true })}</span>]}
      pagination={paginationProps}
      {...rest}
    />
  )
}

SmartTable.propTypes = {
  title: PropTypes.element,
  columnsConfig: PropTypes.shape({
    columns: PropTypes.object
  }).isRequired,
  filtersSchema: PropTypes.object,
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dataKey: PropTypes.string,
  urlParams: PropTypes.instanceOf(URLSearchParams)
}

export default SmartTable
