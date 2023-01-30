import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CellTip, cellBooleanFormatter } from 'src/components/tables'
import { CippPageList } from 'src/components/layout'
import { RFFCFormSelect } from 'src/components/forms'
import { useNavigate } from 'react-router-dom'
import useQuery from 'src/hooks/useQuery'
import { useLazyGenericGetRequestQuery } from 'src/store/api/app'
import { cellGenericFormatter } from 'src/components/tables/CellGenericFormat'

const MailboxStatsList = () => {
  let navigate = useNavigate()
  const tenant = useSelector((state) => state.app.currentTenant)
  let query = useQuery()
  const reportPeriod = query.get('reportPeriod')
  const [visibleA, setVisibleA] = useState(true)
  const handleSubmit = async (values) => {
    setVisibleA(false)

    const shippedValues = {
      tenantFilter: tenant.defaultDomainName,
      SearchNow: true,
      reportPeriod: encodeURIComponent(values.reportPeriod),
    }
    var queryString = Object.keys(shippedValues)
      .map((key) => key + '=' + shippedValues[key])
      .join('&')

    navigate(`?${queryString}`)
  }
  const [ListMailboxStatistics, graphrequest] = useLazyGenericGetRequestQuery()
  const QueryColumns = { set: false, data: [] }

  if (graphrequest.isSuccess) {
    if (graphrequest.data.length === 0) {
      graphrequest.data = [{ data: 'No Data Found' }]
    }

    //set columns

    const flatObj = Object.keys(graphrequest.data[0]).flat(100)
    flatObj.map((value) =>
      QueryColumns.data.push({
        name: value,
        selector: (row) => row[`${value.toString()}`],
        sortable: true,
        exportSelector: value,
        cell: cellGenericFormatter(),
      }),
    )
    QueryColumns.set = true
  }

  useEffect(() => {
    ListMailboxStatistics({
      path: '/api/ListMailboxStatistics',
      params: {
        tenantFilter: tenant.defaultDomainName,
        reportPeriod: reportPeriod,
      },
    })
  }, [reportPeriod, ListMailboxStatistics, tenant.defaultDomainName, query])

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="options-card">
            <CCardHeader>
              <CCardTitle className="d-flex justify-content-between">
                Report Settings
                <CButton size="sm" variant="ghost" onClick={() => setVisibleA(!visibleA)}>
                  <FontAwesomeIcon icon={visibleA ? faChevronDown : faChevronRight} />
                </CButton>
              </CCardTitle>
            </CCardHeader>
            <CCollapse visible={visibleA}>
              <CCardBody>
                <Form
                  initialValues={{
                    tenantFilter: tenant.defaultDomainName,
                    reportPeriod: reportPeriod,
                  }}
                  onSubmit={handleSubmit}
                  render={({ handleSubmit, submitting, values }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <CRow>
                          <CCol>
                            <RFFCFormSelect
                              name="reportPeriod"
                              label="Select a report period for Lookup"
                              placeholder="7"
                              values={[
                                { label: '30', value: '30' },
                                { label: '90', value: '90' },
                                { label: '180', value: '180' },
                              ]}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol>
                            <CButton type="submit" disabled={submitting}>
                              <FontAwesomeIcon className="me-2" icon={faSearch} />
                              Query
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )
                  }}
                />
              </CCardBody>
            </CCollapse>
          </CCard>
        </CCol>
      </CRow>
      <hr />
      <CippPage title="Mailbox Statistics" tenantSelector={false}>
        {graphrequest.isSuccess && QueryColumns.set && (
          <CCard className="content-card">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <CCardTitle>Mailbox Statistics</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <CippTable
                reportName={`${tenant?.defaultDomainName}-MailboxStatistics-List`}
                dynamicColumns={false}
                columns={QueryColumns.data}
                data={graphrequest.data}
                isFetching={graphrequest.isFetching}
              />
            </CCardBody>
          </CCard>
        )}
      </CippPage>
    </>
  )
}

export default MailboxStatsList
