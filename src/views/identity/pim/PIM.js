import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import {
  CellBoolean,
  CellBadge,
  cellBooleanFormatter,
  CellProgressBar,
} from 'src/components/tables'

const ListPIM = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const columns = [
    {
      name: 'accountEnabled',
      selector: (row) => row['accountEnabled'],
      sortable: true,
      cell: cellBooleanFormatter({ colourless: true }),
      exportSelector: 'accountEnabled',
    },
    {
      name: 'displayName',
      selector: (row) => row['displayName'],
      sortable: true,
      exportSelector: 'displayName',
    },
    {
      name: 'userPrincipalName',
      selector: (row) => row['userPrincipalName'],
      sortable: true,
      exportSelector: 'userPrincipalName',
    },
    {
      name: 'roleDisplayName',
      selector: (row) => row['roleDisplayName'],
      sortable: true,
      exportSelector: 'roleDisplayName',
    },
    {
      name: 'status',
      selector: (row) => row['status'],
      sortable: true,
      exportSelector: 'status',
    },
    {
      name: 'assignment',
      selector: (row) => row['assignment'],
      sortable: true,
      exportSelector: 'assignment',
    },
    {
      name: 'startDateTime',
      selector: (row) => row['startDateTime'],
      sortable: true,
      exportSelector: 'startDateTime',
    },
    {
      name: 'expiration',
      selector: (row) => row['expiration'],
      sortable: true,
      exportSelector: 'expiration',
    },
  ]

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="List PIM"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-PIM`,
        path: '/api/ListPIM',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default ListPIM
