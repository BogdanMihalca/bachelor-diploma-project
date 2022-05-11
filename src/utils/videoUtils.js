/* eslint-disable no-cond-assign */
const getYoutubeVideoId = url => {
  if (url) {
    let videoId
    let result
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      videoId = result.pop()
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      videoId = result.pop()
    }
    return videoId
  }
  return null
}

// YOUTUBE Utils
const getYoutubeThumbnail = (url, quality) => {
  if (url) {
    let videoId
    let result
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      videoId = result.pop()
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      videoId = result.pop()
    }
    if (videoId) {
      if (typeof quality === "undefined") {
        quality = "high" // eslint-disable-line no-param-reassign
      }
      let qualityKey = "maxresdefault" // Max quality
      if (quality === "low") {
        qualityKey = "sddefault"
      } else if (quality === "medium") {
        qualityKey = "mqdefault"
      } else if (quality === "high") {
        qualityKey = "hqdefault"
      }
      return `http://img.youtube.com/vi/${videoId}/${qualityKey}.jpg`
    }
  }
  return false
}

const getYoutubeEmbedUrl = url => {
  if (url) {
    let videoId
    let result
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      videoId = result.pop()
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      videoId = result.pop()
    }
    return `https://www.youtube.com/embed/${videoId}`
  }
  return false
}

export { getYoutubeThumbnail, getYoutubeEmbedUrl, getYoutubeVideoId }
