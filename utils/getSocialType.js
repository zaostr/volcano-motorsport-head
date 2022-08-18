export default (socialLink) => {
  if (socialLink.includes('facebook')) {
    return 'facebook'
  } else if (socialLink.includes('instagram')) {
    return 'instagram'
  } else if (socialLink.includes('twitter')) {
    return 'twitter'
  } else if (socialLink.includes('linkedin')) {
    return 'linkedin'
  } else if (
    socialLink.includes('youtube') ||
    socialLink.includes('youtu.be')
  ) {
    return 'youtube'
  } else {
    return null
  }
}
