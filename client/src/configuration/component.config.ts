// eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
let navigator: (
  path: string,
  options?: { replace?: boolean; state?: unknown }
) => void

const setNavigator = (navigatorFunc: typeof navigator) => {
  navigator = navigatorFunc
}

const go = (path: string, options?: { replace?: boolean; state?: unknown }) => {
  if (navigator) {
    navigator(path, options)
  } else {
    console.error('Navigator is not set')
  }
}

export { setNavigator, go }
