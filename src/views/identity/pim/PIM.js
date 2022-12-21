import React from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import {
  CellBoolean,
  CellBadge,
  CellTip,
  cellBooleanFormatter,
  CellProgressBar,
} from 'src/components/tables'

const ListPIM = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const columns = [
    {
      name: 'displayName',
      selector: (row) => row['displayName'],
      sortable: true,
      cell: (row) => CellTip(row['displayName']),
      exportSelector: 'displayName',
    },
    {
      name: 'userPrincipalName',
      selector: (row) => row['userPrincipalName'],
      sortable: true,
      cell: (row) => CellTip(row['userPrincipalName']),
      exportSelector: 'userPrincipalName',
    },
    {
      name: 'accountEnabled',
      selector: (row) => row['accountEnabled'],
      sortable: true,
      cell: cellBooleanFormatter({ colourless: true }),
      minWidth: '125px',
      maxWidth: '125px',
      exportSelector: 'accountEnabled',
    },
    {
      name: 'roleDisplayName',
      selector: (row) => row['roleDisplayName'],
      sortable: true,
      cell: (row) => CellTip(row['roleDisplayName']),
      exportSelector: 'roleDisplayName',
    },
    {
      name: 'status',
      selector: (row) => row['status'],
      sortable: true,
      minWidth: '125px',
      maxWidth: '125px',
      exportSelector: 'status',
    },
    {
      name: 'assignment',
      selector: (row) => row['assignment'],
      sortable: true,
      minWidth: '125px',
      maxWidth: '125px',
      exportSelector: 'assignment',
    },
    {
      name: 'startDateTime',
      selector: (row) => row['startDateTime'],
      sortable: true,
      minWidth: '150px',
      maxWidth: '150px',
      exportSelector: 'startDateTime',
    },
    {
      name: 'expiration',
      selector: (row) => row['expiration'],
      sortable: true,
      minWidth: '150px',
      maxWidth: '150px',
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
