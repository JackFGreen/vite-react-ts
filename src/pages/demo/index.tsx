import React, { useCallback, useEffect } from 'react'
import { getDemoWithOutParams, handleApiCode } from 'src/api'
import styles from './index.module.less'

interface DemoPageProps {
  demo: string
}

function DemoPage(props: DemoPageProps): JSX.Element {
  const { demo } = props
  console.log(demo)

  const fetchData = useCallback(async () => {
    try {
      const res = await getDemoWithOutParams()
      handleApiCode(res, {
        success() {
          console.log('get demo data success')
        }
      })
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    fetchData().catch((err) => {
      throw err
    })
  }, [fetchData])

  return <div className={styles.demo}>DemoPage</div>
}

export default DemoPage
