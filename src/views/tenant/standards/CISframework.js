import React from 'react'
import { CButton, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { ModalService } from 'src/components/utilities'
import { CellBoolean, CellBadge, cellBooleanFormatter } from 'src/components/tables'

const CISframework = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const handleGlobalAdminsList = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.GlobalAdminList.split('<br />'),
      title: `Enabled Global Admins`,
    })
  }
  const handleAdminSessionbyCA = ({ row }) => {
    ModalService.open({
      visible: true,
      componentType: 'list',
      data: row.AdminSessionbyCAName.split('<br />'),
      title: `Conditional Policies Containing Session Controls with roles`,
    })
  }
  const columns = [
    {
      name: 'AdminMFAV2',
      selector: (row) => row['AdminMFAV2'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        }
      },
      exportSelector: 'AdminMFAV2',
    },
    {
      name: 'MFARegistrationV2',
      selector: (row) => row['MFARegistrationV2'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        }
      },
      exportSelector: 'MFARegistrationV2',
    },
    {
      name: 'GlobalAdminCount',
      selector: (row) => row['GlobalAdminCount'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell >= 2 && cell <= 4) {
          return <CellBoolean cell={true} />
        } else {
          return (
            <CButton
              className="btn-danger"
              size="sm"
              onClick={() => handleGlobalAdminsList({ row })}
            >
              {cell} Admin{cell > 1 ? 's' : ''}
            </CButton>
          )
        }
      },
      exportSelector: 'GlobalAdminCount',
    },
    {
      name: 'BlockLegacyAuthentication',
      selector: (row) => row['BlockLegacyAuthentication'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp1') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        }
      },
      exportSelector: 'BlockLegacyAuthentication',
    },
    {
      name: 'PasswordHashSync',
      selector: (row) => row['PasswordHashSync'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'PasswordHashSync',
    },
    {
      name: 'SigninRiskPolicy',
      selector: (row) => row['SigninRiskPolicy'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp2') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        }
      },
      exportSelector: 'SigninRiskPolicy',
    },
    {
      name: 'UserRiskPolicy',
      selector: (row) => row['UserRiskPolicy'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp2') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBoolean cell={true} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'warning'} />
        }
      },
      exportSelector: 'UserRiskPolicy',
    },
    {
      name: 'PWAgePolicyNew',
      selector: (row) => row['PWAgePolicyNew'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell < 2147483647) {
          return <CellBadge label={cell} color={'warning'} />
        } else if (cell === 2147483647) {
          return <CellBoolean cell={true} />
        }
      },
      exportSelector: 'PWAgePolicyNew',
    },
    {
      name: 'SelfServicePasswordReset',
      selector: (row) => row['SelfServicePasswordReset'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Off') {
          return <CellBadge label="Off All Users" color="warning" />
        } else if (cell === 'On') {
          return <CellBadge label="On All Users" color="success" />
        } else if (cell === 'Specific Users') {
          return <CellBadge label="Specific Users" color="info" />
        }
        return <CellBadge label="No Data" color="info" />
      },
      exportSelector: 'SelfServicePasswordReset',
    },
    {
      name: 'enableBannedPassworCheckOnPremise',
      selector: (row) => row['enableBannedPassworCheckOnPremise'],
      sortable: true,
      cell: cellBooleanFormatter(),
      exportSelector: 'enableBannedPassworCheckOnPremise',
    },
    {
      name: 'accessPackages',
      selector: (row) => row['accessPackages'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp2') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBadge label="No Access Packages" color={'warning'} />
        } else if (cell > 0) {
          return <CellBadge label={cell} color={'info'} />
        } 
      },
      exportSelector: 'accessPackages',
    },
    {
      name: 'SecureDefaultState',
      selector: (row) => row['SecureDefaultState'],
      sortable: true,
      cell: cellBooleanFormatter({ reverse: true }),
      exportSelector: 'SecureDefaultState',
    },
    {
      name: 'AdminSessionbyCA',
      selector: (row) => row['AdminSessionbyCA'],
      sortable: true,
      cell: (row, index, column) => {
        const cell = column.selector(row)
        if (cell === 'Not Licensed for AADp1') {
          return <CellBadge label={cell} color={'info'} />
        } else if (cell === 0) {
          return <CellBadge label="No Session Policy" color={'warning'} />
        } else if (cell > 0) {
          return (
            <CButton className="btn-info" size="sm" onClick={() => handleAdminSessionbyCA({ row })}>
              {cell} Polic{cell > 1 ? 'ies' : 'y'}
            </CButton>
          )
        }
      },
      exportSelector: 'AdminSessionbyCA',
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
