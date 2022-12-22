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
    },
    {
      name: 'CIS v8',
      selector: (row) => row['Controlv8'],
      sortable: true,
      exportSelector: 'Controlv8',
    },
    {
      name: 'IGGroup',
      selector: (row) => row['IGGroup'],
      sortable: true,
      exportSelector: 'IGGroup',
    },
    {
      name: 'Result',
      selector: (row) => row['Result'],
      sortable: true,
      exportSelector: 'Result',
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
