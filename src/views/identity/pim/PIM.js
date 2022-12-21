import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components/layout'
import {
  CellBoolean,
  CellBadge,
  CellTip,
  cellBooleanFormatter,
  CellProgressBar,
} from 'src/components/tables'

const Offcanvas = (row, rowIndex) => {
  const tenant = useSelector((state) => state.app.currentTenant)
  const editLink = `/identity/pim/edit?userId=${row.principalId}&tenantDomain=${tenant.defaultDomainName}&roleId=${row.roleDefinitionId}`
  //console.log(row)
  return (
    <>
      <Link to={editLink}>
        <CButton size="sm" variant="ghost" color="warning">
          <FontAwesomeIcon icon={faEdit} />
        </CButton>
      </Link>
    </>
  )
}

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
      name: 'Enabled',
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
      minWidth: '225px',
      maxWidth: '225px',
      exportSelector: 'roleDisplayName',
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
      name: 'status',
      selector: (row) => row['status'],
      sortable: true,
      minWidth: '125px',
      maxWidth: '125px',
      exportSelector: 'status',
    },
    {
      name: 'startDateTime',
      selector: (row) => row['startDateTime'],
      sortable: true,
      minWidth: '200px',
      maxWidth: '200px',
      exportSelector: 'startDateTime',
    },
    {
      name: 'expiration',
      selector: (row) => row['expiration'],
      sortable: true,
      minWidth: '200px',
      exportSelector: 'expiration',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
    },
  ]

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="List PIM"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        filterlist: [
          { filterName: 'Eligible Roles', filter: '"Assignment":"Eligible"' },
          { filterName: 'Active Roles', filter: '"Assignment":"Active"' },
        ],
        reportName: `${tenant?.defaultDomainName}-PIM`,
        path: '/api/ListPIM',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default ListPIM
