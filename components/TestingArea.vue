<template>
  <div class="testing-area">
    <section>
      <Link text="some link text 1" />
      <Link text="some link text 2" type="secondary" />
      <Link text="some link text 3" type="tertiary" />
    </section>

    <section>
      <ControlButton text="button" />

      <ControlButton text="button" size="small" />

      <ControlButton text="button" type="secondary" />

      <ControlButton text="button" type="secondary" size="small" />

      <ControlButton text="button">
        <IconInstagram />
        <DarwinText text="button" size="small" />
      </ControlButton>
    </section>

    <section>
      <IconArrow />
      <IconVolumeOff />
      <IconVolumeOn />
      <IconCalendar />
      <IconHelmet />
      <IconPodium />
      <IconCup />
      <IconRace />
      <IconMail />
      <IconCall />
      <IconStar />
    </section>
  </div>
</template>

<script>
import Link from '@/components/atoms/Link'
import ControlButton from '@/components/atoms/ControlButton'
import IconInstagram from '@/components/icons/Instagram'
import DarwinText from '@/components/atoms/Text'
import IconArrow from '@/components/icons/Arrow'
import IconCalendar from '@/components/icons/Calendar'
import IconVolumeOff from '@/components/icons/VolumeOff'
import IconVolumeOn from '@/components/icons/VolumeOn'
import IconHelmet from '@/components/icons/Helmet'
import IconPodium from '@/components/icons/Podium'
import IconCup from '@/components/icons/Cup'
import IconRace from '@/components/icons/Race'
import IconMail from '@/components/icons/Mail'
import IconCall from '@/components/icons/Call'
import IconStar from '@/components/icons/Star'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'TestingArea',
  components: {
    IconStar,
    IconCall,
    IconMail,
    IconRace,
    IconCup,
    IconPodium,
    IconHelmet,
    IconVolumeOn,
    IconVolumeOff,
    IconCalendar,
    IconArrow,
    DarwinText,
    IconInstagram,
    ControlButton,
    Link
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';
</style>
