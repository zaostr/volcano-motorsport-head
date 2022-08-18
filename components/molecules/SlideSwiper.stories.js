import { storiesOf } from '@storybook/vue'

import Notes from './SlideSwiper.md'

import DarwinSwiper from './SlideSwiper'
import Picture from '@/components/atoms/Picture'

storiesOf('Swipers', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add(
    'Image swiper',
    () => ({
      components: { DarwinSwiper, Picture },
      template: `
        <darwin-swiper style="margin: 32px;">
          <!--NB: swiper slide have to contain "swiper-slide" class-->
          <Picture
            picture="/images/sample_image.png"
            class="swiper-slide"
          />
          <Picture
            picture="/images/sample_image.png"
            class="swiper-slide"
          />
          <Picture
            picture="/images/sample_image.png"
            class="swiper-slide"
          />
        </darwin-swiper>`
    }),
    {
      info: {
        components: { DarwinSwiper },
        summary:
          'The slide swiper component. Mostly used to show some images but can be used with any content as a slot.<br>' +
          'Each slide have to contain "swiper-slide" class.<br><br>' +
          '<b>Location:</b> ./components/molecules/SlideSwiper.vue'
      }
    }
  )
