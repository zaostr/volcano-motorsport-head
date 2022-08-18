<template>
  <div class="map-container">
    <div
      v-if="coords.length"
      :style="{
        height: aspectRatio && aspectRatio !== '0' ? '0' : height,
        width,
        minHeight,
        minWidth,
        maxHeight,
        maxWidth,
        paddingBottom
      }"
      :class="{ 'aspect-ratio-box': aspectRatio }"
      class="map-wrap"
    >
      <div ref="google_map"></div>
    </div>
  </div>
</template>

<script>
import loadGoogleMapsApi from 'load-google-maps-api'
/**
 * This is a reusable map component.
 * You needed to provide GOOGLE_MAP_API_KEY vars at .env to be filled.
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Map',
  props: {
    /**
     * Point on the map
     */
    coords: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * Aspect ratio of the map in x:y format. If filled other dimensional props may be ignored.
     */
    aspectRatio: {
      type: String,
      default: ''
    },
    /**
     * Height of the map in any css units (px, %, ...)
     */
    height: {
      type: String,
      default: ''
    },
    /**
     * Width of the map in any css units (px, %, ...)
     */
    width: {
      type: String,
      default: ''
    },
    /**
     * Minimum height of the map in any css units (px, %, ...)
     */
    minHeight: {
      type: String,
      default: ''
    },
    /**
     * Minimum width of the map in any css units (px, %, ...)
     */
    minWidth: {
      type: String,
      default: ''
    },
    /**
     * Maximum height of the map in any css units (px, %, ...)
     */
    maxHeight: {
      type: String,
      default: ''
    },
    /**
     * Maximum width of the map in any css units (px, %, ...)
     */
    maxWidth: {
      type: String,
      default: ''
    },
    /**
     * The position mark image
     */
    markerIcon: {
      type: String,
      default: '/icons/position.svg'
    },
    /**
     * Default zoom of the map
     */
    zoom: {
      type: Number,
      default: 9
    },
    /**
     * Type of the map. Defines it appearance.
     * @values 'map', 'satellite', 'hybrid'
     */
    mapType: {
      type: String,
      default: 'roadmap',
      validator: (val) => ['roadmap ', 'satellite', 'hybrid', 'terrain']
    },
    /**
     * Styles of the google map. Defines it appearance.
     */
    styles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: null,
      paddingBottom: 0,
      ymapMarkerIcon: {
        layout: 'default#image',
        imageHref: this.markerIcon,
        imageSize: this.ymapMarkerIconSizes
      }
    }
  },
  watch: {
    aspectRatio() {
      this.recalculatePadding()
    }
  },
  mounted() {
    this.id = this._uid
    if (this.aspectRatio) {
      this.recalculatePadding()
    }

    this.loadGoogleMap()
  },
  methods: {
    recalculatePadding() {
      /**
       * Used to correct vertical size of the map with aspectRatio when it is changed
       * @type {string[]}
       */
      const widthHeight = this.aspectRatio.split(':')
      if (widthHeight[0] && widthHeight[1]) {
        this.paddingBottom = (100 * widthHeight[0]) / widthHeight[1] + '%'
      } else {
        this.paddingBottom = 0
      }
    },
    loadGoogleMap() {
      loadGoogleMapsApi({
        key: process.env.GOOGLE_MAP_API_KEY
      })
        .then(
          function(googleMaps) {
            const map = new googleMaps.Map(this.$refs.google_map, {
              center: {
                lat: Number.parseFloat(this.coords[0]),
                lng: Number.parseFloat(this.coords[1])
              },
              zoom: this.zoom,
              disableDefaultUI: true,
              /* zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false, */
              mapTypeId: this.mapType === 'map' ? 'roadmap' : this.mapType,
              styles: this.styles
            })
            // add marker
            // eslint-disable-next-line no-new
            new googleMaps.Marker({
              position: new googleMaps.LatLng(this.coords[0], this.coords[1]),
              // icon: this.markerIcon,
              map
            })
          }.bind(this)
        )
        .catch(function(error) {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

// NB: mobile first
.map-container {
  min-height: 200px;
  min-width: 200px;
  max-height: 100%;
  max-width: 100%;
}

.aspect-ratio-box {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  content: '';
  overflow: hidden;

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
