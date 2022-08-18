<template>
  <footer class="footer">
    <div class="company-wrap">
      <DarwinCopyright
        :company="!!companyData.name ? companyData.name : fallbackName"
        :start-year="establishedYear"
        class="copyright"
      />

      <span class="separator">|</span>

      <Link
        :text="$t('pages.contacts')"
        route-name="contacts"
        type="secondary"
        size="tiny"
      />
    </div>

    <ul class="socials-wrap">
      <li
        v-for="social in companyData.socials"
        v-show="getSocialType(social)"
        :key="social.id"
      >
        <a :href="social" target="_blank" class="socials-item-link">
          <IconFacebook v-if="getSocialType(social) === 'facebook'" />
          <IconInstagram v-else-if="getSocialType(social) === 'instagram'" />
          <IconTwitter v-else-if="getSocialType(social) === 'twitter'" />
          <IconLinkedIn v-else-if="getSocialType(social) === 'linkedin'" />
        </a>
      </li>
    </ul>

    <div class="created-by-wrap">
      <CreatedBy />
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

/** utils **/
import getSocialType from '@/utils/getSocialType'

/** components **/
import IconFacebook from '@/components/icons/Facebook'
import IconInstagram from '@/components/icons/Instagram'
import IconTwitter from '@/components/icons/Twitter'
import IconLinkedIn from '@/components/icons/LinkedIn'
import DarwinCopyright from '@/components/atoms/Copyright'
import CreatedBy from '@/components/atoms/CreatedBy'
import Link from '@/components/atoms/Link'

/**
 * @version 1.0.0
 * @author [Dmitriy Bykov] (https://github.com/d-darwin)
 */
export default {
  name: 'Footer',

  components: {
    IconLinkedIn,
    IconTwitter,
    IconInstagram,
    IconFacebook,
    Link,
    CreatedBy,
    DarwinCopyright
  },

  data() {
    return {
      fallbackName: 'ACME Corp.',
      fallbackPhone: '+7 (999) 999-99-99',
      fallbackEmail: 'company@email.com'
    }
  },

  computed: {
    establishedYear() {
      return new Date(this.companyData.establishment_date).getFullYear()
    },

    ...mapState(['companyData', 'deviceWidth'])
  },

  methods: {
    getSocialType
  }
}
</script>

<style scoped lang="scss">
@import './assets/styles/variables';

.footer {
  border-top: 3px solid $white015;
  background: $gray-900;
  color: $white;
  width: 100%;
  display: flex;
}

.company-wrap {
  display: flex;
  align-items: center;

  .separator {
    line-height: 20px;
    font-size: 13px;
  }

  > * + * {
    margin-left: 8px;
    position: relative;
    display: flex;
    align-items: center;
  }
}

.socials-wrap {
  display: flex;

  > * + * {
    margin-left: 24px;
  }
}

.socials-item-link {
  color: $white;
}

.created-by-wrap {
  display: none;
}

@media (max-width: $sm-breakpoint) {
  .footer {
    flex-direction: column;

    > * {
      justify-content: center;
    }

    > * + * {
      margin-top: 20px;
    }
  }
}

@media (max-width: $md-breakpoint) {
  .footer {
    padding: 19px 18px 26px;
    flex-wrap: wrap;
  }
}

@media (min-width: $sm-breakpoint) and (max-width: $md-breakpoint) {
  .company-wrap {
    width: 60%;
  }

  .socials-wrap {
    width: 40%;
    justify-content: flex-end;
  }

  .created-by-wrap {
    width: 100%;
    margin-top: 16px;
    justify-content: flex-start;
  }
}

@media (min-width: $md-breakpoint) {
  .footer {
    padding: 21px 24px 24px;
    align-items: center;

    .company-wrap {
      width: 40%;
    }

    .socials-wrap {
      width: 20%;
      justify-content: center;
    }

    .created-by-wrap {
      width: 40%;
      justify-content: flex-end;
    }
  }
}

@media (min-width: $lg-breakpoint) {
  .footer {
    padding: 21px 30px 24px;
  }
}
</style>
