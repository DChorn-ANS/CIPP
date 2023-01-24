import React from 'react'
import { CButton, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { ModalService } from 'src/components/utilities'
import { CellBoolean, CellBadge, cellBooleanFormatter } from 'src/components/tables'

const CISframework = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const columns = [
    {
      name: 'Configuration',
      selector: (row) => row['Configuration'],
      sortable: true,
      exportSelector: 'Configuration',
    },
    {
      name: 'LicenseLevel',
      selector: (row) => row['LicenseLevel'],
      sortable: true,
      exportSelector: 'LicenseLevel',
      minWidth: '150px',
      maxWidth: '150px',
    },
    {
      name: 'CIS v8',
      selector: (row) => row['Controlv8'],
      sortable: true,
      exportSelector: 'Controlv8',
      minWidth: '150px',
      maxWidth: '150px',
    },
    {
      name: 'IGGroup',
      selector: (row) => row['IGGroup'],
      sortable: true,
      exportSelector: 'IGGroup',
      minWidth: '150px',
      maxWidth: '150px',
    },
    {
      name: 'Result',
      selector: (row) => row['Result'],
      sortable: true,
      exportSelector: 'Result',
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp2') {
          return <CellBadge label="Not Licensed for AADp2" color="info" />
        } else if (cell === 'Not Licensed for AADp1') {
          return <CellBadge label="Not Licensed for AADp1" color="info" />
        } else if (cell === 'Manual Steps Required') {
          return <CellBadge label="Manual Steps Required" color="warning" />
        }
        return <CellBadge label={cell} color="info" />
      },
    },
  ]

  return (
    <CippPageList
      capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
      title="CIS Standards Report"
      tenantSelector={false}
      showAllTenantSelector={false}
      datatable={{
        reportName: `${tenant?.defaultDomainName}-CISstandards`,
        path: '/api/CISstandard',
        params: { TenantFilter: tenant?.defaultDomainName },
        columns,
      }}
    />
  )
}

export default CISframework
