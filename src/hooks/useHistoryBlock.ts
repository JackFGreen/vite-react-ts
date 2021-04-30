import { matchPath, useHistory } from 'react-router'

type MatchPathProps = Parameters<typeof matchPath>['1']

export interface UseHistoryBlockProps {
  handler?: () => void
  matchPath: MatchPathProps
}

const useHistoryBlock = (props: UseHistoryBlockProps): void => {
  const history = useHistory()

  const unblock = history.block(location => {
    const match = matchPath(location.pathname, props.matchPath)
    if (match != null) {
      if (typeof props.handler === 'function') props.handler()
    }
    unblock()
  })
}

export default useHistoryBlock
