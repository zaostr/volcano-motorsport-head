import { storiesOf } from '@storybook/vue'

import Notes from './Welcome.md'

import DarwinLogo from '@/components/atoms/Logo'
import DarwinHeading from '@/components/atoms/Heading'
import DarwinText from '@/components/atoms/Text'

import store from '@/.storybook/store'

storiesOf('Welcome', module)
  .addParameters({
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/szACevrJOiyLHs9ueAK3MY/Volcano-Motorsport?node-id=322%3A105'
    },
    notes: { Notes }
  })
  .add('How to use', () => ({
    components: { DarwinLogo, DarwinHeading, DarwinText },
    store,
    template: `<div class="storybook-welcome-wrap">
      <darwin-logo />
      <darwin-heading text="Volcano Motorsport Design System" />
      <darwin-text text="<p>Here you can find all of Volcano Motorsport frontend components and discover them.</p>
      <p>Browse component via left sidebar and discover with tabs at the bottom menu.</p>
      <p>Also it may be helpful to use some tools from the top menu.</p>" />
    </div>`
  }))
