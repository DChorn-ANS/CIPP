import React from 'react'
import { useSelector } from 'react-redux'
import { cellBooleanFormatter, CellTip } from 'src/components/tables'
import { CippPageList } from 'src/components/layout'


const columns = [
  {
    name: 'Display Name',
    selector: (row) => row['displayName'],
    sortable: true,
    cell: (row) => CellTip(row['displayName']),
    exportSelector: 'displayName',
    minWidth: '300px',
  },
  {
    name: 'Email',
    selector: (row) => row['mail'],
    sortable: true,
    cell: (row) => CellTip(row['mail']),
    exportSelector: 'mail',
    minWidth: '250px',
  },
  {
    name: 'User Type',
    selector: (row) => row['userType'],
    sortable: true,
    exportSelector: 'userType',
    minWidth: '140px',
  },
  {
    name: 'Enabled',
    selector: (row) => row['accountEnabled'],
    cell: cellBooleanFormatter({ colourless: true }),
    sortable: true,
    exportSelector: 'accountEnabled',
    minWidth: '100px',
  },
  {
    name: 'Licenses',
    selector: (row) => row['LicJoined'],
    exportSelector: 'LicJoined',
    sortable: true,
    grow: 5,
    wrap: true,
    minWidth: '200px',
  },
]

const Users = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  return (
    <CippPageList
      capabilities={{ allTenants: false, helpContext: 'https://google.com' }}
      title="Users"
      titleButton={titleButton}
      datatable={{
        filterlist: [
          { filterName: 'Enabled users', filter: '"accountEnabled":true' },
          { filterName: 'AAD users', filter: '"onPremisesSyncEnabled":false' },
          { filterName: 'Synced users', filter: '"onPremisesSyncEnabled":true' },
          { filterName: 'Guest users', filter: '"usertype":"guest"' },
        ],
        columns,
        path: '/api/ListAssignedLicenses',
        reportName: `${tenant?.defaultDomainName}-AssignedLicenses`,
        params: { TenantFilter: tenant?.defaultDomainName },
      }}
    />
  )
}

export default Users
