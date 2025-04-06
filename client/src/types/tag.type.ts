type PairTagColor = {
  lightGrayDarkText: TagColor
  darkBlueWhiteText: TagColor
  orangeDarkGrayText: TagColor
  blueWhiteText: TagColor
  lightGrayishBlueDarkText: TagColor
  greenDarkBlueGrayText: TagColor
  yellowDarkGrayText: TagColor
}

const pairTagColor: PairTagColor = {
  lightGrayDarkText: {
    background: '#f0f4f8', // Light gray
    text: '#333333' // Dark gray
  },
  darkBlueWhiteText: {
    background: '#1e2a3a', // Dark blue
    text: '#ffffff' // White
  },
  orangeDarkGrayText: {
    background: '#ff9f1a', // Orange
    text: '#2c2c2c' // Very dark gray
  },
  blueWhiteText: {
    background: '#0079bf', // Blue
    text: '#ffffff' // White
  },
  lightGrayishBlueDarkText: {
    background: '#e0e4e9', // Light grayish blue
    text: '#333333' // Dark gray
  },
  greenDarkBlueGrayText: {
    background: '#61bd4f', // Green
    text: '#2c3e50' // Dark blue-gray
  },
  yellowDarkGrayText: {
    background: '#f2d600', // Yellow
    text: '#2e2e2e' // Dark gray
  }
}

type TagColor = {
  text: string
  background: string
}

export type TagColorTypeOf = keyof typeof pairTagColor

const isValidTagColor = (tagColor: string): tagColor is TagColorTypeOf => {
  return tagColor in pairTagColor
}

export const getTagColor = (tagColor: string) => {
  if (isValidTagColor(tagColor)) {
    return pairTagColor[tagColor]
  }
  return pairTagColor['blueWhiteText']
}
