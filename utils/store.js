import imageUrlBuilder from '@sanity/image-url'
import { SANITY_DATASET, SANITY_PROJECT_ID } from '../config'

function preparePicture(image, author, alt, width, height) {
  if (!!image && image.asset) {
    // Sanity.io specific: https://www.sanity.io/docs/presenting-images#the-basic-way-to-show-images-BnS1mFRw

    const builder = imageUrlBuilder()
      .dataset(SANITY_DATASET)
      .projectId(SANITY_PROJECT_ID)

    let croppedImageUrl = builder.image(image).url()

    if (width && height) {
      croppedImageUrl = builder
        .image(image)
        .width(width)
        .height(height)
        .url()
    }

    return {
      url: croppedImageUrl,
      // crop: image.crop || null,
      // hotspot: image.hotspot || null,
      lqip: image.asset.metadata ? image.asset.metadata.lqip : null,
      author: image.author || author,
      alt: image.alt || alt
      // aspectRatio: image.asset.metadata.aspectRatio
    }
  } else {
    // fallback
    return image
  }
}

function reformatBlocks(blocksList, imagesIds) {
  if (!blocksList || !blocksList.length) {
    return []
  }

  const reformattedBlocksList = []
  // used to construct lists from block.listItems
  const listData = {
    prevMetadata: {
      type: null,
      level: null
    },
    content: ''
  }
  blocksList.forEach((block, index) => {
    if (block._type === 'block') {
      // transforms to frontend html blocks

      if (block.listItem || listData.content) {
        // each list consists of number of blocks
        // we need to close last block manually
        const lastBlock = index === blocksList.length - 1
        constructList(block, listData, lastBlock)

        if (lastBlock) {
          reformattedBlocksList.push({
            type: 'html',
            content: listData.content
          })
        }
      }

      if (block.style === 'normal' && !listData.content) {
        // just a normal text block
        reformattedBlocksList.push({
          type: 'html',
          content: serializeHtmlBlock(block)
        })
      } else if (['h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style)) {
        // heading, content cant have H1 tag due to it is reserved for title
        // It is uncommon that heading can contain more than one child, but just for consistency
        block.children.forEach((child) => {
          // if contains link, strong, em or lists just omit it
          reformattedBlocksList.push({
            type: 'header',
            seo: block.style,
            content: child.text
          })
        })
      }
    } else if (block._type === 'blockImage') {
      if (block) {
        // Sanity.io GraphQl not allows us get images urls right here
        // So we keep image id to make additional query later
        const imageId = block.asset._ref
        reformattedBlocksList.push({
          type: 'image',
          author: block.author,
          alt: block.alt,
          imageId
        })
        imagesIds.push(imageId)
      }
    } else if (block._type === 'blockVideo') {
      if (block.url) {
        reformattedBlocksList.push({
          type: 'video',
          content: block.url
        })
      }
    } else {
      console.warn('Unknown block type: ', block)
    }
  })

  return reformattedBlocksList

  // encapsulated own functions

  function serializeHtmlBlock(block) {
    let htmlContent = ''
    if (block.children && block.children.length) {
      block.children.forEach((child) => {
        if (!child.text) {
          // omit child with empty body
          return
        }
        // Part of a text block, may contains <strong>, <em> and links
        // - combine it in a single html block
        let htmChunk = child.text

        if (child.marks.includes('em')) {
          htmChunk = `<em>${htmChunk}</em>`
        }

        if (child.marks.includes('strong')) {
          htmChunk = `<strong>${htmChunk}</strong>`
        }

        if (block.listItem) {
          htmChunk = `<li>${htmChunk}</li>`
        }

        if (child.marks && child.marks.length) {
          // handle links, suppose that marks contain only links
          child.marks.forEach((markKey) => {
            if (!['em', 'strong'].includes(markKey)) {
              // this is uncommon that child may contains more than one mark< but just for consistency
              const hrefMarkDef = block.markDefs.find(
                (markDef) => markDef._key === markKey
              )
              // that is a global link so we need to add _blank
              htmChunk = `<a href="${hrefMarkDef.href}" target="_blank">${htmChunk}</a>`
            }
          })
        }

        htmlContent += htmChunk
      })
    }
    return htmlContent
  }

  function constructList(block, listData, lastBlock = false) {
    if (!listData.content) {
      // the very first listItem
      listData.content = getListTag(block.listItem)
    } else if (listData.prevMetadata.type === block.listItem) {
      // subsequent listItem with the same type
      if (listData.prevMetadata.level < block.level) {
        listData.content += getListTag(block.listItem)
      } else if (listData.prevMetadata.level > block.level) {
        // current listItem has less level than previous
        // close all unclosed lists
        for (let i = 1; i <= listData.prevMetadata.level - block.level; i++) {
          listData.content += getListTag(listData.prevMetadata.type, true)
        }
      }
    } else if (listData.prevMetadata.type !== block.listItem) {
      // subsequent listItem with another type
      // close all unclosed lists
      for (let i = 1; i <= listData.prevMetadata.level; i++) {
        listData.content += getListTag(listData.prevMetadata.type, true)
      }
      // open tag if this is a listItem
      if (block.listItem) {
        getListTag(listData.content)
      }
    }

    if (block.listItem) {
      // this is a listItem block
      listData.content += serializeHtmlBlock(block)
      // fix current metaData
      listData.prevMetadata.type = block.listItem
      listData.prevMetadata.level = block.level

      if (lastBlock) {
        // This is the last block
        listData.content += getListTag(listData.prevMetadata.type, true)
      }
    } else {
      // this is not a listItem
      reformattedBlocksList.push({
        type: 'html',
        content: listData.content
      })

      listData.content = ''
      listData.prevMetadata.type = null
      listData.prevMetadata.level = null
    }
  }

  function getListTag(type, close) {
    return `<${close ? '/' : ''}${type === 'bullet' ? 'ul' : 'ol'}>`
  }
}

function prepareNameBlockContentPairs(pairsList = [], locale) {
  if (!pairsList || !pairsList.length) {
    return []
  }

  return pairsList.map((pair) => {
    if (pair.name && pair[`value_${locale}Raw`]) {
      return {
        name: pair.name[locale],
        value: reformatBlocks(pair[`value_${locale}Raw`])
      }
    } else if (pair.year && pair[`body_${locale}Raw`]) {
      return {
        year: pair.year,
        value: reformatBlocks(pair[`body_${locale}Raw`])
      }
    }
  })
}

function prepareNameValuePairs(pairsList = [], locale) {
  if (!pairsList || !pairsList.length) {
    return []
  }

  return pairsList.map((pair) => {
    if (pair.name && pair.value) {
      return {
        name: pair.name[locale],
        value: pair.value[locale]
      }
    }
    return {}
  })
}

export {
  preparePicture,
  reformatBlocks,
  prepareNameBlockContentPairs,
  prepareNameValuePairs
}
