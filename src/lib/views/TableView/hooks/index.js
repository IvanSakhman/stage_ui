import { useMemo } from 'react'

import setupActions from '../actions'
import setupStore from '../store'

const useTableViewSetup = ({
  itemName,
  itemPluralName,
  isPaginated = true,
  isFilterable = true,
  additionalFields = { actions: {} },
  collectionApiPath,
  apiPlaceholders,
  message
}) => {
  const store = useMemo(
    () =>
      setupStore({
        itemName,
        itemPluralName,
        isPaginated,
        isFilterable,
        additionalFields
      }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const { useDataStore } = store

  const { loadData } = setupActions(
    {
      useDataStore,
      itemName,
      itemPluralName,
      collectionApiPath,
      apiPlaceholders
    },
    message
  )

  return { store, loadData }
}

export default useTableViewSetup
