import { storiesOf } from '@storybook/vue'
import { array, text } from '@storybook/addon-knobs'

import Notes from './Map.md'

import DarwinMap from './Map'

storiesOf('Maps', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Google Map',
    () => ({
      components: { DarwinMap },
      props: {
        coords: {
          default: array('Coords', ['55.75244504', '37.56578807'])
        },
        width: {
          default: text('Width', '480px')
        },
        height: {
          default: text('Height', '320px')
        },
        minWidth: {
          default: text('Min width', '')
        },
        minHeight: {
          default: text('Min height', '')
        },
        maxWidth: {
          default: text('Max width', '')
        },
        maxHeight: {
          default: text('Max height', '')
        },
        aspectRatio: {
          default: text('Aspect Ratio', '2:3')
        }
      },
      data() {
        return {
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            {
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#242f3e' }]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ color: '#263c3f' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#6b9a76' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#38414e' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#212a37' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#9ca5b3' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#746855' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1f2835' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f3d19c' }]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{ color: '#2f3948' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#d59563' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#515c6d' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#17263c' }]
            }
          ]
        }
      },
      template: `<darwin-map
        :coords="coords"
        :width="width"
        :height="height"
        :min-width="minWidth"
        :min-height="minHeight"
        :max-width="maxWidth"
        :max-height="maxHeight"
        :aspect-ratio="aspectRatio"
        :styles="styles"
      />`
    }),
    {
      info: {
        summary:
          'The google map component. Needed to GOOGLE_MAP_API_KEY var at .env file to be filled.<br><br>' +
          '<b>Location:</b> ./components/atoms/Map.vue'
      }
    }
  )
